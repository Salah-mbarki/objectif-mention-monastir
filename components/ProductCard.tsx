import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover"
      aria-label={`Voir la fiche produit ${product.name}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 border-t border-gray-100 px-4 py-4">
        <span className="text-sm font-semibold text-[#1a1a1a]">{product.name}</span>
        <span className="text-xs text-brand-gray">{product.subtitle}</span>
        <span className="mt-1 text-base font-bold text-brand-orange">
          {product.price} {product.currency}
        </span>
      </div>
    </Link>
  );
}
