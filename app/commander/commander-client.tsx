"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { placeOrder, type PlaceOrderResult } from "./actions";

export default function CommanderClient() {
  const { items, setQuantity, remove, total, clear } = useCart();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [result, setResult] = useState<PlaceOrderResult | null>(null);

  if (result?.ok) {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-2xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-[var(--primary-dark)] mt-4">
          Commande enregistrée !
        </h2>
        <p className="text-[var(--muted)] mt-2">
          Merci. Nous vous contacterons très bientôt par téléphone pour
          confirmer la livraison.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Numéro de commande :{" "}
          <span className="font-mono font-bold text-[var(--primary)]">
            {result.orderId.slice(-8).toUpperCase()}
          </span>
        </p>
        <Link href="/documents" className="btn-primary mt-6 inline-flex">
          Continuer à parcourir
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);
    if (items.length === 0) {
      setGlobalError("Votre panier est vide.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      address: String(fd.get("address") ?? ""),
      notes: String(fd.get("notes") ?? ""),
      items: items.map((i) => ({
        documentId: i.documentId,
        quantity: i.quantity,
      })),
    };

    startTransition(async () => {
      const res = await placeOrder(payload);
      setResult(res);
      if (!res.ok) {
        setGlobalError(res.error);
        if (res.fieldErrors) setErrors(res.fieldErrors);
      } else {
        clear();
      }
    });
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
      <form onSubmit={handleSubmit} className="card p-5 space-y-4">
        <h2 className="text-lg font-bold text-[var(--primary-dark)]">
          Vos coordonnées
        </h2>

        <div>
          <label className="label">Nom complet *</label>
          <input
            name="fullName"
            required
            className="input"
            placeholder="Ex : Mohamed Ben Ali"
          />
          {errors.fullName && <div className="field-error">{errors.fullName}</div>}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Téléphone *</label>
            <input
              name="phone"
              required
              className="input"
              placeholder="Ex : 22 123 456"
              inputMode="tel"
            />
            {errors.phone && <div className="field-error">{errors.phone}</div>}
          </div>
          <div>
            <label className="label">Email (facultatif)</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="(optionnel)"
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
        </div>

        <h2 className="text-lg font-bold text-[var(--primary-dark)] pt-2">
          Adresse de livraison
        </h2>
        <p className="text-xs text-[var(--muted)] -mt-2">
          Livraison uniquement à Monastir.
        </p>

        <div>
          <label className="label">Adresse détaillée *</label>
          <input
            name="address"
            required
            className="input"
            placeholder="Rue, immeuble, repère…"
          />
          {errors.address && (
            <div className="field-error">{errors.address}</div>
          )}
        </div>

        <div>
          <label className="label">Notes (facultatif)</label>
          <textarea
            name="notes"
            className="textarea"
            rows={3}
            placeholder="Préférences d'horaire, indications supplémentaires…"
          />
        </div>

        {globalError && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 text-rose-800 p-3 text-sm">
            {globalError}
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={pending}>
          {pending ? "Envoi en cours…" : "Confirmer la commande"}
        </button>
        <p className="text-xs text-[var(--muted)] text-center">
          Paiement à la livraison, en espèces. Aucun paiement en ligne.
        </p>
      </form>

      <aside className="card p-5 sticky top-20">
        <h2 className="text-lg font-bold text-[var(--primary-dark)] mb-3">
          Votre panier
        </h2>
        {items.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">
            Votre panier est vide.
            <Link href="/documents" className="link-purple block mt-2">
              Parcourir les documents →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.documentId}
                className="flex items-start gap-3 border-b border-[var(--border)] pb-3 last:border-none"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm line-clamp-2">
                    {it.title}
                  </div>
                  <div className="text-xs text-[var(--muted)] mt-1">
                    {it.price.toFixed(2)} DT
                    {it.kind === "PAPER" && it.maxStock != null && (
                      <span> · max {it.maxStock}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min={1}
                      max={
                        it.kind === "PAPER" && it.maxStock != null
                          ? it.maxStock
                          : 20
                      }
                      value={it.quantity}
                      onChange={(e) =>
                        setQuantity(it.documentId, Number(e.target.value) || 1)
                      }
                      className="input w-20 py-1 text-center"
                    />
                    <button
                      type="button"
                      onClick={() => remove(it.documentId)}
                      className="text-xs text-rose-700 hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-[var(--primary-dark)] whitespace-nowrap">
                  {(it.price * it.quantity).toFixed(2)} DT
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between font-bold text-[var(--primary-dark)] pt-1">
              <span>Total</span>
              <span>{total.toFixed(2)} DT</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
