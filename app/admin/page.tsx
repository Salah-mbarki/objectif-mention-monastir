import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const [docs, paperDocs, orders, pendingOrders] = await Promise.all([
    prisma.document.count(),
    prisma.document.count({ where: { kind: "PAPER" } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { items: true },
  });

  return (
    <div>
      <h1 className="section-title">Tableau de bord</h1>
      <p className="text-[var(--muted)] text-sm mt-1 mb-6">
        Vue d&apos;ensemble de votre boutique.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Documents" value={docs} href="/admin/documents" />
        <Stat label="Dont papier" value={paperDocs} href="/admin/documents" />
        <Stat label="Commandes totales" value={orders} href="/admin/orders" />
        <Stat
          label="Commandes en attente"
          value={pendingOrders}
          href="/admin/orders?status=PENDING"
          highlight
        />
      </div>

      <div className="mt-8 card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[var(--primary-dark)]">
            Dernières commandes
          </h2>
          <Link href="/admin/orders" className="link-purple text-sm">
            Voir tout →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Aucune commande.</p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {recentOrders.map((o) => (
              <li
                key={o.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-medium">
                    {o.fullName}{" "}
                    <span className="text-xs text-[var(--muted)]">
                      · {o.city}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {o.items.length} article(s) · {o.totalPrice.toFixed(2)} DT ·{" "}
                    {new Date(o.createdAt).toLocaleString("fr-FR")}
                  </div>
                </div>
                <Link
                  href={`/admin/orders`}
                  className="btn-ghost text-sm"
                >
                  Gérer →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  href,
  highlight,
}: {
  label: string;
  value: number;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`card p-4 hover:border-[var(--primary)] transition ${
        highlight ? "ring-2 ring-[var(--primary)]/30" : ""
      }`}
    >
      <div className="text-sm text-[var(--muted)]">{label}</div>
      <div className="text-3xl font-extrabold text-[var(--primary-dark)] mt-1">
        {value}
      </div>
    </Link>
  );
}
