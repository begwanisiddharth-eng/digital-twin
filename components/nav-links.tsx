"use client";

import { useEffect, useState } from "react";

type Item = { href: string; label: string };

/** Section links that highlight whichever section is currently in view. */
export function NavLinks({ items, compact = false }: { items: Item[]; compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <ul
      className={
        compact
          ? "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-1.5 text-[0.95rem] [scrollbar-width:none] sm:px-6"
          : "flex items-center gap-1 text-[0.95rem]"
      }
    >
      {items.map((item) => {
        const isActive = active === item.href;
        return (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              className={`relative block rounded-full px-3.5 py-2 transition-colors ${
                compact ? "py-1.5" : ""
              } ${isActive ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute inset-x-3.5 -bottom-px h-0.5 origin-left rounded-full bg-marigold transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
