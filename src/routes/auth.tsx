import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in or create an account | Honey Chain" },
      {
        name: "description",
        content:
          "Sign in to Honey Chain to verify honey batches, trace jars back to the hive, and manage your apiary.",
      },
      { property: "og:title", content: "Sign in — Honey Chain" },
      { property: "og:description", content: "One account for beekeepers and honey lovers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const bees = [
  { left: "8%", top: "18%", delay: "0s", size: "text-2xl" },
  { left: "86%", top: "12%", delay: "1.2s", size: "text-3xl" },
  { left: "74%", top: "70%", delay: "0.6s", size: "text-xl" },
  { left: "14%", top: "74%", delay: "1.8s", size: "text-3xl" },
  { left: "50%", top: "6%", delay: "0.9s", size: "text-xl" },
];

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      navigate({ to: "/" });
    } else {
      const displayName = String(data.get("name") ?? "");
      const role = String(data.get("role") ?? "consumer");
      const { data: result, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { display_name: displayName, role },
        },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      if (!result.session) {
        setCheckEmail(true);
        return;
      }
      navigate({ to: "/" });
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    const { error, redirected } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth/callback`,
    });
    if (error) {
      setError(error.message || "Google sign-in failed");
      setLoading(false);
      return;
    }
    if (!redirected) navigate({ to: "/" });
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cream px-4 py-10 font-body text-ink">
      {/* floating pastel blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="blob absolute -left-24 top-[-6rem] h-96 w-96 rounded-full bg-peach/60 blur-3xl" />
        <div className="blob2 absolute right-[-6rem] top-40 h-[28rem] w-[28rem] rounded-full bg-mint/50 blur-3xl" />
        <div className="blob absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-petals/50 blur-3xl" />
        <div className="blob2 absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-sky/50 blur-3xl" />
      </div>

      {/* floating bees */}
      {bees.map((b, i) => (
        <span
          key={i}
          aria-hidden
          className={`bee pointer-events-none absolute z-10 ${b.size}`}
          style={{ left: b.left, top: b.top, animationDelay: b.delay }}
        >
          🐝
        </span>
      ))}

      <div className="auth-card relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="logo-pop mx-auto grid size-14 place-items-center rounded-3xl bg-brand/90 font-display text-3xl text-primary-foreground shadow-xl shadow-brand/40">
            H
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold">Honey Chain</h1>
          <p className="mt-1 text-sm font-medium text-ink/55">
            {mode === "signin"
              ? "Welcome back to the apiary."
              : "Join the chain — beekeepers and honey lovers welcome."}
          </p>
        </div>

        <div className="rounded-[2rem] glass-panel p-6 shadow-2xl shadow-brand/20 md:p-8">
          {checkEmail ? (
            <div className="text-center">
              <div className="logo-pop mx-auto grid size-14 place-items-center rounded-full bg-mint/40 text-2xl">
                ✉️
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold">Check your inbox</h2>
              <p className="mt-2 text-sm text-ink/60">
                We sent you a confirmation link. Click it to activate your account, then come back
                and sign in.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckEmail(false);
                  setMode("signin");
                }}
                className="mt-5 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40 transition hover:-translate-y-0.5"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              {/* mode switch */}
              <div className="relative mb-6 grid grid-cols-2 rounded-full bg-cream/80 p-1.5">
                <span
                  className={`absolute inset-y-1.5 w-[calc(50%-0.375rem)] rounded-full bg-brand shadow transition-transform duration-300 ease-out ${
                    mode === "signup" ? "translate-x-[calc(100%+0.375rem)]" : "translate-x-1.5"
                  }`}
                  style={{ left: 0 }}
                />
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMode(m);
                      setError(null);
                    }}
                    className={`relative z-10 rounded-full py-2 text-sm font-bold transition-colors ${
                      mode === m ? "text-primary-foreground" : "text-ink/55"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              <form key={mode} onSubmit={handleSubmit} className="form-swap space-y-4">
                {mode === "signup" && (
                  <>
                    <Field name="name" label="Your name" placeholder="Asha Patil" required />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                        I am a
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {(
                          [
                            { value: "beekeeper", label: "🐝 Beekeeper" },
                            { value: "consumer", label: "🍯 Honey lover" },
                          ] as const
                        ).map((r, i) => (
                          <label key={r.value} className="cursor-pointer">
                            <input
                              type="radio"
                              name="role"
                              value={r.value}
                              defaultChecked={i === 0}
                              className="peer sr-only"
                            />
                            <span className="block rounded-2xl bg-cream/80 px-4 py-2.5 text-center text-sm font-bold text-ink/60 outline-1 -outline-offset-1 outline-black/5 transition peer-checked:bg-brand peer-checked:text-primary-foreground peer-checked:shadow-lg peer-checked:shadow-brand/30">
                              {r.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />

                {error && (
                  <p className="rounded-2xl bg-petals/40 px-4 py-2.5 text-sm font-bold text-destructive">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-brand px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40 transition hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-ink/40">
                <span className="h-px flex-1 bg-ink/10" /> or{" "}
                <span className="h-px flex-1 bg-ink/10" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full glass-panel px-6 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5"
              >
                <GoogleIcon /> Continue with Google
              </button>
            </>
          )}
        </div>

        <p className="mt-5 text-center text-xs font-medium text-ink/45">
          Every jar tells a true story — your account keeps it safe.
        </p>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  minLength,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="mt-2 w-full rounded-2xl bg-cream/80 px-4 py-3 text-sm font-medium normal-case tracking-normal text-ink outline-1 -outline-offset-1 outline-black/5 placeholder:text-ink/35 focus:outline-2 focus:outline-brand"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.8 11.42 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}
