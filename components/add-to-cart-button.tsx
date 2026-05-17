"use client";

import { useCart } from "./cart-context";

type Props = {
  documentId: string;
  title: string;
  kind: "DIGITAL" | "PAPER";
  price: number;
  stock?: number | null;
};

export default function AddToCartButton({
  documentId,
  title,
  kind,
  price,
  stock,
}: Props) {
  const { add, items } = useCart();
  const already = items.find((i) => i.documentId === documentId);
  const outOfStock = kind === "PAPER" && (stock ?? 0) <= 0;

  return (
    <button
      type="button"
      disabled={outOfStock}
      onClick={() => {
        add({
          documentId,
          title,
          kind,
          price,
          quantity: 1,
          maxStock: kind === "PAPER" ? stock ?? 0 : undefined,
        });
      }}
      className="btn-primary w-full"
    >
      {outOfStock
        ? "Rupture de stock"
        : already
          ? "Ajouté au panier ✓"
          : "Ajouter au panier"}
    </button>
  );
}
