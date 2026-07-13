"use client";

import Image from "next/image";
import { ContactCta } from "@/components/ContactCta";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { ProfessionalProfileLinks } from "@/components/ProfessionalProfileLinks";
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
  heroImage: string;
  heroImageAlt: string;
  founderName: string;
  founderRole: string;
  linkedinLabel: string;
  githubLabel: string;
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
  heroImage,
  heroImageAlt,
  founderName,
  founderRole,
  linkedinLabel,
  githubLabel,
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
            <ContactCta>{ctaPrimary}</ContactCta>
            <a href="#portfolio" className="btn-secondary">
              {ctaSecondary}
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            <ProfessionalProfileLinks
              founderName={founderName}
              founderRole={founderRole}
              linkedinLabel={linkedinLabel}
              githubLabel={githubLabel}
              className="mt-10"
            />
          </motion.div>
        </motion.div>

        <motion.figure
          className="hero-media"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <EditorialImageFrame variant="hero" className="hero-media__frame">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              sizes="100vw"
              className="hero-media__image"
              priority
            />
          </EditorialImageFrame>
          <figcaption className="sr-only">
            {portraitName} · {portraitRole} · {onlineLabel} · {trustItems.join(" · ")}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
