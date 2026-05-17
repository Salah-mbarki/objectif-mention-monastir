"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function loginAction(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!username || !password) {
    return { error: "Veuillez renseigner l'identifiant et le mot de passe." };
  }
  if (!verifyAdminCredentials(username, password)) {
    return { error: "Identifiants invalides." };
  }
  await createAdminSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
