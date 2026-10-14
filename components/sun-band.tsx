"use client";

import { useSyncExternalStore } from "react";

type Zone = {
  label: string;
  tz: string;
  clients: string;
  home?: boolean;
};

// Client regions from the Key Client Engagements, ordered west → east.
const ZONES: Zone[] = [
  { label: "USA", tz: "America/New_York", clients: "BNY Mellon · Riverside" },
  { label: "Belgium", tz: "Europe/Brussels", clients: "Luminus" },
  {
    label: "Kolkata",
    tz: "Asia/Kolkata",
    clients: "Home base · Reliance JIO",
    home: true,
  },
  { label: "Japan", tz: "Asia/Tokyo", clients: "Zurich Insurance" },
  { label: "Australia", tz: "Australia/Sydney", clients: "IDP Education" },
];

// Re-render every 30s; the server snapshot is null so SSR shows placeholders.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}
const getSnapshot = () => Math.floor(Date.now() / 30_000);
const getServerSnapshot = () => null;

function localTime(tz: string, tick: number) {
  const date = new Date(tick * 30_000);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  const hour = Number(time.slice(0, 2));
  return { time, daylight: hour >= 6 && hour < 18 };
}

export function SunBand() {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-sky">
        Delivered remotely across time zones, from Kolkata
      </p>
      <ol className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
        {/* The horizon line that joins every zone on wide screens */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[1.05rem] hidden h-px bg-gradient-to-r from-sky/10 via-marigold/70 to-sky/10 lg:block"
        />
        {ZONES.map((z) => {
          const now = tick === null ? null : localTime(z.tz, tick);
          return (
            <li
              key={z.tz}
              className={`relative rounded-xl border p-4 lg:rounded-none lg:border-0 lg:px-4 lg:py-0 ${
                z.home
                  ? "border-marigold/40 bg-marigold/10 lg:bg-transparent"
                  : "border-white/10 bg-white/[0.03] lg:bg-transparent"
              }`}
            >
              <span
                aria-hidden
                className={`relative z-10 mb-3 block h-3 w-3 rounded-full ring-4 ring-night lg:mt-3 ${
                  now?.daylight
                    ? "pulse-sun bg-marigold shadow-[0_0_18px_4px_rgba(244,166,42,0.55)]"
                    : "bg-sky shadow-[0_0_14px_2px_rgba(156,193,255,0.35)]"
                }`}
              />
              <p className="text-sm font-semibold text-white">
                {z.label}
                {z.home && (
                  <span className="ml-2 rounded-full bg-marigold px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-night">
                    Base
                  </span>
                )}
              </p>
              <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">
                <time suppressHydrationWarning>{now?.time ?? "--:--"}</time>
              </p>
              <p className="mt-1 text-sm leading-snug text-white/70">
                {z.clients}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
