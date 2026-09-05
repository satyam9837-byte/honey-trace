import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Trace" },
  { to: "/verify", label: "Verify" },
  { to: "/apiary", label: "Apiary" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cream font-body text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="blob absolute -left-24 top-[-6rem] h-96 w-96 rounded-full bg-peach/60 blur-3xl" />
        <div className="blob2 absolute right-[-6rem] top-40 h-[28rem] w-[28rem] rounded-full bg-mint/50 blur-3xl" />
        <div className="blob absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-petals/50 blur-3xl" />
        <div className="blob2 absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-sky/50 blur-3xl" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-brand/90 shadow-lg shadow-brand/30">
            <span className="font-display text-2xl leading-none">H</span>
          </div>
          <div className="leading-tight">
            <p className="font-display text-xl font-semibold">Honey Chain</p>
            <p className="text-xs font-medium text-ink/50">Beekeeping blockchain</p>
          </div>
        </Link>
        <div className="hidden items-center gap-1 rounded-full glass-panel px-2 py-1.5 shadow-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-ink/70"
              activeProps={{ className: "bg-ink/5 font-semibold text-ink" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          to="/apiary"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40 transition hover:-translate-y-0.5"
        >
          Get verified badge
        </Link>
      </nav>

      {children}

      <footer className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-4">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[1.75rem] glass-panel px-8 py-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-brand/90 font-display text-xl text-primary-foreground">
              H
            </div>
            <p className="text-sm font-medium text-ink/60">
              Built for rural beekeepers. Transparent for everyone.
            </p>
          </div>
          <div className="flex gap-6 text-sm font-semibold">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-ink/60 hover:text-brand-deep">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
