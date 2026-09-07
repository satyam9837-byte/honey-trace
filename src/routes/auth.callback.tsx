import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Completing sign in | Honey Chain" },
      {
        name: "description",
        content: "Completing your secure Honey Chain account sign-in.",
      },
      { property: "og:title", content: "Completing sign in — Honey Chain" },
      { property: "og:description", content: "Completing your secure account sign-in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function finishSignIn() {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!active) return;

      if (sessionError || !data.session) {
        setError(sessionError?.message || "We couldn't complete your sign-in. Please try again.");
        return;
      }

      navigate({ to: "/", replace: true });
    }

    finishSignIn();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 font-body text-ink">
      <div className="auth-card w-full max-w-md rounded-[2rem] glass-panel p-8 text-center shadow-2xl shadow-brand/20">
        <div className="logo-pop mx-auto grid size-14 place-items-center rounded-3xl bg-brand font-display text-3xl text-primary-foreground">
          H
        </div>
        <h1 className="mt-5 font-display text-2xl font-semibold">
          {error ? "Sign-in needs another try" : "Opening your apiary…"}
        </h1>
        <p className="mt-2 text-sm font-medium text-ink/60">
          {error || "Your secure account is being confirmed."}
        </p>
        {error && (
          <button
            type="button"
            onClick={() => navigate({ to: "/auth", replace: true })}
            className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-brand/40"
          >
            Back to sign in
          </button>
        )}
      </div>
    </main>
  );
}