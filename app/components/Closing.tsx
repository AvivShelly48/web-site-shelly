'use client';

import { Layers, Ruler, ArrowUpRight, Sparkles } from 'lucide-react';
import { Reveal, SectionLabel } from './ui';

function AppExperience() {
  const rows = [
    { icon: Ruler, label: 'Material Library' },
    { icon: Layers, label: 'Project Moodboards' },
    { icon: ArrowUpRight, label: 'Specification Meeting' },
  ];
  return (
    <section id="app" className="relative px-6 md:px-12 py-28 md:py-40 bg-black grain">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionLabel index="06">Client Portal</SectionLabel>
          <Reveal delay={0.06} className="mt-8">
            <h2 className="display-xl">
              A private specification experience for <span className="bronze">premium clients</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mt-6">
            <p className="lede max-w-md">
              Curate materials, build moodboards and step into a guided specification meeting — all within the VELARO
              app.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="panel rounded-[2rem] p-6 md:p-8">
          <div className="rounded-[1.4rem] border border-[var(--velaro-line)] bg-black/40 p-6">
            <div className="mb-10 flex items-center justify-between">
              <span className="overline bronze-bright">Velaro App</span>
              <Sparkles size={16} className="bronze" />
            </div>
            <div className="space-y-3">
              {rows.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 panel rounded-xl px-5 py-4 transition-colors duration-500 hover:bg-white/[0.06]"
                >
                  <Icon size={18} className="bronze" />
                  <span className="font-light tracking-wide">{label}</span>
                  <ArrowUpRight size={16} className="ml-auto text-[#6f6555]" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[var(--velaro-line)] grain">
      <div className="absolute inset-0 opacity-30">
        <img src="/media/wordmark.jpg" alt="" className="cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-28 md:py-40 text-center">
        <Reveal>
          <p className="overline mb-8">Begin a project</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display-xl" style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)' }}>
            Move your architecture
            <br />
            <span className="bronze">beyond the surface.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-12 flex justify-center">
          <a
            href="mailto:studio@velaro.example"
            className="group inline-flex items-center gap-3 border border-[var(--velaro-bronze)]/50 px-9 py-4 transition-colors duration-500 hover:bg-[var(--velaro-bronze)] hover:text-black"
          >
            <span className="overline group-hover:text-black">Enquire with the studio</span>
            <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[var(--velaro-line)] pt-8">
          <span className="wordmark text-2xl">VELARO</span>
          <p className="overline text-[0.6rem]">Advanced Surface Systems · Kitchens / Interiors / Cladding</p>
          <p className="overline text-[0.6rem]">© {new Date().getFullYear()} Velaro</p>
        </div>
      </div>
    </footer>
  );
}

export default function Closing() {
  return (
    <>
      <AppExperience />
      <Footer />
    </>
  );
}
