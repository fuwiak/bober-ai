"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { revealTransition } from "@/lib/motion";

type HeroSectionProps = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  valueProposition: string;
  specialization: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustItems: string[];
  portraitName: string;
  portraitRole: string;
  onlineLabel: string;
  avatar: string;
  avatarAlt: string;
};

export function HeroSection({
  eyebrow,
  titleLine1,
  titleLine2,
  valueProposition,
  specialization,
  ctaPrimary,
  ctaSecondary,
  trustItems,
  portraitName,
  portraitRole,
  onlineLabel,
  avatar,
  avatarAlt,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : revealTransition;
  const stagger = prefersReducedMotion ? 0 : 0.09;

  const blocks = [
    <p key="eyebrow" className="section-label">
      {eyebrow}
    </p>,
    <h1 key="title" className="hero-title mt-5">
      <span className="block">{titleLine1}</span>
      <span className="block text-accent-primary-light">{titleLine2}</span>
    </h1>,
    <p key="value" className="mt-6 max-w-xl text-base leading-relaxed text-body md:text-lg">
      {valueProposition}
    </p>,
    <p key="spec" className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-muted md:text-sm">
      {specialization}
    </p>,
    <div key="cta" className="mt-8 flex flex-wrap gap-3">
      <a href="#contact" className="btn-primary">
        {ctaPrimary}
        <ArrowRight className="button-arrow h-4 w-4" aria-hidden />
      </a>
      <a href="#portfolio" className="btn-secondary">
        {ctaSecondary}
      </a>
    </div>,
    <div key="trust" className="hero-trust-strip">
      {trustItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>,
  ];

  return (
    <section className="hero-section section-band">
      <div className="container-editorial relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger } },
          }}
        >
          {blocks.map((node, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
              transition={{ ...transition, delay: index * stagger }}
            >
              {node}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.45 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="hero-portrait light-sweep w-full max-w-sm">
            <div className="relative aspect-[4/5] w-full">
              <Image src={avatar} alt={avatarAlt} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/80 via-transparent to-transparent" />
            </div>
            <div className="border-t border-hairline px-5 py-4">
              <p className="font-display text-lg tracking-tight text-ink">{portraitName}</p>
              <p className="mt-1 text-sm text-muted">{portraitRole}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em]">
                <span className="status-online">● {onlineLabel}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
