import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { forecast, hives } from "@/data/honey";

export const Route = createFileRoute("/_authenticated/apiary")({
  head: () => ({
    meta: [
      { title: "Apiary dashboard — hive health & yield | Honey Chain" },
      {
        name: "description",
        content:
          "Live hive temperature, humidity and weight with AI disease-risk alerts and an eight-week honey yield forecast for beekeepers.",
      },
      { property: "og:title", content: "Apiary dashboard — Honey Chain" },
      {
        property: "og:description",
        content: "Hive sensors, disease alerts and yield prediction in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Apiary,
});

function Apiary() {
  const watch = hives.find((h) => h.status === "watch");

  return (
    <Shell>
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
              Beekeeper console
            </p>
            <h1 className="mt-1 font-display text-4xl font-semibold md:text-5xl">
              Sahyadri Ridge, live.
            </h1>
          </div>
          <Link
            to="/register"
            className="rounded-full bg-brand px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40 transition hover:-translate-y-0.5"
          >
            Register a batch
          </Link>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <div className="space-y-4">
            {hives.map((hive) => (
              <div
                key={hive.id}
                className={`rounded-[1.5rem] glass-panel p-5 shadow-lg ${
                  hive.status === "watch" ? "shadow-peach/40" : "shadow-mint/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold">{hive.name}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      hive.status === "watch"
                        ? "bg-peach/60 text-brand-deep"
                        : "bg-mint/40 text-mint-deep"
                    }`}
                  >
                    {hive.status === "watch" ? "Needs a look" : "Healthy"}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <Metric label="Temp" value={`${hive.temp}°C`} />
                  <Metric label="Humidity" value={`${hive.humidity}%`} />
                  <Metric label="Weight" value={`${hive.weight} kg`} />
                </div>
                {hive.note && (
                  <p className="mt-3 rounded-2xl bg-peach/30 px-4 py-2.5 text-xs font-medium text-ink/70">
                    AI alert · {hive.risk} risk {hive.riskLevel} — {hive.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-[1.75rem] glass-panel p-6 shadow-lg shadow-sky/20">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                    Yield forecast · next 8 weeks
                  </p>
                  <p className="mt-2 font-display text-4xl font-semibold text-brand-deep">
                    142 kg <span className="text-base font-bold text-mint-deep">+18%</span>
                  </p>
                </div>
                <div className="text-right text-xs font-medium text-ink/55">
                  <p>Confidence 84%</p>
                  <p>Peak week 6 · est. 24 kg / hive</p>
                </div>
              </div>
              <div className="mt-6 flex h-40 items-end gap-2">
                {forecast.map((f) => (
                  <div key={f.week} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-md ${f.value >= 92 ? "bg-brand-deep" : f.value >= 64 ? "bg-brand/80" : "bg-peach/70"}`}
                      style={{ height: `${f.value}%` }}
                    />
                    <span className="text-[10px] font-medium text-ink/50">{f.week}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[1.75rem] glass-panel p-6 shadow-lg shadow-mint/20">
                <h2 className="font-display text-xl font-semibold">Environment today</h2>
                <div className="mt-4 space-y-2 text-sm">
                  <StatRow label="Ambient temperature" value="29°C" />
                  <StatRow label="Rainfall (7 days)" value="12 mm" />
                  <StatRow label="Forage window" value="Optimal" accent />
                  <StatRow label="Nectar flow index" value="0.78" />
                </div>
              </div>

              <div className="rounded-[1.75rem] glass-panel p-6 shadow-lg shadow-peach/30">
                <h2 className="font-display text-xl font-semibold">Colony health check</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {watch
                    ? `${watch.name} is the only colony outside its safe range. Everything else is steady.`
                    : "Every colony is inside its safe range today."}
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <StatRow label="Colonies monitored" value={`${hives.length}`} />
                  <StatRow label="Alerts this week" value={watch ? "1" : "0"} accent />
                  <StatRow label="Last sensor sync" value="12 seconds ago" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream/80 py-3">
      <p className="font-display text-lg font-semibold text-brand-deep">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-ink/45">{label}</p>
    </div>
  );
}

function StatRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-cream/80 px-4 py-2.5">
      <span className="font-medium text-ink/70">{label}</span>
      <span className={`font-bold ${accent ? "text-brand-deep" : ""}`}>{value}</span>
    </div>
  );
}
