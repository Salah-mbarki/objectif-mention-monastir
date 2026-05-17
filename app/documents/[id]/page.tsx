import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/add-to-cart-button";
import { labelOf, LEVELS, SECTIONS, SUBJECTS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) notFound();

  const outOfStock = doc.kind === "PAPER" && (doc.stock ?? 0) <= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/documents" className="link-purple text-sm">
        ← Retour au catalogue
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-[var(--primary-light)] relative">
            {doc.imagePath ? (
              <Image
                src={doc.imagePath}
                alt={doc.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--primary)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  className="w-24 h-24 opacity-70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v12a2 2 0 0 1-2 2Z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="badge">{labelOf(SUBJECTS, doc.subject)}</span>
            <span className="badge badge-slate">
              {labelOf(LEVELS, doc.level)}
            </span>
            {doc.section && (
              <span className="badge badge-slate">
                {labelOf(SECTIONS, doc.section)}
              </span>
            )}
            {doc.kind === "DIGITAL" ? (
              <span className="badge badge-emerald">Numérique</span>
            ) : outOfStock ? (
              <span className="badge badge-rose">Épuisé</span>
            ) : (
              <span className="badge badge-amber">
                Papier · {doc.stock} restants
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-[var(--primary-dark)] leading-tight">
            {doc.title}
          </h1>

          {doc.description && (
            <p className="text-[var(--muted)] mt-3 whitespace-pre-line">
              {doc.description}
            </p>
          )}

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--primary)]">
              {doc.price > 0 ? `${doc.price.toFixed(2)} DT` : "Gratuit"}
            </span>
            <span className="text-sm text-[var(--muted)]">à la livraison</span>
          </div>

          <div className="mt-6 space-y-3">
            <AddToCartButton
              documentId={doc.id}
              title={doc.title}
              kind={doc.kind as "DIGITAL" | "PAPER"}
              price={doc.price}
              stock={doc.stock}
            />
            <Link href="/commander" className="btn-outline w-full">
              Aller au panier
            </Link>
          </div>

          <div className="mt-6 card p-4 bg-[var(--primary-light)] border-none text-sm text-[var(--primary-dark)]">
            <div className="font-semibold mb-1">Comment recevez-vous ce document ?</div>
            {doc.kind === "DIGITAL" ? (
              <p>
                Document numérique (PDF / Word). Après confirmation de votre
                commande par téléphone, vous recevrez le fichier ou il vous sera
                remis sur clé USB / imprimé lors de la livraison.
              </p>
            ) : (
              <p>
                Document papier livré à domicile (Monastir & environs).
                Paiement à la réception, en espèces, auprès de notre livreur.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
