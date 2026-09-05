import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { findBatch } from "@/data/honey";

export const Route = createFileRoute("/verify/$batchId")({
  head: ({ params }) => ({
    meta: [
      { title: `Batch ${params.batchId} verified — Honey Chain` },
      {
        name: "description",
        content: `Origin, harvest date, lab purity results and the on-chain custody record for honey batch ${params.batchId}.`,
      },
      { property: "og:title", content: `Batch ${params.batchId} — Honey Chain` },
      {
        property: "og:description",
        content: "See the full hive-to-jar record behind this batch of honey.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BatchResult,
});

function BatchResult() {
  const { batchId } = Route.useParams();
  const batch = findBatch(batchId);

  if (!batch) {
    return (
      <Shell>
        <main className="relative z-10 mx-auto max-w-2xl px-6 pb-16 pt-10 text-center">
          <h1 className="font-display text-4xl font-semibold">No record for #{batchId}</h1>
          <p className="mt-4 text-ink/70">
            This code isn't in the ledger. Double-check the sticker on the jar — a missing record
            can mean the label was copied.
          </p>
          <Link
            to="/verify"
            className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream"
          >
            Try another code
          </Link>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-10 pt-6">
        <div className="rounded-[2rem] glass-panel p-6 shadow-2xl shadow-brand/20 md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/60 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                Batch verified
              </p>
              <h1 className="mt-1 font-display text-4xl font-semibold">#{batch.id}</h1>
              <p className="text-sm font-medium text-ink/60">
                {batch.name} · {batch.variety}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint/40 px-4 py-2 text-sm font-bold text-mint-deep">
              <span className="size-2 rounded-full bg-mint-deep" /> Genuine · on-chain
            </span>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                Chain of custody
              </p>
              <ol className="relative mt-5 pl-6">
                <span className="absolute left-[7px] top-2 bottom-2 w-px bg-brand/40" />
                {batch.steps.map((step, i) => (
                  <li key={step.hash} className={i === batch.steps.length - 1 ? "relative" : "relative mb-6"}>
                    <span className="absolute -left-6 top-1 size-3.5 rounded-full bg-brand ring-4 ring-brand/20" />
                    <p className="text-sm font-bold">{step.label}</p>
                    <p className="text-xs font-medium text-ink/55">{step.detail}</p>
                    <p className="mt-0.5 text-xs text-ink/40">
                      {step.time} · {step.hash}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-cream/80 p-5">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                    Lab purity
                  </p>
                  <p className="font-display text-3xl font-semibold text-brand-deep">
                    {batch.purity}%
                  </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-peach/40">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${batch.purity}%` }} />
                </div>
                <p className="mt-3 text-xs font-medium text-ink/55">
                  Moisture {batch.moisture} · HMF {batch.hmf} · no added sugar
                </p>
              </div>

              <dl className="rounded-2xl bg-cream/80 p-5 text-sm">
                <Row label="Beekeeper" value={batch.beekeeper} />
                <Row label="Apiary" value={batch.apiary} />
                <Row label="Location" value={`${batch.location} · ${batch.coords}`} />
                <Row label="Harvested" value={batch.harvestDate} />
                <Row label="Colonies" value={`${batch.colonies}`} />
                <Row label="Ledger block" value={batch.block} last />
              </dl>

              <div className="flex items-center gap-4 rounded-2xl bg-cream/80 p-5">
                <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-white text-[9px] font-bold uppercase tracking-widest text-ink/30 outline-1 -outline-offset-1 outline-black/5">
                  QR
                </div>
                <div className="text-xs font-medium text-ink/60">
                  <p className="font-bold text-ink">{batch.scans.toLocaleString()} scans</p>
                  <p>Record sealed and unchanged since {batch.harvestDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/verify"
            className="rounded-full glass-panel px-6 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5"
          >
            Verify another jar
          </Link>
          <Link
            to="/apiary"
            className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40 transition hover:-translate-y-0.5"
          >
            See this apiary live
          </Link>
        </div>
      </main>
    </Shell>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        last ? "" : "mb-3 border-b border-white/70 pb-3"
      }`}
    >
      <dt className="text-ink/55">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
