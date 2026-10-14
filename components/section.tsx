import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "paper" | "surface" | "night";
};

const tones = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  night: "bg-night text-white",
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "paper",
}: SectionProps) {
  const dark = tone === "night";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative py-20 sm:py-28 ${tones[tone]}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header data-reveal className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p
              className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.22em] sm:text-sm ${
                dark ? "text-marigold" : "text-marigold-deep"
              }`}
            >
              <span aria-hidden className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em]"
            >
              {title}
            </h2>
          </div>
          {intro && (
            <p
              className={`max-w-xl text-lg leading-relaxed lg:justify-self-end ${
                dark ? "text-white/75" : "text-muted"
              }`}
            >
              {intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

/** Highlights money, percentages and counts (e.g. "$4.2 mn", "~100%", "80+") in running text. */
export function Figures({
  text,
  className = "font-semibold text-marigold-deep",
}: {
  text: string;
  className?: string;
}) {
  const pattern =
    /(>?\$[\d.,]+\s?(?:mn|K)?\+?|~?\d+(?:\.\d+)?%|\b\d+(?:,\d{3})*\+(?=\s)|zero attrition)/g;
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
