// Domain constants for Objectif Mention Monastir

export const SUBJECTS = [
  { value: "PHYSIQUE", label: "Physique" },
  { value: "CHIMIE", label: "Chimie" },
] as const;

export type SubjectValue = (typeof SUBJECTS)[number]["value"];

export const LEVELS = [
  { value: "PREMIERE", label: "1ère année secondaire" },
  { value: "DEUXIEME", label: "2ème année secondaire" },
  { value: "TROISIEME", label: "3ème année secondaire" },
  { value: "BACCALAUREAT", label: "Baccalauréat" },
] as const;

export type LevelValue = (typeof LEVELS)[number]["value"];

// Sections du système éducatif tunisien (à partir de la 2ème année)
export const SECTIONS = [
  { value: "SCIENCES", label: "Sciences expérimentales" },
  { value: "MATHEMATIQUES", label: "Mathématiques" },
  { value: "TECHNIQUE", label: "Sciences techniques" },
  { value: "INFORMATIQUE", label: "Sciences de l'informatique" },
  { value: "ECONOMIE", label: "Économie et gestion" },
  { value: "LETTRES", label: "Lettres" },
  { value: "SPORT", label: "Sport" },
] as const;

export type SectionValue = (typeof SECTIONS)[number]["value"];

export const DOC_KINDS = [
  { value: "DIGITAL", label: "Document numérique (PDF / Word)" },
  { value: "PAPER", label: "Document papier (stock limité)" },
] as const;

export type DocKindValue = (typeof DOC_KINDS)[number]["value"];

// Délégations du gouvernorat de Monastir (zones de livraison autorisées)
export const DELIVERY_CITIES = [
  "Monastir",
  "Ouerdanine",
  "Sahline",
  "Zéramdine",
  "Beni Hassen",
  "Jemmal",
  "Bembla",
  "Menzel Hayet",
  "Moknine",
  "Ksar Hellal",
  "Ksibet El Mediouni",
  "Téboulba",
  "Bekalta",
  "Sayada",
  "Lamta",
  "Bouhjar",
] as const;

export const ORDER_STATUSES = [
  { value: "PENDING", label: "En attente" },
  { value: "CONFIRMED", label: "Confirmée" },
  { value: "DELIVERED", label: "Livrée" },
  { value: "CANCELLED", label: "Annulée" },
] as const;

export const labelOf = (
  list: ReadonlyArray<{ value: string; label: string }>,
  value: string | null | undefined,
) => list.find((x) => x.value === value)?.label ?? value ?? "";

export const ACCEPTED_DOC_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ACCEPTED_IMAGE_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_UPLOAD_SIZE_MB = 25;
