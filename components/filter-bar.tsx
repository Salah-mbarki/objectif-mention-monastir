"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { LEVELS, SECTIONS, SUBJECTS, DOC_KINDS } from "@/lib/constants";

export default function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    startTransition(() => {
      router.push(`/documents?${next.toString()}`);
    });
  }

  function reset() {
    startTransition(() => router.push("/documents"));
  }

  const subject = params.get("subject") ?? "";
  const level = params.get("level") ?? "";
  const section = params.get("section") ?? "";
  const kind = params.get("kind") ?? "";
  const q = params.get("q") ?? "";

  return (
    <div className="card p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
      <div className="lg:col-span-2">
        <label className="label">Recherche</label>
        <input
          defaultValue={q}
          placeholder="Titre du document…"
          onKeyDown={(e) => {
            if (e.key === "Enter") update("q", e.currentTarget.value);
          }}
          onBlur={(e) => {
            if (e.target.value !== q) update("q", e.target.value);
          }}
          className="input"
        />
      </div>
      <div>
        <label className="label">Matière</label>
        <select
          className="select"
          value={subject}
          onChange={(e) => update("subject", e.target.value)}
        >
          <option value="">Toutes</option>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Niveau</label>
        <select
          className="select"
          value={level}
          onChange={(e) => update("level", e.target.value)}
        >
          <option value="">Tous</option>
          {LEVELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Section</label>
        <select
          className="select"
          value={section}
          onChange={(e) => update("section", e.target.value)}
        >
          <option value="">Toutes</option>
          {SECTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Type</label>
        <select
          className="select"
          value={kind}
          onChange={(e) => update("kind", e.target.value)}
        >
          <option value="">Tous</option>
          {DOC_KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
      </div>
      <div className="lg:col-span-6 flex justify-end">
        <button
          type="button"
          onClick={reset}
          className="btn-ghost"
          disabled={pending}
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}
