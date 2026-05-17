import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ORDER_STATUSES, labelOf } from "@/lib/constants";
import { deleteOrderAction, updateOrderStatusAction } from "./actions";

export const dynamic = "force-dynamic";

type SP = { status?: string };

const STATUS_BADGE: Record<string, string> = {
  PENDING: "badge badge-amber",
  CONFIRMED: "badge",
  DELIVERED: "badge badge-emerald",
  CANCELLED: "badge badge-rose",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const sp = await searchParams;
  const where = sp.status ? { status: sp.status } : {};
  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { items: { include: { document: true } } },
    take: 200,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title">Commandes</h1>
        <div className="flex flex-wrap gap-1">
          <Link
            href="/admin/orders"
            className={`btn-ghost text-sm ${!sp.status ? "bg-[var(--primary-light)]" : ""}`}
          >
            Toutes
          </Link>
          {ORDER_STATUSES.map((s) => (
            <Link
              key={s.value}
              href={`/admin/orders?status=${s.value}`}
              className={`btn-ghost text-sm ${
                sp.status === s.value ? "bg-[var(--primary-light)]" : ""
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card p-8 text-center text-[var(--muted)]">
          Aucune commande à afficher.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="card p-4">
              <div className="flex flex-wrap items-start gap-3 justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[var(--primary-dark)]">
                      {o.fullName}
                    </span>
                    <span className={STATUS_BADGE[o.status] ?? "badge"}>
                      {labelOf(ORDER_STATUSES, o.status)}
                    </span>
                    <span className="text-xs text-[var(--muted)] font-mono">
                      #{o.id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--muted)] mt-1 space-x-3">
                    <span>📞 {o.phone}</span>
                    {o.email && <span>✉ {o.email}</span>}
                  </div>
                  <div className="text-sm text-[var(--muted)] mt-1">
                    📍 {o.city} — {o.address}
                  </div>
                  {o.notes && (
                    <div className="text-sm mt-1 italic text-[var(--muted)]">
                      « {o.notes} »
                    </div>
                  )}
                  <div className="text-xs text-[var(--muted)] mt-1">
                    {new Date(o.createdAt).toLocaleString("fr-FR")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-[var(--primary)]">
                    {o.totalPrice.toFixed(2)} DT
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {o.items.length} article(s)
                  </div>
                </div>
              </div>

              <ul className="mt-3 border-t border-[var(--border)] pt-3 text-sm space-y-1">
                {o.items.map((it) => (
                  <li key={it.id} className="flex justify-between">
                    <span>
                      <span className="text-[var(--muted)]">{it.quantity}×</span>{" "}
                      {it.document.title}{" "}
                      <span className="text-xs text-[var(--muted)]">
                        ({it.document.kind === "PAPER" ? "Papier" : "Numérique"})
                      </span>
                    </span>
                    <span className="font-mono text-[var(--muted)]">
                      {(it.unitPrice * it.quantity).toFixed(2)} DT
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center gap-2 justify-end">
                <form action={updateOrderStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={o.id} />
                  <select
                    name="status"
                    defaultValue={o.status}
                    className="select py-1.5 text-sm w-auto"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn-outline text-sm py-1.5">
                    Mettre à jour
                  </button>
                </form>
                <form action={deleteOrderAction}>
                  <input type="hidden" name="id" value={o.id} />
                  <button
                    type="submit"
                    className="text-sm px-3 py-1.5 text-rose-700 hover:underline"
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
