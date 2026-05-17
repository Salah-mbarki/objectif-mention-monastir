"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  documentId: string;
  title: string;
  kind: "DIGITAL" | "PAPER";
  price: number;
  quantity: number;
  maxStock?: number | null; // for PAPER
};

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (documentId: string) => void;
  setQuantity: (documentId: string, quantity: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "omm.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.documentId === item.documentId);
      if (existing) {
        const q = existing.quantity + item.quantity;
        const max =
          item.kind === "PAPER" && item.maxStock != null
            ? Math.max(1, item.maxStock)
            : 20;
        return prev.map((p) =>
          p.documentId === item.documentId
            ? { ...p, quantity: Math.min(q, max) }
            : p,
        );
      }
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((documentId: string) => {
    setItems((prev) => prev.filter((p) => p.documentId !== documentId));
  }, []);

  const setQuantity = useCallback((documentId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.documentId !== documentId) return p;
        const max =
          p.kind === "PAPER" && p.maxStock != null
            ? Math.max(1, p.maxStock)
            : 20;
        return { ...p, quantity: Math.min(Math.max(1, quantity), max) };
      }),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items],
  );
  const count = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items],
  );

  return (
    <Ctx.Provider
      value={{ items, add, remove, setQuantity, clear, total, count }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
