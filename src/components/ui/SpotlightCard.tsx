"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canHover()) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--spotlight-x", `${x}px`);
    el.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!canHover()) return;

    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spotlight-x", "50%");
    el.style.setProperty("--spotlight-y", "50%");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("spotlight-card relative overflow-hidden", className)}
    >
      {children}
    </div>
  );
}