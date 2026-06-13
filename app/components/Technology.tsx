'use client';

import { ArrowUpRight } from 'lucide-react';
import { Reveal, ParallaxMedia, SectionLabel } from './ui';

const tech = [
  { t: 'Dry-hang systems', d: 'Concealed structural support for seamless facade planes.' },
  { t: 'Hidden fixing details', d: 'No visible hardware — quiet, uninterrupted surfaces.' },
  { t: 'Precision edge finishing', d: 'CNC-cut profiles and mitred corners to the millimetre.' },
  { t: 'Custom specification', d: 'Engineered per project, per architect, per client.' },
];

export default function Technology() {
  return (
    <section id="technology" className="relative px-6 md:px-12 py-28 md:py-40 bg-black grain">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
        <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
          <ParallaxMedia
            src="/media/technology.jpg"
            alt="Precision hardware on engineered marble"
            className="aspect-[3/4] border border-[var(--velaro-line)] mt-10"
          />
          <ParallaxMedia
            src="/media/engineering.jpg"
            alt="Architectural detailing behind the Velaro mark"
            className="aspect-[3/4] border border-[var(--velaro-line)]"
            range={20}
          />
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel index="04">Technology</SectionLabel>
          <Reveal delay={0.06} className="mt-8">
            <h2 className="display-xl">
              Engineering hidden behind <span className="bronze">quiet luxury</span>.
            </h2>
          </Reveal>

          <div className="mt-12 divide-y divide-[var(--velaro-line)] border-y border-[var(--velaro-line)]">
            {tech.map((item, i) => (
              <Reveal
                key={item.t}
                delay={i * 0.08}
                className="group flex items-center justify-between gap-6 py-6 cursor-default"
              >
                <div>
                  <p className="text-lg md:text-xl font-light">{item.t}</p>
                  <p className="mt-1 text-sm text-[#9a8f7d] font-light">{item.d}</p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="bronze shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
