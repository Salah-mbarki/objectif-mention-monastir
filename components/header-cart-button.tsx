"use client";

import Link from "next/link";
import { useCart } from "./cart-context";

export default function HeaderCartButton() {
  const { count } = useCart();
  return (
    <Link
      href="/commander"
      className="relative btn-outline px-3 py-2 text-sm"
      aria-label="Voir le panier"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <circle cx={9} cy={21} r={1} />
        <circle cx={20} cy={21} r={1} />
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
      </svg>
      <span className="hidden sm:inline">Panier</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
          {count}
        </span>
      )}
    </Link>
  );
}
