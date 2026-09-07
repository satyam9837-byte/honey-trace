import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import heroImage from "@/assets/apiary-meadow.jpg";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Honey Chain — Blockchain honey traceability for beekeepers" },
      {
        name: "description",
        content:
          "Scan a jar to trace honey back to the hive. Honey Chain pairs an on-chain batch ledger with AI-IoT hive sensors for disease alerts and yield prediction.",
      },
      { property: "og:title", content: "Honey Chain — Traceable honey, healthy hives" },
      {
        property: "og:description",
        content:
          "QR verification, tamper-proof batch records, and AI hive monitoring for rural beekeepers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell>
      <header className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pb-10 pt-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-deep shadow-sm">
            <span className="size-2 rounded-full bg-mint" /> Live on-chain traceability
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] md:text-6xl">
            Every drop of honey,
            <br />
            <span className="text-brand-deep">traceable to the hive.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
            A blockchain ledger plus AI-IoT sensors that let rural beekeepers prove authenticity,
            guard colony health, and unlock premium markets — one QR scan at a time.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/verify"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream shadow-xl shadow-ink/20 transition hover:-translate-y-0.5"
            >
              Scan a batch
            </Link>
            <Link
              to="/apiary"
              className="rounded-full glass-panel px-6 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5"
            >
              Tour an apiary
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <p className="font-display text-2xl font-semibold">38,400</p>
              <p className="text-xs font-medium text-ink/50">Batches verified</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">1,260</p>
              <p className="text-xs font-medium text-ink/50">Partner beekeepers</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">99.2%</p>
              <p className="text-xs font-medium text-ink/50">Authenticity match</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-white/30 blur-2xl" />
          <div className="relative rounded-[2rem] glass-panel p-5 shadow-2xl shadow-brand/20">
            <div className="relative w-full overflow-hidden rounded-3xl">
              <img
                src={heroImage}
                width={1024}
                height={640}
                alt="Rows of beehives in a wildflower meadow at sunrise"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold text-mint-deep backdrop-blur">
                Colony healthy
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-semibold">Wildflower Reserve</p>
                <p className="text-xs font-medium text-ink/50">Batch #HC-2049 · 214 colonies</p>
              </div>
              <span className="rounded-full bg-mint/40 px-3 py-1 text-xs font-bold text-mint-deep">
                On-chain
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-cream/80 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-sky/50 text-lg">
                  🌡
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold">Hive climate</p>
                  <p className="text-xs text-ink/50">31°C · 62% RH · stable</p>
                </div>
              </div>
              <p className="font-display text-sm font-semibold text-brand-deep">Yield +12%</p>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.75rem] glass-panel p-6 shadow-lg shadow-peach/20">
            <div className="grid size-12 place-items-center rounded-2xl bg-peach/40 text-2xl">
              🔍
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">Consumer QR verification</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Shoppers scan the jar to open the full origin chain — beekeeper, harvest date, and the
              immutable hash proving the honey is genuine.
            </p>
            <Link
              to="/verify/$batchId"
              params={{ batchId: "HC-2049" }}
              className="mt-4 flex items-center gap-3 rounded-2xl bg-cream/80 p-3 transition hover:-translate-y-0.5"
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-white text-[9px] font-bold uppercase tracking-widest text-ink/30 outline-1 -outline-offset-1 outline-black/5">
                QR
              </div>
              <div className="text-xs font-medium text-ink/60">
                <p className="font-bold text-ink">Batch #HC-2049</p>
                <p>Verified · 04 Mar 2026</p>
                <p className="text-mint-deep">✓ 38,412 scans</p>
              </div>
            </Link>
          </div>

          <div className="rounded-[1.75rem] glass-panel p-6 shadow-lg shadow-mint/20">
            <div className="grid size-12 place-items-center rounded-2xl bg-mint/40 text-2xl">
              🐝
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">
              AI disease &amp; environment
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              On-hive sensors stream temperature, humidity and acoustic signals to models that flag
              disease early and alert beekeepers before a colony is at risk.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-2xl bg-cream/80 px-4 py-2.5 text-sm">
                <span className="font-medium text-ink/70">Varroa risk</span>
                <span className="font-bold text-mint-deep">Low</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-cream/80 px-4 py-2.5 text-sm">
                <span className="font-medium text-ink/70">Forage window</span>
                <span className="font-bold text-brand-deep">Optimal</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] glass-panel p-6 shadow-lg shadow-sky/20">
            <div className="grid size-12 place-items-center rounded-2xl bg-sky/40 text-2xl">📈</div>
            <h3 className="mt-4 font-display text-xl font-semibold">Productivity prediction</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Seasonal models forecast yield and quality so beekeepers and buyers can plan harvests
              and pricing with confidence.
            </p>
            <div className="mt-4 rounded-2xl bg-cream/80 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium text-ink/50">Predicted yield</p>
                  <p className="font-display text-2xl font-semibold text-brand-deep">
                    4.8 kg / hive
                  </p>
                </div>
                <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-bold text-brand-deep">
                  Season 26
                </span>
              </div>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                {[35, 50, 62, 78, 92].map((h, i) => (
                  <span
                    key={h}
                    className={`w-full rounded-t-md ${
                      i < 2 ? "bg-peach/70" : i < 4 ? "bg-brand/80" : "bg-brand-deep"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
