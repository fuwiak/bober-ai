"use client";

import Image from "next/image";
import { ContactCta } from "@/components/ContactCta";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";
import { heroTitleTransition, revealTransition } from "@/lib/motion";

type HeroSectionProps = {
  eyebrow: string;
  titleLine1: string;
  titleLine2?: string;
  titleStyle?: "headline" | "sentence";
  valueProposition?: string;
  differentiator?: string;
  specialization?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryHref?: string;
  trustItems: string[];
  heroImage: string;
  heroImageAlt: string;
  /** Office / architecture accents composed beside the portrait */
  accentImages?: { src: string; alt?: string }[];
};

export function HeroSection({
  eyebrow,
  titleLine1,
  titleLine2,
  titleStyle = "headline",
  valueProposition,
  differentiator,
  specialization,
  ctaPrimary,
  ctaSecondary,
  ctaSecondaryHref = "/portfolio",
  trustItems,
  heroImage,
  heroImageAlt,
  accentImages = [],
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : revealTransition;
  const titleTransition = prefersReducedMotion ? { duration: 0 } : heroTitleTransition;
  const stagger = prefersReducedMotion ? 0 : 0.09;
  const leadParagraphs = valueProposition
    ? valueProposition
        .split(/\n\n+/)
        .map((part) => part.trim())
        .filter(Boolean)
    : [];

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
          <h1
            className={`hero-title mt-0${titleStyle === "sentence" ? " hero-title--sentence" : ""}`}
            aria-label={[titleLine1, titleLine2].filter(Boolean).join(" ")}
          >
            <span className="hero-title-mask">
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...titleTransition, delay: prefersReducedMotion ? 0 : 0.08 }}
              >
                {titleLine1}
              </motion.span>
            </span>
            {titleLine2 ? (
              <span className="hero-title-mask">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...titleTransition, delay: prefersReducedMotion ? 0 : 0.18 }}
                >
                  {titleLine2}
                </motion.span>
              </span>
            ) : null}
          </h1>

          {leadParagraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              className="hero-lead"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={transition}
              style={index > 0 ? { marginTop: "1rem" } : undefined}
            >
              {paragraph}
            </motion.p>
          ))}

          {differentiator ? (
            <motion.p
              className="hero-differentiator"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={transition}
            >
              {differentiator}
            </motion.p>
          ) : null}

          {eyebrow ? (
            <motion.p
              className="hero-partners"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={transition}
            >
              {eyebrow}
            </motion.p>
          ) : null}

          {specialization ? (
            <motion.p
              className="hero-spec"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={transition}
            >
              {specialization}
            </motion.p>
          ) : null}

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={transition}
          >
            <ContactCta>{ctaPrimary}</ContactCta>
            {ctaSecondaryHref.startsWith("#") || ctaSecondaryHref.includes("/#") ? (
              <ContactCta variant="secondary" goal="hero_secondary_cta_click" defaultService={ctaSecondary}>
                {ctaSecondary}
              </ContactCta>
            ) : (
              <Link href={ctaSecondaryHref as "/"} className="btn-secondary">
                {ctaSecondary}
              </Link>
            )}
          </motion.div>
        </motion.div>

        <motion.figure
          className={`hero-media${accentImages.length > 0 ? " hero-media--compose" : " hero-media--banner"}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.28 }}
        >
          <div className="hero-media__compose">
            <EditorialImageFrame variant="hero" className="hero-media__frame hero-media__portrait">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                sizes={accentImages.length > 0 ? "(max-width: 768px) 100vw, 62vw" : "100vw"}
                className="hero-media__image"
                priority
                unoptimized={heroImage.endsWith(".svg")}
              />
            </EditorialImageFrame>
            {accentImages.length > 0 ? (
              <div className="hero-media__accents" aria-hidden="true">
                {accentImages.slice(0, 2).map((item) => (
                  <EditorialImageFrame key={item.src} variant="card" className="hero-media__accent">
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="hero-media__image"
                    />
                  </EditorialImageFrame>
                ))}
              </div>
            ) : null}
          </div>
          <figcaption className="sr-only">
            {heroImageAlt} · {trustItems.join(" · ")}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
