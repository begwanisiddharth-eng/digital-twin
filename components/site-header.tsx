import { resume } from "@/lib/resume-data";

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-background/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-accent-dark focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-serif text-lg font-semibold text-ink hover:text-accent"
        >
          {resume.name}
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.95rem]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent-dark"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`mailto:${resume.contact.email}`}
          className="rounded-full bg-accent-dark px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
