"use client";

import Image from "next/image";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { revealTransition } from "@/lib/motion";

type HeroSectionProps = {
  location: string;
  onlineLabel: string;
  siteName: string;
  title: string;
  roles: string[];
  nameLine: string;
  focus: string;
  trustLine: string;
  partnersLine: string;
  responseNote: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTelegram: string;
  legalNote: string;
  legalLink: string;
  legalHref: string;
  email: string;
  phone: string;
  telegramUrl: string;
  avatar: string;
  avatarAlt: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection(props: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : revealTransition;
  const stagger = prefersReducedMotion ? 0 : 0.08;

  const sequence = [
    <p key="location" className="text-sm text-muted">
      {props.location} · <span className="text-accent-green">{props.onlineLabel}</span>
    </p>,
    <p key="site" className="mt-2 font-display text-xl tracking-tight text-ink md:text-2xl">
      {props.siteName}
    </p>,
    <h1 key="title" className="display-lg mt-1">
      {props.title}
    </h1>,
    <div key="roles" className="mt-3 flex flex-wrap gap-2">
      {props.roles.map((role) => (
        <span key={role} className="badge-pill text-xs">
          {role}
        </span>
      ))}
    </div>,
    <p key="name" className="mt-3 text-sm text-muted">
      {props.nameLine}
    </p>,
    <p key="focus" className="mt-3 text-sm leading-relaxed text-body">
      {props.focus}
    </p>,
    <p key="trust" className="mt-5 text-sm text-muted">
      {props.trustLine}
    </p>,
    <p key="partners" className="mt-2 text-sm font-medium text-ink">
      {props.partnersLine}
    </p>,
    <p key="response" className="mt-2 text-xs text-muted-soft">
      {props.responseNote}
    </p>,
    <div key="cta" className="mt-6 flex flex-wrap gap-3">
      <a href="#contact" className="btn-primary">
        {props.ctaPrimary}
        <ArrowRight className="button-arrow h-4 w-4" aria-hidden />
      </a>
      <a href="#portfolio" className="btn-secondary">
        {props.ctaSecondary}
      </a>
      <a href={props.telegramUrl} target="_blank" rel="noreferrer" className="btn-secondary">
        {props.ctaTelegram}
      </a>
    </div>,
    <p key="contacts" className="mt-4 text-sm text-muted">
      <a href={`mailto:${props.email}`} className="text-link font-medium">
        {props.email}
      </a>
      {" · "}
      <a href={`tel:${props.phone}`} className="text-link">
        {props.phone}
      </a>
    </p>,
    <p key="legal" className="mt-5 text-xs leading-relaxed text-muted-soft">
      {props.legalNote}{" "}
      <NextLink href={props.legalHref} className="text-link">
        {props.legalLink}
      </NextLink>
    </p>,
  ];

  return (
    <section className="section-band border-b border-hairline-soft">
      <div className="container-editorial grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger } },
          }}
        >
          {sequence.map((node, index) => (
            <motion.div key={index} variants={itemVariants} transition={{ ...transition, delay: index * stagger }}>
              {node}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.55 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative h-48 w-48 overflow-hidden rounded-[18px] border border-hairline md:h-64 md:w-64">
            <Image
              src={props.avatar}
              alt={props.avatarAlt}
              fill
              sizes="256px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
