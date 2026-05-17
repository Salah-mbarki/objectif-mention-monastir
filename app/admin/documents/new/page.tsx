import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import DocumentForm from "../document-form";
import { createDocumentAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewDocumentPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  return (
    <div>
      <h1 className="section-title">Nouveau document</h1>
      <p className="text-[var(--muted)] text-sm mt-1 mb-6">
        Téléversez un PDF / Word ou créez une fiche pour un document papier.
      </p>
      <DocumentForm action={createDocumentAction} submitLabel="Publier le document" />
    </div>
  );
}
