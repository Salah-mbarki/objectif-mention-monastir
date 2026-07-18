"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Features from "@/components/Features";

export default function Hero() {
  return (
    <section className="relative bg-white pt-10 pb-24 sm:pb-28 lg:pt-14">
      <Container className="grid grid-rows-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
        {/* Image layer — sits BEHIND the text on mobile/tablet (z-0), 
      normal flow again at lg: */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative z-0 col-start-1 row-start-1 aspect-[4/5] w-full overflow-hidden rounded-2xl lg:z-auto lg:col-auto lg:row-auto lg:order-2 lg:aspect-[4/3]"
        >
          <Image
            src="/images/hero/Bathroom.jpg"
            alt="Baignoire moderne dans une salle de bain élégante"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {/* Darkening gradient so text stays legible over the photo on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:hidden" />
        </motion.div>

        {/* Text layer — sits ON TOP of the image on mobile/tablet (z-10) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 col-start-1 row-start-1 flex flex-col justify-end gap-6 p-6 lg:z-auto lg:col-auto lg:row-auto lg:order-1 lg:justify-center lg:p-0"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[#161616]">
            Tout pour votre
            <br />
            <span className="text-brand-orange lg:text-brand-blue">sanitaire</span>
            <br />
            au meilleur choix
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/90 lg:text-brand-gray">
            Sanitaire Plus vous propose une large gamme de produits sanitaires,
            plomberie, chauffage et climatisation. Qualité, design et
            performance au service de votre confort.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/produits" variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
              Découvrir nos produits
            </Button>
            <Button href="#contact" variant="secondary" icon={<Phone className="h-4 w-4" />}>
              Nous contacter
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Bloc 3 - Bandeau des avantages, straddling Hero and the next section */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden translate-y-1/2 sm:block">
        <AdvantagesBar />
      </div>
      <div className="mt-8 sm:hidden">
        <Container>
          <AdvantagesBar />
        </Container>
      </div>
    </section>
  );
}

function AdvantagesBar() {
  return (
    <Container>
      <Features />
    </Container>
  );
}
