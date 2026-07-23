"use client";

import { motion, useReducedMotion } from "motion/react";
import { REVEAL_OFFSET, STAGGER_DELAY, revealTransition } from "@/lib/motion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = STAGGER_DELAY }: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px", amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

/** Keep opacity at 1 — animate only Y so content stays readable without JS. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = REVEAL_OFFSET.desktop;

  return (
    <motion.div
      variants={
        prefersReducedMotion
          ? undefined
          : {
              hidden: { opacity: 1, y: offset },
              visible: { opacity: 1, y: 0, transition: revealTransition },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
