"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED = ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"] as const;

export async function updateOrderStatusAction(formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !ALLOWED.includes(status as (typeof ALLOWED)[number])) return;

  const current = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { document: true } } },
  });
  if (!current) return;

  // If we cancel a previously non-cancelled order, restore stock for PAPER docs.
  if (status === "CANCELLED" && current.status !== "CANCELLED") {
    for (const it of current.items) {
      if (it.document.kind === "PAPER") {
        await prisma.document.update({
          where: { id: it.documentId },
          data: { stock: { increment: it.quantity } },
        });
      }
    }
  }
  // If we re-open a cancelled order back, decrement again (best effort).
  if (current.status === "CANCELLED" && status !== "CANCELLED") {
    for (const it of current.items) {
      if (it.document.kind === "PAPER") {
        await prisma.document.update({
          where: { id: it.documentId },
          data: { stock: { decrement: it.quantity } },
        });
      }
    }
  }

  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function deleteOrderAction(formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { document: true } } },
  });
  if (!order) return;
  // Restore stock if not yet cancelled
  if (order.status !== "CANCELLED") {
    for (const it of order.items) {
      if (it.document.kind === "PAPER") {
        await prisma.document.update({
          where: { id: it.documentId },
          data: { stock: { increment: it.quantity } },
        });
      }
    }
  }
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
