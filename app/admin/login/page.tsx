import LoginForm from "./login-form";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const s = await getAdminSession();
  if (s) redirect("/admin");
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-[var(--primary-dark)]">
          Espace administrateur
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1 mb-6">
          Connectez-vous pour gérer les documents et les commandes.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
