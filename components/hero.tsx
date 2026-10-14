import type { CSSProperties } from "react";
import { OpenChatButton } from "@/components/open-chat-button";
import { SunBand } from "@/components/sun-band";
import { resume } from "@/lib/resume-data";

export function Hero() {
  const [experience, ...areas] = resume.headline.split("|").map((s) => s.trim());
  const [first, ...rest] = resume.name.split(" ");

  return (
    <div id="top" className="relative isolate overflow-hidden bg-night text-white">
      {/* Atmosphere: star grain + a marigold dawn rising from the horizon */}
      <div aria-hidden className="night-grain absolute inset-0 -z-10 opacity-80" />
      <div
        aria-hidden
        className="dawn absolute -bottom-[38rem] left-1/2 -z-10 h-[56rem] w-[110rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,166,42,0.30),rgba(39,71,184,0.18)_55%,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:pb-16 lg:pt-24">
        <p style={{ "--i": 0 } as CSSProperties} className="rise font-mono text-xs uppercase tracking-[0.22em] text-marigold sm:text-sm">
          {resume.location} · {resume.availability}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <h1 style={{ "--i": 1 } as CSSProperties} className="rise font-display text-[clamp(3.4rem,10vw,7.75rem)] font-extrabold leading-[0.9] tracking-[-0.035em]">
            {first}
            <br />
            <span className="bg-gradient-to-r from-white via-[#ffe2b0] to-marigold bg-clip-text text-transparent">
              {rest.join(" ")}
            </span>
          </h1>

          <div style={{ "--i": 3 } as CSSProperties} className="rise lg:pb-3">
            <p className="font-display text-2xl font-semibold text-white">
              {experience}
            </p>
            <ul className="mt-3 space-y-1.5" aria-label="Focus areas">
              {areas.map((area) => (
                <li key={area} className="flex items-center gap-3 text-lg text-white/90">
                  <span aria-hidden className="h-px w-6 bg-marigold" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p style={{ "--i": 4 } as CSSProperties} className="rise mt-10 max-w-2xl text-xl leading-relaxed text-white/85 sm:text-[1.35rem]">
          {resume.tagline}
        </p>

        <div style={{ "--i": 5 } as CSSProperties} className="rise mt-8 flex flex-wrap gap-3">
          <OpenChatButton className="group inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 font-semibold text-night shadow-[0_8px_30px_-6px_rgba(244,166,42,0.6)] transition hover:-translate-y-0.5 hover:bg-[#ffb94a]" />
          <a
            href={`mailto:${resume.contact.email}`}
            className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
          >
            {resume.contact.email}
          </a>
          <a
            href={`tel:${resume.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center rounded-full px-4 py-3 font-semibold text-white/85 underline-offset-4 transition hover:text-white hover:underline"
          >
            {resume.contact.phone}
          </a>
        </div>

        <div style={{ "--i": 7 } as CSSProperties} className="rise mt-16 border-t border-white/10 pt-8">
          <SunBand />
        </div>

        <dl style={{ "--i": 8 } as CSSProperties} className="rise mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 lg:grid-cols-4">
          {resume.keyStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[0.95rem] text-white/70">{stat.label}</dt>
              <dd className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
