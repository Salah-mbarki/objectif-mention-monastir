import { Phone } from "lucide-react";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/data/navigation";

interface WhatsAppButtonProps {
  className?: string;
  variant?: "header" | "banner";
  label?: string;
}

/**
 * Every "phone" style button in the mockup (header, final CTA banner, footer)
 * must open a WhatsApp conversation instead of a native tel: call, per the
 * cahier des charges. Centralising that link here keeps the behaviour
 * consistent everywhere it's used.
 */
export default function WhatsAppButton({
  className = "",
  variant = "header",
  label,
}: WhatsAppButtonProps) {
  const styles =
    variant === "header"
      ? "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-card"
      : "bg-brand-blue text-white border border-white/60 hover:bg-brand-blue-dark";

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contacter Sanitaire Plus sur WhatsApp au ${WHATSAPP_DISPLAY}`}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 active:scale-[0.98] ${styles} ${className}`}
    >
      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label ?? WHATSAPP_DISPLAY}</span>
    </a>
  );
}
