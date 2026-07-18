"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import Container from "@/components/Container";
import WhatsAppButton from "@/components/WhatsAppButton";
import QuoteModal from "@/components/QuoteModal";

export default function CTA() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 bg-brand-blue py-10 sm:py-12">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p className="text-lg font-bold text-white sm:text-xl">
            Un projet ?
            <br className="sm:hidden" /> On est là pour vous accompagner
          </p>
          <p className="text-sm text-white/80">
            Notre équipe d&apos;experts vous conseille et vous aide à trouver les
            meilleures solutions.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setIsQuoteOpen(true)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-gray-100"
          >
            <Truck className="h-4 w-4" aria-hidden="true" />
            Demander un devis
          </button>
          <WhatsAppButton variant="banner" />
        </div>
      </Container>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </section>
  );
}
