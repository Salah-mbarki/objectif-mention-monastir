import { z } from "zod";
import {
  DELIVERY_CITIES,
  DOC_KINDS,
  LEVELS,
  SECTIONS,
  SUBJECTS,
} from "./constants";

const subjectEnum = z.enum(SUBJECTS.map((s) => s.value) as [string, ...string[]]);
const levelEnum = z.enum(LEVELS.map((l) => l.value) as [string, ...string[]]);
const sectionEnum = z.enum(SECTIONS.map((s) => s.value) as [string, ...string[]]);
const kindEnum = z.enum(DOC_KINDS.map((k) => k.value) as [string, ...string[]]);
const cityEnum = z.enum(DELIVERY_CITIES as unknown as [string, ...string[]]);

export const documentSchema = z
  .object({
    title: z.string().trim().min(2, "Titre trop court").max(160),
    description: z.string().trim().max(2000).optional().or(z.literal("")),
    subject: subjectEnum,
    level: levelEnum,
    section: sectionEnum.optional().or(z.literal("")),
    kind: kindEnum,
    price: z.coerce.number().min(0).max(10000).default(0),
    stock: z.coerce.number().int().min(0).max(100000).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.kind === "PAPER" && (v.stock === undefined || v.stock === null)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le stock est obligatoire pour un document papier.",
        path: ["stock"],
      });
    }
  });

// Tunisian phone: 8 digits, may start with +216 or 216
const phoneRegex = /^(?:\+?216)?[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{3}$/;

export const orderItemSchema = z.object({
  documentId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20),
});

export const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Nom trop court").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "Numéro invalide")
    .max(20)
    .regex(phoneRegex, "Numéro de téléphone invalide (format tunisien)"),
  email: z
    .string()
    .trim()
    .email("Email invalide")
    .max(160)
    .optional()
    .or(z.literal("")),
  city: cityEnum,
  address: z.string().trim().min(5, "Adresse trop courte").max(300),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  items: z.array(orderItemSchema).min(1, "Aucun document sélectionné"),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type DocumentInput = z.infer<typeof documentSchema>;
