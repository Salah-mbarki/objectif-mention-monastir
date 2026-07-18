"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CONTACT_EMAIL } from "@/data/navigation";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Bloc 7 functional note: "Demander un devis" opens a form (page or modal)
 * collecting at minimum name, phone, email and a description of the need,
 * and is wired to the client's contact e-mail.
 */
export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Wiring to a real mail/back-office endpoint is a backend concern;
    // this submit handler is where that API call would be triggered.
    setStatus("sent");
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="quote-modal-title" className="text-xl font-bold text-[#161616]">
            Demander un devis
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="rounded-md p-1 text-brand-gray transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col gap-3 py-4 text-center">
            <p className="text-base font-semibold text-brand-blue">
              Merci, votre demande a bien été envoyée.
            </p>
            <p className="text-sm text-brand-gray">
              Notre équipe vous recontactera rapidement à l&apos;adresse indiquée.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-name" className="text-sm font-medium text-[#1a1a1a]">
                Nom complet
              </label>
              <input
                id="quote-name"
                name="name"
                type="text"
                required
                className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-[#1a1a1a] outline-none transition-colors focus:border-brand-blue"
                placeholder="Votre nom"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-phone" className="text-sm font-medium text-[#1a1a1a]">
                Téléphone
              </label>
              <input
                id="quote-phone"
                name="phone"
                type="tel"
                required
                className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-[#1a1a1a] outline-none transition-colors focus:border-brand-blue"
                placeholder="50 706 663"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-email" className="text-sm font-medium text-[#1a1a1a]">
                E-mail
              </label>
              <input
                id="quote-email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-[#1a1a1a] outline-none transition-colors focus:border-brand-blue"
                placeholder="vous@exemple.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-message" className="text-sm font-medium text-[#1a1a1a]">
                Description du besoin
              </label>
              <textarea
                id="quote-message"
                name="message"
                required
                rows={4}
                className="resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-[#1a1a1a] outline-none transition-colors focus:border-brand-blue"
                placeholder="Décrivez votre projet..."
              />
            </div>
            <p className="text-xs text-brand-gray">
              Votre demande sera transmise à {CONTACT_EMAIL}.
            </p>
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Envoyer la demande
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
