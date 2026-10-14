import { ChatWidget } from "@/components/chat-widget";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { About, Experience, Highlights, Projects } from "@/components/sections-main";
import { SiteHeader } from "@/components/site-header";
import { resume } from "@/lib/resume-data";

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
      tone="surface"
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
