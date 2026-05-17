import { put, del } from "@vercel/blob";
import path from "path";
import { randomBytes } from "crypto";
import {
  ACCEPTED_DOC_MIMES,
  ACCEPTED_IMAGE_MIMES,
  MAX_UPLOAD_SIZE_MB,
} from "./constants";

function safeExt(name: string) {
  const ext = path.extname(name).toLowerCase();
  if (!/^\.[a-z0-9]{2,5}$/.test(ext)) return "";
  return ext;
}

function buildKey(subdir: string, originalName: string) {
  const id = randomBytes(8).toString("hex");
  const ext = safeExt(originalName);
  return `${subdir}/${Date.now()}-${id}${ext}`;
}

function assertSize(file: File) {
  const limit = MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  if (file.size > limit) {
    throw new Error(
      `Fichier trop volumineux (max ${MAX_UPLOAD_SIZE_MB} Mo).`,
    );
  }
  if (file.size === 0) {
    throw new Error("Fichier vide.");
  }
}

function ensureBlobToken() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Stockage des fichiers non configuré : BLOB_READ_WRITE_TOKEN manquant.",
    );
  }
}

export async function saveDocumentFile(file: File) {
  assertSize(file);
  if (!ACCEPTED_DOC_MIMES.includes(file.type as never)) {
    throw new Error("Format non supporté. Utilisez PDF ou Word (.doc/.docx).");
  }
  ensureBlobToken();
  const key = buildKey("documents", file.name);
  const result = await put(key, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return {
    publicPath: result.url,
    fileName: file.name,
    mimeType: file.type,
  };
}

export async function saveImageFile(file: File) {
  assertSize(file);
  if (!ACCEPTED_IMAGE_MIMES.includes(file.type as never)) {
    throw new Error("Image non supportée. Utilisez JPG, PNG ou WebP.");
  }
  ensureBlobToken();
  const key = buildKey("images", file.name);
  const result = await put(key, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return { publicPath: result.url };
}

export async function deletePublicFile(publicPath: string | null | undefined) {
  if (!publicPath) return;
  // Only attempt deletion of Vercel Blob URLs
  if (
    !/^https?:\/\/[^/]*\.public\.blob\.vercel-storage\.com\//.test(publicPath)
  )
    return;
  try {
    await del(publicPath);
  } catch {
    // ignore — file may already be gone
  }
}
