'use client';

import { Reveal, SectionLabel } from './ui';

const boards = [
  { src: '/media/brand-board-01.jpg', label: 'Identity System' },
  { src: '/media/brand-board-02.jpg', label: 'From Vela — Monogram Studies' },
];

export default function BrandSystem() {
  return (
    <section id="brand" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <SectionLabel index="05">The Brand</SectionLabel>
          <Reveal delay={0.05} className="mt-7">
            <h2 className="display-xl">
              An identity drawn from <span className="bronze">the sail</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="lede">
              A bronze monogram, a refined wordmark and a disciplined material palette — the VELARO system applied
              across surface, signage and screen.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {boards.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.1} className="group relative overflow-hidden border border-[var(--velaro-line)]">
              <img
                src={b.src}
                alt={b.label}
                loading="lazy"
                className="cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="absolute bottom-5 left-6 overline opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                {b.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
