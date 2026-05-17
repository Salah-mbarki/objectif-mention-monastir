import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl font-extrabold text-[var(--primary)]">404</div>
      <h1 className="text-2xl font-bold text-[var(--primary-dark)] mt-2">
        Page introuvable
      </h1>
      <p className="text-[var(--muted)] mt-2">
        Le contenu que vous cherchez n&apos;existe pas ou a été déplacé.
      </p>
      <Link href="/" className="btn-primary mt-6 inline-flex">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
