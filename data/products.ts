import type { Product } from "@/types/product";

// NOTE: Per the cahier des charges (Bloc 6), these prices must ultimately be
// served from the back-office / products database rather than hard-coded.
// This file acts as the local fallback / seed data shape used to render the
// "Nos produits phares" section until that API is wired up.
export const featuredProducts: Product[] = [
  {
    slug: "mitigeur-lavabo",
    name: "Mitigeur lavabo",
    subtitle: "Design premium",
    price: 199,
    currency: "DT",
    image: "/images/products/Mitigeur_lavabo.jpg",
  },
  {
    slug: "colonne-douche",
    name: "Colonne de douche",
    subtitle: "Moderne",
    price: 599,
    currency: "DT",
    image: "/images/products/Colonne_douche.jpg",
  },
  {
    slug: "pack-wc-complet",
    name: "Pack WC complet",
    subtitle: "Économie d'eau",
    price: 449,
    currency: "DT",
    image: "/images/products/pack_WC.jpg",
  },
  {
    slug: "radiateur",
    name: "Radiateur",
    subtitle: "Haute performance",
    price: 349,
    currency: "DT",
    image: "/images/products/Radiateur.jpg",
  },
  {
    slug: "chauffe-eau",
    name: "Chauffe-eau",
    subtitle: "Électrique",
    price: 899,
    currency: "DT",
    image: "/images/products/Chauffe_eau.jpg",
  },
];
