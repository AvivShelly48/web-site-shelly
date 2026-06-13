'use client';

import { Reveal, SplitWords, SectionLabel } from './ui';

const pillars = [
  { k: 'Design', t: 'Minimal surfaces, architectural proportion and a luxury material language.' },
  { k: 'Engineering', t: 'Advanced production, precise detailing and reliable installation systems.' },
  { k: 'Performance', t: 'Built for kitchens, interiors and premium projects that must endure.' },
];

export default function Manifesto() {
  return (
    <section className="relative px-6 md:px-12 py-28 md:py-44 bg-black grain">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>The Philosophy</SectionLabel>

        <h2 className="display-xl mt-10 max-w-5xl" style={{ fontSize: 'clamp(2rem, 4.6vw, 4.4rem)' }}>
          <SplitWords text="Designed to perform." />
          <br />
          <span className="bronze">
            <SplitWords text="Built to endure." />
          </span>
        </h2>

        <Reveal delay={0.2} className="mt-10 max-w-2xl">
          <p className="lede">
            VELARO is a premium architectural surface brand — combining material beauty, manufacturing technology and
            refined specification for leading clients, architects and developers.
          </p>
        </Reveal>

        <div className="mt-20 md:mt-28 grid gap-px md:grid-cols-3 bg-[var(--velaro-line)] border border-[var(--velaro-line)]">
          {pillars.map((p, i) => (
            <Reveal
              key={p.k}
              delay={i * 0.1}
              className="bg-black px-8 py-12 md:py-16 min-h-[260px] flex flex-col justify-between transition-colors duration-700 hover:bg-[#0d0c0a]"
            >
              <span className="overline bronze-bright">0{i + 1}</span>
              <div>
                <h3 className="display-lg" style={{ fontSize: 'clamp(1.7rem, 2.6vw, 2.6rem)' }}>
                  {p.k}
                </h3>
                <p className="mt-4 text-[#a99e8c] leading-relaxed font-light">{p.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
