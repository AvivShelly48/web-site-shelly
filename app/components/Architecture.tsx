'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, SectionLabel } from './ui';

const projects = ['Private Villas', 'Premium Kitchens', 'Boutique Commercial', 'Architectural Facades'];

export default function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} id="architecture" className="relative h-[120vh] md:h-[140vh] overflow-hidden bg-black">
      {/* Architectural brand film, scaling down as the section rises into view */}
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <video className="cover" autoPlay muted loop playsInline poster="/media/villa.jpg">
          <source src="/media/velaro-film-02.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
      <div className="absolute inset-0 grain vignette" />

      <div className="sticky h-[100svh] flex items-center" style={{ top: 0 }}>
        <div className="mx-auto max-w-7xl w-full px-6 md:px-12">
          <SectionLabel index="03">Architecture</SectionLabel>
          <Reveal delay={0.08} className="mt-8">
            <h2 className="display-xl max-w-4xl">
              Surfaces that become
              <br />
              <span className="bronze-bright">protective architectural skins.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16} className="mt-12 max-w-3xl">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--velaro-line)] border border-[var(--velaro-line)]">
              {projects.map((p) => (
                <li
                  key={p}
                  className="bg-black/50 backdrop-blur-sm px-5 py-7 text-sm md:text-base font-light tracking-wide transition-colors duration-500 hover:bg-black/80"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
