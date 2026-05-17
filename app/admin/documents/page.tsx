import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteDocumentAction } from "./actions";
import { labelOf, LEVELS, SUBJECTS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const docs = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title">Documents</h1>
        <Link href="/admin/documents/new" className="btn-primary">
          + Ajouter un document
        </Link>
      </div>

      {docs.length === 0 ? (
        <div className="card p-8 text-center text-[var(--muted)]">
          Aucun document. Cliquez sur « Ajouter un document » pour commencer.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--primary-light)] text-[var(--primary-dark)]">
              <tr>
                <th className="text-left p-3">Document</th>
                <th className="text-left p-3">Matière</th>
                <th className="text-left p-3">Niveau</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Prix</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr
                  key={d.id}
                  className="border-t border-[var(--border)] hover:bg-[var(--primary-light)]/40"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative bg-[var(--primary-light)] rounded overflow-hidden flex-shrink-0">
                        {d.imagePath ? (
                          <Image
                            src={d.imagePath}
                            alt={d.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center text-[var(--primary)] text-xs">
                            PDF
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium line-clamp-1">{d.title}</div>
                        {d.fileName && (
                          <div className="text-xs text-[var(--muted)]">
                            {d.fileName}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{labelOf(SUBJECTS, d.subject)}</td>
                  <td className="p-3">{labelOf(LEVELS, d.level)}</td>
                  <td className="p-3">
                    {d.kind === "DIGITAL" ? (
                      <span className="badge badge-emerald">Numérique</span>
                    ) : (
                      <span className="badge badge-amber">Papier</span>
                    )}
                  </td>
                  <td className="p-3">
                    {d.kind === "PAPER" ? d.stock ?? 0 : "∞"}
                  </td>
                  <td className="p-3">{d.price.toFixed(2)} DT</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/documents/${d.id}/edit`}
                      className="btn-ghost text-sm"
                    >
                      Modifier
                    </Link>
                    <form action={deleteDocumentAction} className="inline">
                      <input type="hidden" name="id" value={d.id} />
                      <button
                        type="submit"
                        className="text-sm px-2 py-1 text-rose-700 hover:underline"
                      >
                        Supprimer
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
