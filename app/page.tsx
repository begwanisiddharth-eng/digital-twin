import { ChatWidget } from "@/components/chat-widget";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { resume } from "@/lib/resume-data";

function About() {
  return (
    <Section id="about" eyebrow="About me" title="Professional summary">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <p className="text-lg leading-8 text-ink sm:text-xl sm:leading-9">
          {resume.summary}
        </p>
        <aside className="rounded-2xl border border-line bg-surface p-6">
          <h3 className="font-semibold text-ink">At a glance</h3>
          <dl className="mt-4 space-y-4 text-[0.98rem]">
            <div>
              <dt className="text-muted">Current focus</dt>
              <dd className="font-medium text-ink">
                CRM / CX transformation, program governance, AI/ML strategy
              </dd>
            </div>
            <div>
              <dt className="text-muted">Most recent role</dt>
              <dd className="font-medium text-ink">
                {resume.experience[0].roles[0].title},{" "}
                {resume.experience[0].company}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Client geographies</dt>
              <dd className="font-medium text-ink">
                US, Europe, Japan, Australia
              </dd>
            </div>
            <div>
              <dt className="text-muted">Availability</dt>
              <dd className="font-medium text-ink">
                {resume.availabilityDetail}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}

function Highlights() {
  return (
    <Section
      id="highlights"
      eyebrow="Highlights of work done"
      title="Impact beyond delivery"
      tone="tinted"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {resume.highlights.map((group) => (
          <article
            key={group.title}
            className="rounded-2xl border border-line bg-background p-6 sm:p-8"
          >
            <h3 className="font-serif text-2xl font-semibold text-ink">
              {group.title}
            </h3>
            <ul className="mt-5 space-y-4">
              {group.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-gold"
                  />
                  <span className="text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Key projects executed"
      title="Key client engagements"
      intro="Delivered remotely from India for global enterprise clients."
    >
      <ol className="grid gap-6 md:grid-cols-2">
        {resume.projects.map((p) => (
          <li
            key={p.client}
            className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md sm:p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-2xl font-semibold text-ink">
                {p.client}
              </h3>
              <span className="text-sm font-medium text-muted">
                {p.location} · {p.years}
              </span>
            </div>
            <p className="mt-1 font-semibold text-accent">{p.title}</p>
            <p className="mt-3 flex-1 text-ink">{p.description}</p>
            <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-[0.95rem] sm:grid-cols-2">
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="font-medium text-ink">{p.role}</dd>
              </div>
              <div>
                <dt className="text-muted">Value</dt>
                <dd className="font-medium text-ink">{p.value}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Professional experience"
      title="Career journey"
      tone="tinted"
    >
      <ol className="relative space-y-10 border-l-2 border-line pl-6 sm:pl-10">
        {resume.experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.05rem] top-2 h-4 w-4 rounded-full border-4 border-surface bg-accent sm:-left-[3.05rem]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-serif text-2xl font-semibold text-ink">
                {job.company}
              </h3>
              <span className="font-medium text-muted">{job.period}</span>
            </div>
            {job.note && <p className="text-muted italic">{job.note}</p>}

            {job.progression && (
              <div className="mt-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Career progression
                </p>
                <ol className="mt-2 flex flex-wrap items-center gap-2">
                  {job.progression.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="rounded-md bg-accent-soft px-3 py-1 text-[0.95rem] font-medium text-accent-dark">
                        {step}
                      </span>
                      {i < job.progression!.length - 1 && (
                        <span aria-hidden className="text-muted">
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {job.roles.map((role) => (
              <div key={role.title} className="mt-5 max-w-3xl">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h4 className="text-lg font-semibold text-ink">
                    {role.title}
                  </h4>
                  {role.period !== job.period && (
                    <span className="text-[0.95rem] text-muted">
                      {role.period}
                    </span>
                  )}
                </div>
                {role.summary && <p className="mt-2 text-ink">{role.summary}</p>}
                {role.bullets && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-ink marker:text-gold">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {job.progression && (
              <p className="mt-4 max-w-3xl text-[0.98rem] text-muted">
                Key client engagements from this period are detailed in{" "}
                <a
                  href="#projects"
                  className="font-medium text-accent underline underline-offset-4"
                >
                  Key projects
                </a>
                .
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skillsets" title="Competencies & technical skills">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-ink">
            Core competencies
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {resume.coreCompetencies.map((c) => (
              <li
                key={c}
                className="rounded-full border border-accent/25 bg-accent-soft px-4 py-2 text-[0.98rem] font-medium text-accent-dark"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-2xl font-semibold text-ink">
            Technical skills
          </h3>
          <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
            {resume.technicalSkills.map((s) => (
              <div
                key={s.category}
                className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="font-semibold text-ink">{s.category}</dt>
                <dd className="text-ink">{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

function EducationSection() {
  return (
    <Section
      id="education"
      eyebrow="Education & certifications"
      title="Learning that never stopped"
      tone="tinted"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-ink">
            Education
          </h3>
          <ul className="mt-5 space-y-4">
            {resume.education.map((e) => (
              <li
                key={e.qualification}
                className="flex gap-4 rounded-2xl border border-line bg-background p-5"
              >
                <span className="font-serif text-xl font-semibold text-gold">
                  {e.year}
                </span>
                <div>
                  <p className="font-semibold text-ink">{e.qualification}</p>
                  <p className="text-muted">{e.institution}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.98rem] text-muted">{resume.educationNote}</p>
        </div>
        <div>
          <h3 className="font-serif text-2xl font-semibold text-ink">
            Certifications & professional development
          </h3>
          <ul className="mt-5 space-y-3">
            {resume.certifications.map((c) => (
              <li key={c} className="flex gap-3">
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  className="mt-1.5 h-4 w-4 shrink-0 fill-accent"
                >
                  <path d="M7.6 14.2 3.4 10l1.4-1.4 2.8 2.8 7.6-7.6L16.6 5z" />
                </svg>
                <span className="text-ink">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-accent-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="font-serif text-3xl font-semibold">
          Let&apos;s work together
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-white/85">
          {resume.availabilityDetail}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${resume.contact.email}`}
            className="rounded-full bg-white px-5 py-2.5 font-semibold text-accent-dark hover:bg-[#f1d9a6]"
          >
            {resume.contact.email}
          </a>
          <a
            href={`tel:${resume.contact.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10"
          >
            {resume.contact.phone}
          </a>
        </div>
        <p className="mt-10 text-sm text-white/60">
          © {resume.name} · {resume.location}
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Highlights />
        <Projects />
        <Experience />
        <Skills />
        <EducationSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
