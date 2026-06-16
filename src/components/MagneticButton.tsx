import { useRef, type MouseEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function MagneticButton({ children, to, href, onClick, variant = "primary", className = "", type = "button", disabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "group relative inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.22em] font-mono transition-colors duration-300";
  const styles =
    variant === "primary"
      ? `text-white bg-blue-600 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`
      : `text-foreground border border-border ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:text-blue-500'}`;

  const inner = (
    <div ref={ref} className="magnetic inline-block" onMouseMove={onMove} onMouseLeave={onLeave}>
      <span className={`${base} ${styles} ${className}`}>
        <span>{children}</span>
        <svg width="14" height="10" viewBox="0 0 14 10" className="transition-transform duration-300 group-hover:translate-x-1.5">
          <path d="M0 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </span>
    </div>
  );

  if (to) {
    return (
      <Link to={to}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href}>{inner}</a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
