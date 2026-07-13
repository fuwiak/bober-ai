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
      viewport={{ once: true, margin: "-48px 0px" }}
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

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = REVEAL_OFFSET.desktop;

  return (
    <motion.div
      variants={
        prefersReducedMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: offset },
              visible: { opacity: 1, y: 0, transition: revealTransition },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
