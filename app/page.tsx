import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DocumentCard from "@/components/document-card";
import { SUBJECTS, LEVELS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latest = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-[var(--primary-light)] to-white border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="badge mb-4">Uniquement à Monastir centre</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--primary-dark)] leading-tight">
              Réussissez votre <span className="text-[var(--primary)]">mention</span>{" "}
              en Physique &amp; Chimie
            </h1>
            <p className="mt-4 text-[var(--muted)] text-lg">
              Une bibliothèque d&apos;exercices et de documents pédagogiques pour les
              élèves du secondaire tunisien — de la 1ère année au Baccalauréat.
              Livraison à domicile, paiement à la réception.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/documents" className="btn-primary">
                Parcourir les documents
              </Link>
              <Link href="/commander" className="btn-outline">
                Commander maintenant
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              <span>✓ Pas de compte requis</span>
              <span>✓ Paiement à la livraison</span>
              <span>✓ PDF, Word ou papier</span>
            </div>
          </div>
          <div className="card p-6 bg-white">
            <h2 className="font-bold text-[var(--primary-dark)] mb-3">
              Filtrez en un clic
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECTS.map((s) => (
                <Link
                  key={s.value}
                  href={`/documents?subject=${s.value}`}
                  className="border border-[var(--border)] rounded-lg p-3 hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition"
                >
                  <div className="font-semibold text-[var(--primary-dark)]">
                    {s.label}
                  </div>
                  <div className="text-xs text-[var(--muted)]">Voir tous</div>
                </Link>
              ))}
              {LEVELS.map((l) => (
                <Link
                  key={l.value}
                  href={`/documents?level=${l.value}`}
                  className="border border-[var(--border)] rounded-lg p-3 hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition"
                >
                  <div className="font-semibold text-[var(--primary-dark)]">
                    {l.label}
                  </div>
                  <div className="text-xs text-[var(--muted)]">Voir tous</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Nouveautés</h2>
          <Link href="/documents" className="link-purple text-sm font-medium">
            Voir tout →
          </Link>
        </div>
        {latest.length === 0 ? (
          <div className="card p-8 text-center text-[var(--muted)]">
            Aucun document publié pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latest.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-[var(--primary-light)]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="section-title mb-6">Comment ça marche ?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                n: 1,
                t: "Choisissez vos documents",
                d: "Filtrez par matière, niveau ou section et ajoutez à votre panier.",
              },
              {
                n: 2,
                t: "Remplissez le formulaire",
                d: "Nom, téléphone et adresse à Monastir ou ses environs.",
              },
              {
                n: 3,
                t: "Payez à la livraison",
                d: "Notre livreur passe chez vous, vous payez en main propre.",
              },
            ].map((s) => (
              <div key={s.n} className="card p-5">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">
                  {s.n}
                </div>
                <div className="font-semibold text-primary-dark">
                  {s.t}
                </div>
                <p className="text-sm text-muted mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
