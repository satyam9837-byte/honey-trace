import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/_authenticated/register")({
  head: () => ({
    meta: [
      { title: "Register a hive or honey batch | Honey Chain" },
      {
        name: "description",
        content:
          "Beekeepers can add a new hive to the apiary or register a honey batch with pollen sources, harvest dates and processing details before jars are sealed.",
      },
      { property: "og:title", content: "Register a hive or honey batch — Honey Chain" },
      {
        property: "og:description",
        content: "Add a hive or log a new honey batch for QR verification.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

type Tab = "hive" | "batch";

function RegisterPage() {
  const [tab, setTab] = useState<Tab>("batch");
  const [done, setDone] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    setDone(
      tab === "hive"
        ? `Hive "${name}" added to your apiary.`
        : `Batch "${name}" logged and ready for QR labels.`,
    );
    e.currentTarget.reset();
  }

  return (
    <Shell>
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-12 pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
          Beekeeper console
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold md:text-5xl">
          Add a hive or a honey batch.
        </h1>
        <p className="mt-3 text-ink/65">
          Fill this in once at the apiary. The details travel with every jar and show up when
          someone scans the code.
        </p>

        <div className="mt-6 inline-flex rounded-full glass-panel p-1.5 shadow-sm">
          {(
            [
              { key: "batch", label: "Honey batch" },
              { key: "hive", label: "New hive" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                setDone(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                tab === t.key ? "bg-brand text-primary-foreground shadow" : "text-ink/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {done && (
          <p className="mt-5 rounded-2xl bg-mint/40 px-5 py-3 text-sm font-bold text-mint-deep">
            {done} It is saved on this device for now — connect accounts to keep it forever.
          </p>
        )}

        <form
          key={tab}
          onSubmit={submit}
          className="mt-6 rounded-[2rem] glass-panel p-6 shadow-xl shadow-brand/15 md:p-8"
        >
          {tab === "hive" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <Field name="name" label="Hive name" placeholder="Hive 08 · Orchard" required />
              <Field name="apiary" label="Apiary" placeholder="Sahyadri Ridge Apiary" required />
              <Field name="colonies" label="Colonies in this hive" placeholder="12" type="number" />
              <Field name="installed" label="Date installed" type="date" />
              <Field name="location" label="Location" placeholder="Satara, Maharashtra" />
              <Field name="coords" label="Coordinates" placeholder="17.68°N · 74.01°E" />
              <div className="md:col-span-2">
                <Field
                  name="notes"
                  label="Notes for the beekeeper"
                  placeholder="Queen replaced in January, strong brood pattern."
                  textarea
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <Field name="name" label="Batch name" placeholder="Wildflower Reserve" required />
              <Field name="variety" label="Honey type" placeholder="Raw wildflower, unfiltered" />
              <Field name="hive" label="Hive it came from" placeholder="Hive 12" />
              <Field name="jars" label="Number of jars" placeholder="240" type="number" />
              <Field name="harvestStart" label="Harvest started" type="date" />
              <Field name="harvestEnd" label="Harvest finished" type="date" />
              <Field name="moisture" label="Moisture" placeholder="16.4%" />
              <Field name="purity" label="Lab purity" placeholder="99.2%" />
              <div className="md:col-span-2">
                <Field
                  name="pollen"
                  label="Flowers the bees visited"
                  placeholder="Karvi 46%, wild coriander 24%, eucalyptus 18%"
                  textarea
                />
              </div>
              <div className="md:col-span-2">
                <Field
                  name="processing"
                  label="Processing steps"
                  placeholder="Cold uncapped, 48h settling, 200-micron strain, jarred 07 Mar"
                  textarea
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40 transition hover:-translate-y-0.5"
            >
              {tab === "hive" ? "Add hive" : "Register batch & make QR"}
            </button>
            <p className="text-xs font-medium text-ink/50">
              Nothing is published until you confirm the lab results.
            </p>
          </div>
        </form>
      </main>
    </Shell>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "mt-2 w-full rounded-2xl bg-cream/80 px-4 py-3 text-sm font-medium text-ink outline-1 -outline-offset-1 outline-black/5 placeholder:text-ink/35 focus:outline-2 focus:outline-brand";
  return (
    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
      {label}
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={cls} />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={cls}
        />
      )}
    </label>
  );
}
