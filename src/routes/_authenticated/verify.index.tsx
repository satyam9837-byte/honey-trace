import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { batches } from "@/data/honey";

export const Route = createFileRoute("/_authenticated/verify/")({
  head: () => ({
    meta: [
      { title: "Verify a honey batch — Honey Chain" },
      {
        name: "description",
        content:
          "Enter the batch code printed under the QR on your honey jar to see its hive origin, lab purity results, and on-chain custody record.",
      },
      { property: "og:title", content: "Verify a honey batch — Honey Chain" },
      {
        property: "og:description",
        content: "Check that your jar of honey is genuine, straight from the hive record.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyIndex,
});

function VerifyIndex() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <Shell>
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-10 pt-6">
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          Scan or type the code on your jar.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">
          Every jar carries a batch code under its QR sticker. Enter it to see who kept the bees,
          when the honey was harvested, and the lab results behind it.
        </p>

        <form
          className="mt-7 rounded-[1.75rem] glass-panel p-6 shadow-lg shadow-peach/20"
          onSubmit={(e) => {
            e.preventDefault();
            const found = batches.find((b) => b.id === code.trim().toUpperCase().replace(/^#/, ""));
            if (!found) {
              setError("We couldn't find that code. Check the sticker and try again.");
              return;
            }
            setError("");
            navigate({ to: "/verify/$batchId", params: { batchId: found.id } });
          }}
        >
          <label
            htmlFor="batch"
            className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50"
          >
            Batch code
          </label>
          <div className="mt-2 flex flex-wrap gap-3">
            <input
              id="batch"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="HC-2049"
              className="min-w-52 flex-1 rounded-full border border-input bg-white/80 px-5 py-3 font-display text-lg tracking-wide outline-none placeholder:text-ink/30 focus:border-brand-deep"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream shadow-xl shadow-ink/20 transition hover:-translate-y-0.5"
            >
              Verify jar
            </button>
          </div>
          {error && <p className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
        </form>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
          Recently sealed batches
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {batches.map((batch) => (
            <Link
              key={batch.id}
              to="/verify/$batchId"
              params={{ batchId: batch.id }}
              className="rounded-[1.5rem] glass-panel p-5 shadow-lg shadow-mint/20 transition hover:-translate-y-0.5"
            >
              <p className="font-display text-lg font-semibold">{batch.name}</p>
              <p className="text-xs font-medium text-ink/50">
                #{batch.id} · {batch.location}
              </p>
              <p className="mt-3 text-sm text-ink/65">
                Harvested {batch.harvestDate} · {batch.purity}% purity
              </p>
            </Link>
          ))}
        </div>
      </main>
    </Shell>
  );
}
