import { OpenChatButton } from "@/components/open-chat-button";
import { Figures, Section } from "@/components/section";
import { resume } from "@/lib/resume-data";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skillsets"
      title="Competencies & technical skills"
      intro="Consulting depth paired with hands-on technology — from CRM platforms to machine learning."
      tone="night"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight">Core competencies</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {resume.coreCompetencies.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 leading-snug transition hover:border-marigold/50 hover:bg-white/[0.07]"
              >
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-marigold" />
                <span className="font-medium text-white/95">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight">Technical skills</h3>
          <dl className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">
            {resume.technicalSkills.map((s) => (
              <div key={s.category} className="grid gap-3 p-5 sm:grid-cols-[9.5rem_1fr] sm:gap-5 sm:p-6">
                <dt className="font-mono text-sm uppercase tracking-[0.14em] text-marigold sm:pt-1.5">
                  {s.category}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-white/10 px-3.5 py-1.5 text-[0.95rem] font-medium text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education & certifications"
      title="Learning that never stopped"
      intro={resume.educationNote}
      tone="surface"
    >
      <h3 className="sr-only">Education</h3>
      <ul className="grid gap-5 sm:grid-cols-2">
        {resume.education.map((e) => (
          <li
            key={e.qualification}
            className="group relative overflow-hidden rounded-3xl bg-paper p-7 ring-1 ring-line transition hover:ring-lapis/30"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-6 font-display text-[6.5rem] font-extrabold leading-none tracking-tighter text-lapis/[0.07] transition group-hover:text-lapis/[0.12]"
            >
              {e.year}
            </span>
            <p className="font-mono text-sm font-medium text-lapis">{e.year}</p>
            <p className="relative mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink">
              {e.qualification}
            </p>
            <p className="relative mt-1 text-muted">{e.institution}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Certifications & professional development
        </h3>
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
          {resume.certifications.map((c) => (
            <li key={c} className="flex gap-3.5 border-t border-line py-4 leading-relaxed text-ink">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="mt-1 h-5 w-5 shrink-0 rounded-full bg-lapis-soft fill-lapis p-[3px]"
              >
                <path d="M7.6 14.2 3.4 10l1.4-1.4 2.8 2.8 7.6-7.6L16.6 5z" />
              </svg>
              <span>
                <Figures text={c} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="night-grain absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="absolute -top-[30rem] left-1/2 -z-10 h-[44rem] w-[90rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,166,42,0.22),rgba(39,71,184,0.16)_55%,transparent)]"
      />
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-marigold sm:text-sm">
          Available immediately
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          Let&apos;s work together.
        </h2>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80">
          {resume.availabilityDetail}.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${resume.contact.email}`}
            className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-night transition hover:-translate-y-0.5 hover:bg-marigold"
          >
            {resume.contact.email}
          </a>
          <a
            href={`tel:${resume.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
          >
            {resume.contact.phone}
          </a>
          <OpenChatButton className="inline-flex items-center rounded-full px-4 py-3 font-semibold text-marigold underline decoration-marigold/40 underline-offset-4 transition hover:decoration-marigold" />
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60">
          <p>
            © {resume.name} · {resume.location}
          </p>
          <a href="#top" className="hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
