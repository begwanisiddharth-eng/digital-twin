import type { CSSProperties } from "react";
import { Figures, Section } from "@/components/section";
import { resume } from "@/lib/resume-data";

export function About() {
  // Lead with the first sentence of the summary; the rest reads as body copy.
  const [lead, ...restSentences] = resume.summary.split(/(?<=\.)\s+/);
  const latest = resume.experience[0];

  return (
    <Section id="about" eyebrow="About me" title="Professional summary" tone="surface">
      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr]">
        <div>
          <p className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-snug tracking-[-0.015em] text-ink">
            {lead}
          </p>
          <p className="mt-6 text-lg leading-8 text-ink/85 sm:text-[1.2rem] sm:leading-9">
            {restSentences.join(" ")}
          </p>
        </div>

        <aside className="relative overflow-hidden rounded-3xl bg-night p-7 text-white sm:p-8">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-lapis/50 blur-3xl"
          />
          <h3 className="relative font-mono text-xs uppercase tracking-[0.22em] text-marigold">
            At a glance
          </h3>
          <dl className="relative mt-6 space-y-5">
            {[
              ["Most recent role", `${latest.roles[0].title}, ${latest.company}`],
              ["Based in", resume.location],
              ["Client geographies", "US, Europe, Japan, Australia"],
              ["Availability", resume.availabilityDetail],
            ].map(([term, detail]) => (
              <div key={term} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                <dt className="text-sm text-white/65">{term}</dt>
                <dd className="mt-0.5 text-[1.05rem] font-medium leading-snug">{detail}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}

export function Highlights() {
  return (
    <Section
      id="highlights"
      eyebrow="Highlights of work done"
      title="Impact beyond delivery"
      intro="Revenue originated and teams built alongside client delivery."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {resume.highlights.map((group, gi) => (
          <article
            key={group.title}
            className={`rounded-3xl p-7 sm:p-10 ${
              gi === 0
                ? "bg-surface ring-1 ring-line"
                : "bg-night text-white"
            }`}
          >
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]">
              {group.title}
            </h3>
            <ul className="mt-6">
              {group.bullets.map((b) => (
                <li
                  key={b}
                  className={`border-t py-4 text-[1.05rem] leading-relaxed last:pb-0 ${
                    gi === 0 ? "border-line text-ink" : "border-white/10 text-white/90"
                  }`}
                >
                  <Figures
                    text={b}
                    className={
                      gi === 0
                        ? "font-semibold text-marigold-deep"
                        : "font-semibold text-marigold"
                    }
                  />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  const [featured, ...others] = resume.projects;
  return (
    <Section
      id="projects"
      eyebrow="Key projects executed"
      title="Key client engagements"
      intro="Delivered remotely from India for global enterprise clients — from program governance to data science."
      tone="surface"
    >
      {/* Most recent engagement, given the full width */}
      <article className="relative overflow-hidden rounded-3xl bg-night p-7 text-white sm:p-10">
        <div
          aria-hidden
          className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-marigold/25 blur-3xl"
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-sm text-marigold">
              {featured.location} · {featured.years} · Most recent
            </p>
            <h3 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {featured.client}
            </h3>
            <p className="mt-2 text-xl font-medium text-sky">{featured.title}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
              {featured.description}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-sm text-white/65">Role</dt>
              <dd className="mt-1 font-semibold">{featured.role}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/65">Value</dt>
              <dd className="mt-1 font-display text-4xl font-bold text-marigold">
                {featured.value}
              </dd>
            </div>
          </dl>
        </div>
      </article>

      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {others.map((p) => (
          <li
            key={p.client}
            className="group flex flex-col rounded-3xl bg-paper p-7 ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:bg-surface hover:shadow-[0_24px_60px_-28px_rgba(10,18,48,0.35)] hover:ring-lapis/30 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-lapis-soft px-3 py-1 font-mono text-xs font-medium text-lapis">
                {p.location}
              </span>
              <span className="font-mono text-sm text-muted">{p.years}</span>
            </div>
            <h3 className="mt-5 font-display text-[1.75rem] font-bold leading-tight tracking-tight text-ink">
              {p.client}
            </h3>
            <p className="mt-1 font-semibold text-lapis">{p.title}</p>
            <p className="mt-4 flex-1 leading-relaxed text-ink/85">{p.description}</p>
            <dl className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted">Role</dt>
                <dd className="font-medium text-ink">{p.role}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Value</dt>
                <dd className="font-medium text-ink">
                  <Figures text={p.value} className="font-bold text-marigold-deep" />
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Experience() {
  const [cognizant, ...earlier] = resume.experience;
  const steps = cognizant.progression ?? [];
  const role = cognizant.roles[0];

  return (
    <Section
      id="experience"
      eyebrow="Professional experience"
      title="Career journey"
      intro="Two decades at Cognizant, from Consultant to Director, after a start in management consulting and software development."
    >
      <article className="rounded-3xl bg-surface p-7 ring-1 ring-line sm:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {cognizant.company}
          </h3>
          <span className="font-mono text-sm text-muted">{cognizant.period}</span>
        </div>

        {/* Career progression drawn as a rising staircase — each step is a promotion */}
        <ol className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:items-end sm:gap-2">
          {steps.map((step, i) => {
            const [title, year] = step.replace(")", "").split(" (");
            const last = i === steps.length - 1;
            return (
              <li
                key={step}
                style={{ "--h": `${5 + i * 2.25}rem` } as CSSProperties}
                className={`flex flex-col justify-end rounded-2xl p-4 sm:h-[var(--h)] ${
                  last
                    ? "bg-night text-white"
                    : "bg-lapis-soft text-ink"
                }`}
              >
                <span
                  className={`font-mono text-sm ${last ? "text-marigold" : "text-lapis"}`}
                >
                  {year}
                </span>
                <span className="mt-1 font-semibold leading-snug">{title}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-6 border-t border-line pt-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h4 className="font-display text-xl font-bold text-ink">{role.title}</h4>
            <p className="mt-1 font-mono text-sm text-muted">{role.period}</p>
          </div>
          <div>
            <p className="text-[1.1rem] leading-relaxed text-ink/90">{role.summary}</p>
            <a
              href="#projects"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-lapis underline decoration-lapis/30 underline-offset-4 hover:decoration-lapis"
            >
              See the key client engagements from this period
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </article>

      <ol className="mt-6 grid gap-6 md:grid-cols-2">
        {earlier.map((job) => (
          <li
            key={`${job.company}-${job.period}`}
            className="rounded-3xl bg-surface p-7 ring-1 ring-line sm:p-8"
          >
            <p className="font-mono text-sm text-muted">{job.period}</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
              {job.company}
            </h3>
            {job.roles.map((r) => (
              <div key={r.title} className="mt-3">
                <p className="font-semibold text-lapis">{r.title}</p>
                {r.summary && <p className="mt-3 leading-relaxed text-ink/85">{r.summary}</p>}
                {r.bullets && (
                  <ul className="mt-3 space-y-2">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed text-ink/85">
                        <span aria-hidden className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                        <span>
                          <Figures text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {job.note && (
              <p className="mt-4 border-t border-line pt-4 text-[0.98rem] italic text-muted">
                {job.note}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
