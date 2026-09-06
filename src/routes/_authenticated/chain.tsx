import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { batches } from "@/data/honey";

export const Route = createFileRoute("/chain")({
  head: () => ({
    meta: [
      { title: "Full traceability chain — pollen to jar | Honey Chain" },
      {
        name: "description",
        content:
          "Follow every honey batch from flower to jar: pollen sources, harvest windows, processing steps and the sealed on-chain record.",
      },
      { property: "og:title", content: "Full traceability chain — Honey Chain" },
      {
        property: "og:description",
        content: "Pollen sources, harvest dates and processing steps for every batch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChainPage,
});

function ChainPage() {
  return (
    <Shell>
      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
          Flower to jar
        </p>
        <h1 className="mt-1 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
          The full traceability chain, not just the hive.
        </h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          Every batch carries the flowers the bees visited, the days it was harvested, and each
          step it passed through before the jar was sealed.
        </p>

        <div className="mt-8 space-y-8">
          {batches.map((batch) => (
            <article
              key={batch.id}
              className="rounded-[2rem] glass-panel p-6 shadow-xl shadow-brand/15 md:p-8"
            >
              <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/60 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                    Batch #{batch.id}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-semibold">{batch.name}</h2>
                  <p className="text-sm font-medium text-ink/60">
                    {batch.beekeeper} · {batch.apiary} · {batch.location}
                  </p>
                </div>
                <div className="text-right text-xs font-medium text-ink/55">
                  <p className="font-bold text-ink">{batch.jars.toLocaleString()} jars</p>
                  <p>Harvest window {batch.harvestWindow}</p>
                  <p>Sealed on block {batch.block}</p>
                </div>
              </header>

              <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                    Pollen sources
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {batch.pollen.map((p) => (
                      <li key={p.flower} className="rounded-2xl bg-cream/80 p-4">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-sm font-bold">{p.flower}</p>
                          <p className="font-display text-lg font-semibold text-brand-deep">
                            {p.share}%
                          </p>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-peach/40">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${p.share}%` }}
                          />
                        </div>
                        <p className="mt-2 text-xs font-medium text-ink/55">
                          Blooms {p.bloom} · {p.distance} from the hives
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                    Harvest &amp; processing
                  </h3>
                  <ol className="relative mt-5 pl-6">
                    <span className="absolute left-[7px] top-2 bottom-2 w-px bg-brand/40" />
                    {batch.processing.map((step, i) => (
                      <li
                        key={step.stage}
                        className={
                          i === batch.processing.length - 1 ? "relative" : "relative mb-5"
                        }
                      >
                        <span className="absolute -left-6 top-1 size-3.5 rounded-full bg-brand ring-4 ring-brand/20" />
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-bold">{step.stage}</p>
                          <p className="text-xs font-medium text-ink/45">
                            {step.date} · {step.temp}
                          </p>
                        </div>
                        <p className="text-xs font-medium text-ink/60">{step.detail}</p>
                        <p className="text-xs text-ink/40">Handled by {step.operator}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Fact label="Harvested" value={batch.harvestDate} />
                    <Fact label="Purity" value={`${batch.purity}%`} />
                    <Fact label="Moisture" value={batch.moisture} />
                    <Fact label="Colonies" value={`${batch.colonies}`} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/verify/$batchId"
                      params={{ batchId: batch.id }}
                      className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40 transition hover:-translate-y-0.5"
                    >
                      See the sealed record
                    </Link>
                    <Link
                      to="/apiary"
                      className="rounded-full glass-panel px-5 py-2.5 text-sm font-bold shadow-sm transition hover:-translate-y-0.5"
                    >
                      View hive data
                    </Link>
                  </div>
                </section>
              </div>
            </article>
          ))}
        </div>
      </main>
    </Shell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream/80 px-3 py-3 text-center">
      <p className="font-display text-lg font-semibold text-brand-deep">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-ink/45">{label}</p>
    </div>
  );
}
