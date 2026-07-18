import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline-light" | "solid-light";

interface BaseProps {
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

type ButtonAsButtonProps = BaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type Props = LinkProps | ButtonAsButtonProps;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-card hover:shadow-card-hover",
  secondary:
    "bg-white text-[#1a1a1a] border border-gray-300 hover:border-brand-blue hover:text-brand-blue",
  "outline-light":
    "bg-transparent text-white border border-white/70 hover:bg-white/10",
  "solid-light": "bg-white text-brand-blue hover:bg-gray-50 shadow-card",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] whitespace-nowrap";

export default function Button(props: Props) {
  const {
    variant = "primary",
    icon,
    iconPosition = "right",
    className = "",
    children,
  } = props;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as LinkProps;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButtonProps;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
