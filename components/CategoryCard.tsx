import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/types/category";

const accentClasses: Record<Category["accent"], { badge: string; text: string }> = {
  blue: { badge: "bg-brand-blue", text: "text-brand-blue" },
  orange: { badge: "bg-brand-orange", text: "text-brand-orange" },
  green: { badge: "bg-brand-green", text: "text-brand-green" },
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const accent = accentClasses[category.accent];
  const Icon = category.icon;

  return (
    <Link
      href={`/produits?categorie=${category.slug}`}
      className="group flex flex-col gap-3 outline-none"
      aria-label={`Voir les produits de la catégorie ${category.name}`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-card transition-shadow duration-300 group-hover:shadow-card-hover">
        <Image
          src={category.image}
          alt={`Catégorie ${category.name}`}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-md ${accent.badge}`}
        >
          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
      </div>
      <span className={`flex items-center gap-1 text-sm font-semibold ${accent.text}`}>
        {category.name}
        <ChevronRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
