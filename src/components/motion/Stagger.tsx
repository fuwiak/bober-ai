"use client";

import { motion, useReducedMotion } from "motion/react";
import { revealTransition } from "@/lib/motion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
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

  return (
    <motion.div
      variants={
        prefersReducedMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: revealTransition },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
