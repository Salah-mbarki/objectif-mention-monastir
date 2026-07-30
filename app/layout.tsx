import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { CartProvider } from "@/components/cart-context";
import HeaderCartButton from "@/components/header-cart-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Objectif Mention Monastir",
  description:
    "Documents et exercices scientifiques (Physique, Chimie) pour les élèves du secondaire — livraison à Monastir et ses environs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        <CartProvider>
          <header className="border-b border-[var(--border)] bg-white sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="/icon_only_logo.png"
                  alt="Objectif Mention Monastir"
                  width={72}
                  height={72}
                  priority
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
                <span className="font-bold text-xl sm:text-2xl text-[var(--primary-dark)] hidden sm:block">
                  Objectif Mention Monastir
                </span>
              </Link>
              <nav className="ml-auto flex items-center gap-1 sm:gap-2">
                <Link href="/" className="btn-ghost">Accueil</Link>
                <Link href="/documents" className="btn-ghost">Documents</Link>
                <Link href="/commander" className="btn-ghost">Commander</Link>
                <HeaderCartButton />
              </nav>
            </div>
          </header>

          <main className="flex-1 w-full">{children}</main>

          <footer className="border-t border-[var(--border)] bg-[var(--primary-light)] mt-12">
            <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-[var(--primary-dark)] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <div>
                © {new Date().getFullYear()} Objectif Mention Monastir — Tous droits réservés.
              </div>
              <div className="flex items-center gap-3">
                <span>Paiement à la livraison • Monastir centre</span>
                <Link href="/admin" className="opacity-60 hover:opacity-100">
                  Espace admin
                </Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

