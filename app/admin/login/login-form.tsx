"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<
    { error?: string },
    FormData
  >(loginAction, {});

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label">Identifiant</label>
        <input name="username" required className="input" autoComplete="username" />
      </div>
      <div>
        <label className="label">Mot de passe</label>
        <input
          name="password"
          type="password"
          required
          className="input"
          autoComplete="current-password"
        />
      </div>
      {state?.error && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 text-rose-800 p-3 text-sm">
          {state.error}
        </div>
      )}
      <button type="submit" className="btn-primary w-full" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
