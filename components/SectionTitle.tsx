interface SectionTitleProps {
  title: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionTitle({ title, align = "center", className = "" }: SectionTitleProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-10 flex flex-col gap-3 sm:mb-12 ${alignment} ${className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a] sm:text-3xl">
        {title}
      </h2>
      <span className="h-1 w-10 rounded-full bg-brand-orange" aria-hidden="true" />
    </div>
  );
}
