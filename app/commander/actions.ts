"use server";

import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export type PlaceOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

type RawItem = { documentId: string; quantity: number };
type RawInput = {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
  items: RawItem[];
};

export async function placeOrder(input: RawInput): Promise<PlaceOrderResult> {
  const parsed = orderSchema.safeParse({ ...input, city: "Monastir" });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return {
      ok: false,
      error: "Veuillez corriger les champs du formulaire.",
      fieldErrors,
    };
  }
  const data = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const ids = Array.from(new Set(data.items.map((i) => i.documentId)));
      const docs = await tx.document.findMany({ where: { id: { in: ids } } });
      const docMap = new Map(docs.map((d) => [d.id, d]));

      // Validate and aggregate
      const items: { documentId: string; quantity: number; unitPrice: number }[] = [];
      let total = 0;
      for (const it of data.items) {
        const doc = docMap.get(it.documentId);
        if (!doc) throw new Error(`Document introuvable: ${it.documentId}`);
        if (doc.kind === "PAPER") {
          const available = doc.stock ?? 0;
          if (available < it.quantity) {
            throw new Error(
              `Stock insuffisant pour « ${doc.title} » (reste ${available}).`,
            );
          }
        }
        items.push({
          documentId: doc.id,
          quantity: it.quantity,
          unitPrice: doc.price,
        });
        total += doc.price * it.quantity;
      }

      const created = await tx.order.create({
        data: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email || null,
          city: data.city,
          address: data.address,
          notes: data.notes || null,
          totalPrice: total,
          items: { create: items },
        },
      });

      // Decrement stock for PAPER docs
      for (const it of data.items) {
        const doc = docMap.get(it.documentId)!;
        if (doc.kind === "PAPER") {
          await tx.document.update({
            where: { id: doc.id },
            data: { stock: { decrement: it.quantity } },
          });
        }
      }

      return created;
    });

    revalidatePath("/documents");
    revalidatePath("/admin/orders");
    return { ok: true, orderId: order.id };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return { ok: false, error: msg };
  }
}
