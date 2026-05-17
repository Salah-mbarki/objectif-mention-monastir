import Link from "next/link";
import Image from "next/image";
import { labelOf, LEVELS, SECTIONS, SUBJECTS } from "@/lib/constants";

export type DocumentCardData = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  level: string;
  section: string | null;
  kind: string;
  price: number;
  imagePath: string | null;
  stock: number | null;
};

export default function DocumentCard({ doc }: { doc: DocumentCardData }) {
  const outOfStock = doc.kind === "PAPER" && (doc.stock ?? 0) <= 0;
  return (
    <Link
      href={`/documents/${doc.id}`}
      className="card overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition group"
    >
      <div className="aspect-[4/3] bg-[var(--primary-light)] relative overflow-hidden">
        {doc.imagePath ? (
          <Image
            src={doc.imagePath}
            alt={doc.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--primary)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-16 h-16 opacity-70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v12a2 2 0 0 1-2 2Z"
              />
            </svg>
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <span className="badge">{labelOf(SUBJECTS, doc.subject)}</span>
          <span className="badge badge-slate">
            {labelOf(LEVELS, doc.level)}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          {doc.kind === "DIGITAL" ? (
            <span className="badge badge-emerald">Numérique</span>
          ) : outOfStock ? (
            <span className="badge badge-rose">Épuisé</span>
          ) : (
            <span className="badge badge-amber">Papier · {doc.stock} restants</span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-[var(--primary-dark)] line-clamp-2">
          {doc.title}
        </h3>
        {doc.section && (
          <p className="text-xs text-[var(--muted)]">
            {labelOf(SECTIONS, doc.section)}
          </p>
        )}
        {doc.description && (
          <p className="text-sm text-[var(--muted)] line-clamp-2">
            {doc.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-[var(--primary)]">
            {doc.price > 0 ? `${doc.price.toFixed(2)} DT` : "Gratuit"}
          </span>
          <span className="text-xs text-[var(--primary)] font-medium group-hover:underline">
            Voir détails →
          </span>
        </div>
      </div>
    </Link>
  );
}
