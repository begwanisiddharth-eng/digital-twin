import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "plain" | "tinted";
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "plain",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={
        tone === "tinted"
          ? "border-y border-line bg-surface py-20 sm:py-24"
          : "py-20 sm:py-24"
      }
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mb-10 max-w-3xl sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-2 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
