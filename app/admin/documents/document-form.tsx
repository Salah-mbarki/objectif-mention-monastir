"use client";

import { useActionState, useState } from "react";
import {
  DOC_KINDS,
  LEVELS,
  SECTIONS,
  SUBJECTS,
} from "@/lib/constants";

type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  ok?: boolean;
};

type Initial = Partial<{
  title: string;
  description: string;
  subject: string;
  level: string;
  section: string;
  kind: string;
  price: number;
  stock: number | null;
  filePath: string | null;
  fileName: string | null;
  imagePath: string | null;
}>;

export default function DocumentForm({
  action,
  initial,
  submitLabel,
}: {
  action: (state: ActionState, fd: FormData) => Promise<ActionState>;
  initial?: Initial;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [kind, setKind] = useState<string>(initial?.kind ?? "DIGITAL");
  const err = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="card p-5 space-y-4" encType="multipart/form-data">
      <div>
        <label className="label">Titre *</label>
        <input
          name="title"
          required
          className="input"
          defaultValue={initial?.title ?? ""}
          placeholder="Ex : Série d'exercices · Cinématique"
        />
        {err.title && <div className="field-error">{err.title}</div>}
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          name="description"
          rows={3}
          className="textarea"
          defaultValue={initial?.description ?? ""}
        />
        {err.description && <div className="field-error">{err.description}</div>}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="label">Matière *</label>
          <select
            name="subject"
            required
            className="select"
            defaultValue={initial?.subject ?? ""}
          >
            <option value="" disabled>— Choisir —</option>
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {err.subject && <div className="field-error">{err.subject}</div>}
        </div>
        <div>
          <label className="label">Niveau *</label>
          <select
            name="level"
            required
            className="select"
            defaultValue={initial?.level ?? ""}
          >
            <option value="" disabled>— Choisir —</option>
            {LEVELS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          {err.level && <div className="field-error">{err.level}</div>}
        </div>
        <div>
          <label className="label">Section</label>
          <select
            name="section"
            className="select"
            defaultValue={initial?.section ?? ""}
          >
            <option value="">— Aucune —</option>
            {SECTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {err.section && <div className="field-error">{err.section}</div>}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="label">Type *</label>
          <select
            name="kind"
            required
            className="select"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          >
            {DOC_KINDS.map((k) => (
              <option key={k.value} value={k.value}>{k.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Prix (DT) *</label>
          <input
            name="price"
            type="number"
            min={0}
            step="0.5"
            required
            className="input"
            defaultValue={initial?.price ?? 0}
          />
          {err.price && <div className="field-error">{err.price}</div>}
        </div>
      </div>

      {kind === "DIGITAL" ? (
        <div>
          <label className="label">Fichier (PDF / Word) {initial?.filePath ? "" : "*"}</label>
          <input
            name="file"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="input"
          />
          {initial?.filePath && (
            <p className="text-xs text-[var(--muted)] mt-1">
              Fichier actuel : {initial.fileName ?? initial.filePath}. Laisser
              vide pour le conserver.
            </p>
          )}
          {err.file && <div className="field-error">{err.file}</div>}
        </div>
      ) : (
        <div>
          <label className="label">Stock disponible *</label>
          <input
            name="stock"
            type="number"
            min={0}
            required
            className="input"
            defaultValue={initial?.stock ?? 0}
          />
          {err.stock && <div className="field-error">{err.stock}</div>}
        </div>
      )}

      <div>
        <label className="label">
          Image de couverture {kind === "PAPER" && !initial?.imagePath ? "*" : "(facultatif)"}
        </label>
        <input
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="input"
        />
        {initial?.imagePath && (
          <p className="text-xs text-[var(--muted)] mt-1">
            Image actuelle conservée si vous n&apos;en téléversez pas une nouvelle.
          </p>
        )}
        {err.image && <div className="field-error">{err.image}</div>}
      </div>

      {state?.error && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 text-rose-800 p-3 text-sm">
          {state.error}
        </div>
      )}

      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Envoi en cours…" : submitLabel}
      </button>
    </form>
  );
}
