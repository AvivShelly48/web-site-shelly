'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise into view once, with optional stagger delay. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span' | 'li' | 'p' | 'h2' | 'h3';
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const wordChild: Variants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
  show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
};

/** Headline that resolves word-by-word with a soft blur — a filmic title card. */
export function SplitWords({
  text,
  className,
  once = true,
}: {
  text: string;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block' }}
      variants={wordParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px' }}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span variants={wordChild} style={{ display: 'inline-block', paddingRight: '0.26em' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Image that drifts and scales as the section scrolls past — quiet parallax. */
export function ParallaxMedia({
  src,
  alt,
  className,
  range = 14,
  zoom = true,
}: {
  src: string;
  alt: string;
  className?: string;
  range?: number;
  zoom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.14, 1.08]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="cover absolute inset-0"
        style={{ y, scale: zoom ? scale : 1, height: '128%', top: '-14%' }}
      />
    </div>
  );
}

/** Small section eyebrow with a drawn bronze rule. */
export function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <Reveal className="flex items-center gap-4">
      {index && <span className="overline bronze-bright">{index}</span>}
      <span className="h-px w-10 bg-[var(--velaro-bronze-deep)]" />
      <span className="overline">{children}</span>
    </Reveal>
  );
}
