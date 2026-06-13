'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

/** A layer that fades in and back out across a window of scroll progress. */
function Beat({
  progress,
  at,
  children,
  className,
}: {
  progress: MotionValue<number>;
  at: [number, number, number, number];
  children: React.ReactNode;
  className?: string;
}) {
  const opacity = useTransform(progress, at, [0, 1, 1, 0]);
  const y = useTransform(progress, [at[0], at[1]], [40, 0]);
  return (
    <motion.div style={{ opacity, y }} className={`absolute inset-0 flex items-center ${className ?? ''}`}>
      {children}
    </motion.div>
  );
}

/** Background image that crossfades within a progress window, with a slow push-in. */
function Plate({
  progress,
  at,
  src,
  alt,
}: {
  progress: MotionValue<number>;
  at: [number, number, number, number];
  src: string;
  alt: string;
}) {
  const opacity = useTransform(progress, at, [0, 1, 1, 0]);
  const scale = useTransform(progress, [at[0], at[3]], [1.05, 1.2]);
  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      className="cover absolute inset-0"
      style={{ opacity, scale }}
    />
  );
}

export default function Origin() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    // Tall scroll track — the inner stage stays pinned while the story advances.
    <section ref={ref} className="relative h-[320vh] bg-black">
      <div className="sticky h-[100svh] overflow-hidden grain vignette" style={{ top: 0 }}>
        {/* Crossfading plates */}
        <Plate progress={scrollYProgress} at={[0, 0.12, 0.32, 0.45]} src="/media/ship.jpg" alt="A sailing ship — the Vela." />
        <Plate progress={scrollYProgress} at={[0.4, 0.52, 0.72, 0.85]} src="/media/sail.jpg" alt="The sail forming the V monogram." />
        <Plate progress={scrollYProgress} at={[0.8, 0.9, 1, 1]} src="/media/facade-stone.jpg" alt="Stone facade carrying the Velaro mark." />

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/80" />

        {/* Beat 01 — origin */}
        <Beat progress={scrollYProgress} at={[0, 0.08, 0.28, 0.4]} className="justify-center text-center">
          <div className="px-6 max-w-3xl">
            <p className="overline mb-6">From Vela</p>
            <h2 className="display-xl">Inspired by the sail.</h2>
            <p className="lede mt-7 max-w-xl mx-auto">
              <span className="bronze">Vela</span> — the sail that carries movement, tension and protection. The
              origin of a name, and of a philosophy.
            </p>
          </div>
        </Beat>

        {/* Beat 02 — transformation */}
        <Beat progress={scrollYProgress} at={[0.42, 0.52, 0.7, 0.82]} className="justify-start">
          <div className="px-6 md:px-16 max-w-2xl">
            <p className="overline mb-6">Into Velaro</p>
            <h2 className="display-xl">
              The sail becomes
              <br />
              <span className="bronze-bright">the surface.</span>
            </h2>
            <p className="lede mt-7 max-w-lg">
              Its curve resolves into the V monogram, then into a facade system — engineered to protect, define and
              move architecture forward.
            </p>
          </div>
        </Beat>

        {/* Beat 03 — arrival */}
        <Beat progress={scrollYProgress} at={[0.82, 0.92, 1, 1]} className="justify-center text-center">
          <div className="px-6">
            <p className="overline mb-7">Designed to protect · define · move forward</p>
            <h2 className="wordmark" style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)' }}>
              VELARO
            </h2>
          </div>
        </Beat>

        {/* Progress rail */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-px w-40 bg-white/12">
          <motion.div
            className="h-full origin-left bg-[var(--velaro-bronze)]"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}
