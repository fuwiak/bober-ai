"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { REVEAL_OFFSET, revealTransition } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/**
 * Entrance motion without hiding content: opacity stays 1 so SSR / failed JS
 * never leaves blank sections. Only a short vertical settle remains.
 */
export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = REVEAL_OFFSET.desktop;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 1, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px", amount: 0.15 }}
      transition={{ ...revealTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
