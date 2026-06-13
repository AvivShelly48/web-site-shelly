'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // The whole scene recedes as you scroll away — like a camera pulling back.
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden grain vignette">
      {/* Brand film, slowly drifting */}
      <motion.div className="absolute inset-0" style={{ scale: mediaScale, y: mediaY }}>
        <video
          className="cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/facade-dark.jpg"
        >
          <source src="/media/velaro-film-01.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic grade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />

      {/* Top bar */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <span className="overline bronze-bright">Velaro</span>
        <span className="overline hidden md:block">Advanced Surface Systems</span>
        <a href="#contact" className="overline transition-colors hover:text-[var(--velaro-bronze-bright)]">
          Enquire
        </a>
      </motion.nav>

      {/* Centerpiece */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.9em' }}
          animate={{ opacity: 1, letterSpacing: '0.42em' }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
          className="overline mb-7"
        >
          Beyond The Surface
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 1.12, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.9, ease: EASE, delay: 0.7 }}
          className="wordmark leading-none"
          style={{ fontSize: 'clamp(3.2rem, 13vw, 12rem)' }}
        >
          VELARO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 1.3 }}
          className="lede mt-8 max-w-xl"
        >
          Luxury architectural surfaces for elite kitchens, interiors and engineered facade systems.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 inset-x-0 z-10 flex flex-col items-center gap-3"
      >
        <span className="overline text-[0.6rem]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-[var(--velaro-bronze)]"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
