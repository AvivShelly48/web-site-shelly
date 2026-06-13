'use client';

import { Reveal, ParallaxMedia, SectionLabel } from './ui';

const materials = [
  { name: 'Charcoal Porcelain', src: '/media/facade-dark.jpg', span: 'md:col-span-2' },
  { name: 'Warm Travertine', src: '/media/facade-stone.jpg', span: '' },
  { name: 'Engineered Marble', src: '/media/materials.jpg', span: '' },
  { name: 'Dry-Hang Facade', src: '/media/engineering.jpg', span: '' },
  { name: 'Architectural Skin', src: '/media/villa.jpg', span: 'md:col-span-2' },
];

export default function Materials() {
  return (
    <section id="materials" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <SectionLabel index="02">Material Library</SectionLabel>
            <Reveal delay={0.05} className="mt-7">
              <h2 className="display-xl max-w-2xl">
                A curated library of <span className="bronze">premium surfaces</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede max-w-sm">
              Dark stone, warm natural tones, bronze detailing and engineered panels for elite interiors and facades.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {materials.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06} className={`group relative ${m.span}`}>
              <ParallaxMedia
                src={m.src}
                alt={m.name}
                className="aspect-[16/10] md:aspect-[16/9] border border-[var(--velaro-line)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5">
                <span className="font-display text-xl md:text-2xl tracking-wide">{m.name}</span>
                <span className="overline text-[0.6rem]">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
