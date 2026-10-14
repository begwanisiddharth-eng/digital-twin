"use client";

import { useEffect } from "react";

/**
 * Arms scroll reveals for every [data-reveal] element. Content stays visible
 * without JS (or with reduced motion) because the hidden state only applies
 * under html.reveal-on, which is added here.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    // Reveal anything already on screen immediately to avoid a flash.
    const vh = window.innerHeight;
    for (const el of els) {
      if (el.getBoundingClientRect().top < vh) el.classList.add("is-visible");
      else io.observe(el);
    }
    root.classList.add("reveal-on");
    return () => io.disconnect();
  }, []);

  return null;
}
