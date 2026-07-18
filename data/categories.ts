import { Bath, Wrench, Flame, Snowflake, ShowerHead } from "lucide-react";
import type { Category } from "@/types/category";

export const categories: Category[] = [
  {
    slug: "salle-de-bain",
    name: "Salle de bain",
    image: "/images/Univers/Salle_de_bain.jpg",
    icon: Bath,
    accent: "blue",
  },
  {
    slug: "plomberie",
    name: "Plomberie",
    image: "/images/Univers/Plomberie.jpg",
    icon: Wrench,
    accent: "orange",
  },
  {
    slug: "chauffage",
    name: "Chauffage",
    image: "/images/Univers/Chauffage.jpg",
    icon: Flame,
    accent: "green",
  },
  {
    slug: "climatisation",
    name: "Climatisation",
    image: "/images/Univers/Climatisation.jpg",
    icon: Snowflake,
    accent: "blue",
  },
  {
    slug: "accessoires",
    name: "Accessoires",
    image: "/images/Univers/Accessoire.jpg",
    icon: ShowerHead,
    accent: "orange",
  },
];
