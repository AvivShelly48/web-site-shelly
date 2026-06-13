import { ArrowUpRight, Film, Layers, Play, Ruler, Sparkles } from 'lucide-react';

const pillars = [
  { title: 'Design', text: 'Minimal surfaces, architectural proportions and a luxury material language.' },
  { title: 'Engineering', text: 'Advanced production methods, precise detailing and reliable installation systems.' },
  { title: 'Performance', text: 'Built for kitchens, interiors and premium projects that must endure.' },
];

const videos = [
  { title: 'Beyond The Surface', text: 'A cinematic reveal of bronze identity, dark stone surfaces and architectural skins.' },
  { title: 'Designed To Perform', text: 'Engineering details, hidden systems, CNC precision and advanced production close-ups.' },
  { title: 'Architecture Forward', text: 'From sail movement to facade protection, transforming the VELA idea into VELARO.' },
];

const materials = [
  'Charcoal Porcelain',
  'Bronze Metal',
  'Warm Travertine',
  'Textured Graphite',
  'Luxury Kitchen Fronts',
  'Engineered Facade Panels',
];

const technologies = [
  'Dry-hang systems',
  'Hidden fixing details',
  'Precision edge finishing',
  'Custom project specification',
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

      <section className="px-6 md:px-14 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <div>
            <p className="velaro-overline text-xs mb-5">Brand Films</p>
            <h2 className="text-4xl md:text-6xl leading-tight max-w-4xl">Cinematic stories for a surface brand built on movement, protection and precision.</h2>
          </div>
          <Film className="text-[#b49a75]" size={42} />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <article key={video.title} className="panel min-h-[360px] p-7 flex flex-col justify-between group">
              <div className="aspect-video border border-[#b49a75]/20 bg-gradient-to-br from-[#171717] to-[#050505] flex items-center justify-center mb-8">
                <div className="h-16 w-16 rounded-full border border-[#b49a75]/50 flex items-center justify-center"><Play className="text-[#b49a75]" /></div>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#b49a75] mb-3">Film 0{index + 1}</p>
                <h3 className="text-2xl mb-4">{video.title}</h3>
                <p className="text-[#b9b0a4] leading-relaxed">{video.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-14 py-20 grid md:grid-cols-[0.8fr_1.2fr] gap-8">
        <div>
          <p className="velaro-overline text-xs mb-6">Material Gallery</p>
          <h2 className="text-4xl md:text-6xl leading-tight">A curated library of premium surfaces.</h2>
          <p className="mt-6 text-[#b9b0a4] leading-relaxed max-w-md">Dark stone, warm natural tones, bronze detailing and engineered panels for elite kitchens, interiors and facades.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {materials.map((material, index) => (
            <div key={material} className="panel min-h-[190px] p-4 flex flex-col justify-between">
              <div className="h-20 bg-gradient-to-br from-[#2a2927] via-[#111] to-[#6f6250] border border-white/5" />
              <div>
                <p className="text-xs text-[#b49a75] tracking-[0.25em] uppercase">0{index + 1}</p>
                <p className="mt-2 text-sm md:text-base">{material}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-14 py-20">
        <div className="panel p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="velaro-overline text-xs mb-6">Technology Gallery</p>
            <h2 className="text-4xl md:text-6xl leading-tight">Engineering hidden behind quiet luxury.</h2>
          </div>
          <div className="grid gap-3">
            {technologies.map((item) => (
              <div key={item} className="border border-[#b49a75]/20 p-5 text-[#d8d0c4] flex justify-between items-center">
                <span>{item}</span>
                <ArrowUpRight size={18} className="text-[#b49a75]" />
              </div>
            ))}
          </div>
        </div>
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
