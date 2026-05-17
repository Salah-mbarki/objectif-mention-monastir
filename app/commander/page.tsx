import CommanderClient from "./commander-client";

export const metadata = {
  title: "Commander — Objectif Mention Monastir",
};

export default function CommanderPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="section-title">Commander mes documents</h1>
      <p className="text-[var(--muted)] text-sm mt-1 mb-6">
        Remplissez le formulaire ci-dessous. Vous paierez en espèces, à la
        livraison.
      </p>
      <CommanderClient />
    </div>
  );
}
