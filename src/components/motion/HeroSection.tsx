"use client";

import Image from "next/image";
import { ContactCta } from "@/components/ContactCta";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { motion, useReducedMotion } from "motion/react";
import { revealTransition } from "@/lib/motion";

type HeroSectionProps = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  valueProposition: string;
  differentiator: string;
  benefits: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  trustItems: string[];
  heroImage: string;
  heroImageAlt: string;
};

export function HeroSection({
  eyebrow,
  titleLine1,
  titleLine2,
  valueProposition,
  differentiator,
  benefits,
  ctaPrimary,
  ctaSecondary,
  trustItems,
  heroImage,
  heroImageAlt,
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
            className="hero-differentiator"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            {differentiator}
          </motion.p>

          <motion.ul
            className="hero-benefits mt-6 space-y-2"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            {benefits.map((item) => (
              <li key={item} className="body-copy flex gap-3 text-base">
                <span className="meta-label shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

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
              unoptimized={heroImage.endsWith(".svg")}
            />
          </EditorialImageFrame>
          <figcaption className="sr-only">
            {heroImageAlt} · {trustItems.join(" · ")}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
