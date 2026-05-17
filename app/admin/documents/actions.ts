"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { documentSchema } from "@/lib/validation";
import {
  deletePublicFile,
  saveDocumentFile,
  saveImageFile,
} from "@/lib/upload";

type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  ok?: boolean;
};

function extractFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    level: String(formData.get("level") ?? ""),
    section: String(formData.get("section") ?? ""),
    kind: String(formData.get("kind") ?? ""),
    price: Number(formData.get("price") ?? 0),
    stock:
      formData.get("stock") === null || formData.get("stock") === ""
        ? undefined
        : Number(formData.get("stock")),
  };
}

function flattenZod(err: import("zod").ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const k = issue.path.join(".");
    if (!out[k]) out[k] = issue.message;
  }
  return out;
}

export async function createDocumentAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const fields = extractFields(formData);
  const parsed = documentSchema.safeParse(fields);
  if (!parsed.success) {
    return {
      error: "Champs invalides.",
      fieldErrors: flattenZod(parsed.error),
    };
  }
  const data = parsed.data;

  const fileField = formData.get("file");
  const imageField = formData.get("image");

  let filePath: string | null = null;
  let fileName: string | null = null;
  let fileMime: string | null = null;
  let imagePath: string | null = null;

  try {
    if (data.kind === "DIGITAL") {
      if (!(fileField instanceof File) || fileField.size === 0) {
        return {
          error: "Veuillez joindre un fichier PDF ou Word.",
          fieldErrors: { file: "Fichier requis." },
        };
      }
      const saved = await saveDocumentFile(fileField);
      filePath = saved.publicPath;
      fileName = saved.fileName;
      fileMime = saved.mimeType;
    }
    if (imageField instanceof File && imageField.size > 0) {
      const saved = await saveImageFile(imageField);
      imagePath = saved.publicPath;
    }
    if (data.kind === "PAPER" && !imagePath) {
      return {
        error: "Veuillez joindre une photo de la couverture.",
        fieldErrors: { image: "Image requise pour un document papier." },
      };
    }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Erreur d'upload." };
  }

  await prisma.document.create({
    data: {
      title: data.title,
      description: data.description || null,
      subject: data.subject,
      level: data.level,
      section: data.section || null,
      kind: data.kind,
      price: data.price,
      stock: data.kind === "PAPER" ? data.stock ?? 0 : null,
      filePath,
      fileName,
      fileMimeType: fileMime,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/documents");
  revalidatePath("/admin");
  revalidatePath("/admin/documents");
  redirect("/admin/documents");
}

export async function updateDocumentAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const existing = await prisma.document.findUnique({ where: { id } });
  if (!existing) return { error: "Document introuvable." };

  const fields = extractFields(formData);
  const parsed = documentSchema.safeParse(fields);
  if (!parsed.success) {
    return {
      error: "Champs invalides.",
      fieldErrors: flattenZod(parsed.error),
    };
  }
  const data = parsed.data;

  const fileField = formData.get("file");
  const imageField = formData.get("image");

  let filePath = existing.filePath;
  let fileName = existing.fileName;
  let fileMime = existing.fileMimeType;
  let imagePath = existing.imagePath;
  const oldFileToDelete: string[] = [];

  try {
    if (data.kind === "DIGITAL") {
      if (fileField instanceof File && fileField.size > 0) {
        const saved = await saveDocumentFile(fileField);
        if (existing.filePath) oldFileToDelete.push(existing.filePath);
        filePath = saved.publicPath;
        fileName = saved.fileName;
        fileMime = saved.mimeType;
      } else if (!existing.filePath) {
        return {
          error: "Veuillez joindre un fichier PDF ou Word.",
          fieldErrors: { file: "Fichier requis." },
        };
      }
    } else {
      // Switched to PAPER: drop file
      if (existing.filePath) oldFileToDelete.push(existing.filePath);
      filePath = null;
      fileName = null;
      fileMime = null;
    }

    if (imageField instanceof File && imageField.size > 0) {
      const saved = await saveImageFile(imageField);
      if (existing.imagePath) oldFileToDelete.push(existing.imagePath);
      imagePath = saved.publicPath;
    }
    if (data.kind === "PAPER" && !imagePath) {
      return {
        error: "Veuillez joindre une photo de la couverture.",
        fieldErrors: { image: "Image requise pour un document papier." },
      };
    }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Erreur d'upload." };
  }

  await prisma.document.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description || null,
      subject: data.subject,
      level: data.level,
      section: data.section || null,
      kind: data.kind,
      price: data.price,
      stock: data.kind === "PAPER" ? data.stock ?? 0 : null,
      filePath,
      fileName,
      fileMimeType: fileMime,
      imagePath,
    },
  });

  for (const p of oldFileToDelete) await deletePublicFile(p);

  revalidatePath("/");
  revalidatePath("/documents");
  revalidatePath(`/documents/${id}`);
  revalidatePath("/admin/documents");
  redirect("/admin/documents");
}

export async function deleteDocumentAction(formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) return;
  await prisma.document.delete({ where: { id } });
  await deletePublicFile(doc.filePath);
  await deletePublicFile(doc.imagePath);
  revalidatePath("/");
  revalidatePath("/documents");
  revalidatePath("/admin/documents");
}
