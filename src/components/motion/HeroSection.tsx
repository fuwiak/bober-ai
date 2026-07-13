"use client";

import Image from "next/image";
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
  const stagger = prefersReducedMotion ? 0 : 0.05;

  return (
    <section className="hero-section section-band">
      <div className="container-editorial">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger } },
          }}
        >
          <motion.p
            className="hero-label"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            className="hero-title mt-8"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </motion.h1>

          <motion.p
            className="hero-lead"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            {valueProposition}
          </motion.p>

          <motion.p
            className="hero-spec"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            {specialization}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            <a href="#contact" className="btn-primary">
              {ctaPrimary}
            </a>
            <a href="#portfolio" className="btn-secondary">
              {ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        <motion.figure
          className="hero-media"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={avatar}
              alt={avatarAlt}
              fill
              sizes="100vw"
              className="object-cover object-top"
              priority
            />
          </div>
          <figcaption>
            {portraitName} · {portraitRole} · {onlineLabel} · {trustItems.join(" · ")}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
