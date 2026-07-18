import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sanitaireplus.tn"),
  title: "Sanitaire Plus | Sanitaire, plomberie, chauffage et climatisation à Monastir",
  description:
    "Sanitaire Plus vous propose une large gamme de produits sanitaires, plomberie, chauffage et climatisation à Monastir, Tunisie. Qualité garantie, plus de 5000 références, livraison rapide.",
  keywords: [
    "sanitaire Monastir",
    "plomberie Tunisie",
    "chauffage climatisation Monastir",
    "quincaillerie sanitaire",
  ],
  openGraph: {
    title: "Sanitaire Plus | Sanitaire, plomberie, chauffage et climatisation",
    description:
      "Large gamme de produits sanitaires, plomberie, chauffage et climatisation. Livraison partout en Tunisie.",
    locale: "fr_TN",
    type: "website",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: "Sanitaire Plus",
  image: "https://www.sanitaireplus.tn/images/hero/hero-bathroom.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Route de Khnis",
    postalCode: "5000",
    addressLocality: "Monastir",
    addressCountry: "TN",
  },
  telephone: "+21650706663",
  email: "sanitaire.plus9@gmail.com",
  openingHours: "Mo-Sa 08:00-18:00",
  foundingDate: "2010",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
