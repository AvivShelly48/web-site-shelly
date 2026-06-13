import { ArrowUpRight, Layers, Ruler, Sparkles } from 'lucide-react';

const pillars = [
  { title: 'Design', text: 'Minimal surfaces, architectural proportions and a luxury material language.' },
  { title: 'Engineering', text: 'Advanced production methods, precise detailing and reliable installation systems.' },
  { title: 'Performance', text: 'Built for kitchens, interiors and premium projects that must endure.' },
];

export default function Home() {
  return (
    <main className="brand-shell">
      <section className="min-h-screen px-6 py-8 md:px-14 md:py-12 flex flex-col justify-between">
        <nav className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-[#b49a75]">
          <span>Advanced Surface Systems</span>
          <span className="hidden md:block">Kitchens / Interiors / Cladding</span>
        </nav>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
          <div>
            <p className="velaro-overline mb-8 text-xs md:text-sm">Beyond The Surface</p>
            <h1 className="velaro-logo leading-none">VELARO</h1>
            <p className="mt-8 max-w-xl text-lg md:text-2xl leading-relaxed text-[#cfc6b8]">
              Luxury architectural surfaces for elite kitchens, interiors and engineered cladding systems.
            </p>
          </div>

          <div className="panel p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b49a75] mb-6">Brand Experience</p>
            <p className="text-2xl md:text-4xl leading-tight">Designed to perform. Built to endure.</p>
            <p className="mt-6 text-[#b9b0a4] leading-relaxed">
              A premium digital presence for leading clients, combining material beauty, manufacturing technology and refined project specification.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-14 py-20 grid md:grid-cols-3 gap-4">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="panel p-8 min-h-[260px] flex flex-col justify-between">
            <Layers className="text-[#b49a75]" />
            <div>
              <h2 className="text-2xl mb-4">{pillar.title}</h2>
              <p className="text-[#b9b0a4] leading-relaxed">{pillar.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="px-6 md:px-14 py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="velaro-overline text-xs mb-6">Client Portal App</p>
          <h2 className="text-4xl md:text-6xl leading-tight">A private specification experience for premium clients.</h2>
        </div>
        <div className="panel p-6 md:p-8 rounded-[2rem]">
          <div className="rounded-[1.5rem] border border-[#b49a75]/20 p-6 bg-black/30">
            <div className="flex justify-between items-center text-xs uppercase tracking-[0.24em] text-[#b49a75] mb-10">
              <span>VELARO App</span><Sparkles size={16} />
            </div>
            <div className="space-y-4">
              <div className="panel p-4 flex items-center gap-4"><Ruler /> Material Library</div>
              <div className="panel p-4 flex items-center gap-4"><Layers /> Project Moodboards</div>
              <div className="panel p-4 flex items-center gap-4"><ArrowUpRight /> Specification Meeting</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
