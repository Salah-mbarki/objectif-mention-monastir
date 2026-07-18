import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, Clock, Sparkles } from "lucide-react";
import Container from "@/components/Container";
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_HOURS,
} from "@/data/navigation";
import { categories } from "@/data/categories";

const usefulLinks = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "#contact" },
];

// Social links point to the client's real accounts once provided; using
// their public handle root as a safe placeholder until KweekTech collects
// the real URLs before go-live, per the cahier des charges.
const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-[#1a1a1a]">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2" aria-label="Sanitaire Plus - Accueil">
            <Image
              src="/images/header/logo.png"
              alt=""
              width={220}
              height={36}
              className="h-16 w-auto sm:h-20"
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-[#4a4a4a]">
            Sanitaire Plus, votre spécialiste en équipements sanitaires,
            plomberie, chauffage et climatisation. Qualité, fiabilité et
            service.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f7fb] transition-colors hover:bg-[#e8f0f8]"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-[#1a1a1a]">Liens utiles</h3>
          <ul className="flex flex-col gap-2">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-[#4a4a4a] transition-colors hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-[#1a1a1a]">Nos univers</h3>
          <ul className="flex flex-col gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/produits?categorie=${category.slug}`}
                  className="text-sm text-[#4a4a4a] transition-colors hover:text-brand-blue"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-[#1a1a1a]">Contactez-nous</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#4a4a4a]">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{COMPANY_ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-brand-blue">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-blue"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{COMPANY_HOURS}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-gray-800 bg-black">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-gray-300 sm:flex-row">
          <p>© {year} Sanitaire Plus. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-white">
              Politique de confidentialité
            </Link>
          </div>
          {/* Mandatory credit per cahier des charges: must remain a clickable
              link to kweektech.com and must not be removable from any
              back-office. Do not gate this behind a CMS field. */}
          <a
            href="https://kweektech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 font-medium text-brand-footer transition-colors hover:bg-amber-300"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            created by kweektech
          </a>
        </Container>
      </div>
    </footer>
  );
}
