import type { LucideIcon } from "lucide-react";

export type CategoryAccent = "blue" | "orange" | "green";

export interface Category {
  slug: string;
  name: string;
  image: string;
  icon: LucideIcon;
  accent: CategoryAccent;
}
