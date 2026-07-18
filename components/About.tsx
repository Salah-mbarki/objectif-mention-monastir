"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Medal } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";

const points = [
  "Produits de qualité aux meilleurs prix",
  "Plus de 10 ans d'expérience",
  "Service client réactif et personnalisé",
  "Solutions adaptées à tous vos besoins",
];

export default function About() {
  return (
    <section id="a-propos" className="scroll-mt-24 bg-brand-blue-light py-16 sm:py-20">
      <Container>
        <div className="relative grid grid-rows-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image layer — sits BEHIND the text on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative z-0 col-start-1 row-start-1 aspect-[4/5] w-full overflow-hidden rounded-2xl lg:z-auto lg:col-auto lg:row-auto lg:order-2 lg:aspect-[5/4]"
          >
            <Image
              src="/images/about/Modern_Bathroom.jpg"
              alt="Salle de bain moderne avec douche à l'italienne"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            {/* Darkening gradient so the overlaid text stays legible on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent lg:hidden" />

            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl bg-brand-blue px-5 py-4 text-white shadow-lg">
              <Medal className="h-8 w-8 shrink-0" aria-hidden="true" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold">+10</span>
                <span className="text-xs">Ans d&apos;expérience</span>
              </div>
            </div>
          </motion.div>

          {/* Text layer — sits ON TOP of the image on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 col-start-1 row-start-1 flex flex-col justify-end gap-5 p-6 lg:z-auto lg:col-auto lg:row-auto lg:order-1 lg:justify-center lg:p-0"
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[#161616]">
                À propos de
                <br />
                <span className="text-brand-orange lg:text-brand-blue">Sanitaire Plus</span>
              </h2>
              <span className="h-1 w-10 rounded-full bg-brand-orange" aria-hidden="true" />
            </div>
            <p className="max-w-md text-base leading-relaxed text-white/90 lg:text-brand-gray">
              Depuis 2010, Sanitaire Plus est votre partenaire de confiance
              pour tous vos équipements sanitaires, plomberie, chauffage et
              climatisation.
            </p>
            <ul className="flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-white lg:text-[#1a1a1a]">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange lg:text-brand-blue"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div>
              <Button href="/a-propos" variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
                En savoir plus
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}