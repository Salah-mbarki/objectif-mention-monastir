import { ShieldCheck, ShoppingCart, Truck, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Qualité garantie",
    subtitle: "Produits 100% certifiés",
  },
  {
    icon: ShoppingCart,
    title: "Large choix",
    subtitle: "Plus de 5000 références",
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    subtitle: "Partout en Tunisie",
  },
  {
    icon: Headphones,
    title: "Conseils experts",
    subtitle: "Une équipe à votre écoute",
  },
];

export default function Features() {
  return (
    <div className="relative -mt-4 z-20 mx-auto w-full max-w-6xl rounded-[28px] border border-white/60 bg-white/95 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur sm:-mt-6 sm:p-6 lg:-mt-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex min-h-[110px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-[#f8fbff] p-3 text-center"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white shadow-sm">
              <feature.icon
                className="h-6 w-6"
                aria-hidden="true"
                strokeWidth={2.2}
              />
            </div>
            <div className="mt-3 flex min-w-0 flex-col gap-1">
              <span className="text-sm font-semibold leading-tight text-[#1a1a1a]">{feature.title}</span>
              <span className="text-xs font-medium leading-tight text-brand-gray">{feature.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
