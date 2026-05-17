import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DocumentForm from "../../document-form";
import { updateDocumentAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditDocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const { id } = await params;
  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) notFound();

  const bound = updateDocumentAction.bind(null, id);

  return (
    <div>
      <h1 className="section-title">Modifier le document</h1>
      <p className="text-[var(--muted)] text-sm mt-1 mb-6">{doc.title}</p>
      <DocumentForm
        action={bound}
        submitLabel="Enregistrer les modifications"
        initial={{
          title: doc.title,
          description: doc.description ?? "",
          subject: doc.subject,
          level: doc.level,
          section: doc.section ?? "",
          kind: doc.kind,
          price: doc.price,
          stock: doc.stock,
          filePath: doc.filePath,
          fileName: doc.fileName,
          imagePath: doc.imagePath,
        }}
      />
    </div>
  );
}
