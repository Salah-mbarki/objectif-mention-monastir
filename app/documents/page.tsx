import { prisma } from "@/lib/prisma";
import DocumentCard from "@/components/document-card";
import FilterBar from "@/components/filter-bar";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = {
  subject?: string;
  level?: string;
  section?: string;
  kind?: string;
  q?: string;
};

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const where: Prisma.DocumentWhereInput = {};
  if (sp.subject) where.subject = sp.subject;
  if (sp.level) where.level = sp.level;
  if (sp.section) where.section = sp.section;
  if (sp.kind) where.kind = sp.kind;
  if (sp.q && sp.q.trim()) {
    where.title = { contains: sp.q.trim() };
  }

  const docs = await prisma.document.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="section-title">Catalogue des documents</h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          {docs.length} document{docs.length > 1 ? "s" : ""} disponible
          {docs.length > 1 ? "s" : ""}.
        </p>
      </div>

      <FilterBar />

      <div className="mt-6">
        {docs.length === 0 ? (
          <div className="card p-8 text-center text-[var(--muted)]">
            Aucun document ne correspond à votre recherche.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docs.map((d) => (
              <DocumentCard key={d.id} doc={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
