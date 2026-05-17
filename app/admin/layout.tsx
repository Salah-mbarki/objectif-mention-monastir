import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { logoutAction } from "./login/actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  // The login page itself is allowed without a session. We can't easily detect
  // the path from layout in App Router; instead, the login page uses its own
  // server check & redirect, and all other admin pages check requireAdmin().
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {session ? (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
          <nav className="flex flex-wrap items-center gap-1">
            <Link href="/admin" className="btn-ghost">Tableau de bord</Link>
            <Link href="/admin/documents" className="btn-ghost">Documents</Link>
            <Link href="/admin/documents/new" className="btn-ghost">+ Nouveau document</Link>
            <Link href="/admin/orders" className="btn-ghost">Commandes</Link>
          </nav>
          <form action={logoutAction}>
            <button type="submit" className="btn-outline text-sm py-1.5">
              Déconnexion
            </button>
          </form>
        </div>
      ) : null}
      {children}
    </div>
  );
}
