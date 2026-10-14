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
    <header className="sticky top-0 z-30 border-b border-white/10 bg-night/85 text-white backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-marigold focus:px-3 focus:py-2 focus:text-night"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-white hover:text-marigold"
        >
          {resume.name}
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.95rem]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`mailto:${resume.contact.email}`}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-night transition-colors hover:bg-marigold"
        >
          Get in touch
        </a>
      </div>
      <nav aria-label="Sections" className="border-t border-white/10 lg:hidden">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-1.5 text-[0.95rem] [scrollbar-width:none] sm:px-6">
          {navItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="block rounded-full px-3 py-1.5 text-white/75 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
