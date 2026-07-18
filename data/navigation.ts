export interface NavLink {
  label: string;
  href: string;
}

// Home page anchors. "Produits" and "Services" point to dedicated pages
// per the sitemap in the cahier des charges; anchors are used for sections
// that already live on the landing page.
export const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "Univers", href: "#univers" },
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "#contact" },
];

export const WHATSAPP_NUMBER = "21650706663";
export const WHATSAPP_DISPLAY = "50 706 663";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = "sanitaire.plus9@gmail.com";
export const COMPANY_ADDRESS = "Route de Khnis, 5000 Monastir";
export const COMPANY_HOURS = "Lun - Sam : 08h00 - 18h00";
