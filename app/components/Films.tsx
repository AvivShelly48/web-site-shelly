'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { Reveal, SectionLabel } from './ui';

const films = [
  {
    no: '01',
    src: '/media/velaro-film-01.mp4',
    poster: '/media/facade-dark.jpg',
    title: 'Beyond The Surface',
    text: 'A cinematic reveal — bronze identity, dark stone and architectural skins.',
  },
  {
    no: '02',
    src: '/media/velaro-film-02.mp4',
    poster: '/media/villa.jpg',
    title: 'The Facade That Moves Architecture Forward',
    text: 'From sail to facade. Villas, precision details and engineered beauty.',
  },
];

function FilmPlayer({ film }: { film: (typeof films)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <Reveal className="group relative">
      <button
        onClick={toggle}
        className="relative block w-full overflow-hidden aspect-video border border-[var(--velaro-line)] bg-black"
        aria-label={`${playing ? 'Pause' : 'Play'} film: ${film.title}`}
      >
        <video
          ref={videoRef}
          className="cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
          poster={film.poster}
          loop
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        >
          <source src={film.src} type="video/mp4" />
        </video>

        <div
          className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-t from-black/80 via-black/10 to-black/30 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Play / pause control */}
        <span
          className={`absolute left-6 bottom-6 flex items-center gap-3 transition-opacity duration-500 ${
            playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--velaro-bronze)]/60 bg-black/40 backdrop-blur-sm transition-colors group-hover:border-[var(--velaro-bronze-bright)]">
            {playing ? (
              <Pause size={18} className="bronze-bright" />
            ) : (
              <Play size={18} className="bronze-bright translate-x-[1px]" />
            )}
          </span>
          <span className="overline text-[0.6rem]">Film {film.no}</span>
        </span>
      </button>

      <div className="mt-6 flex items-start justify-between gap-6">
        <h3 className="display-lg max-w-md" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)' }}>
          {film.title}
        </h3>
        <p className="lede max-w-xs text-right hidden md:block" style={{ fontSize: '0.98rem' }}>
          {film.text}
        </p>
      </div>
    </Reveal>
  );
}

export default function Films() {
  return (
    <section id="films" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <SectionLabel index="01">Brand Films</SectionLabel>
            <Reveal delay={0.05} className="mt-7">
              <h2 className="display-xl max-w-3xl">
                Stories told in <span className="bronze">motion</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede max-w-sm">
              Built on movement, protection and precision — press play for sound.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-14 md:gap-10 md:grid-cols-2">
          {films.map((film) => (
            <FilmPlayer key={film.no} film={film} />
          ))}
        </div>
      </div>
    </section>
  );
}
