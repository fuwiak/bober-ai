"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { REVEAL_OFFSET, revealTransition } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = REVEAL_OFFSET.desktop;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ ...revealTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
