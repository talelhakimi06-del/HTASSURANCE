"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Délai d'apparition en secondes (pour décaler les éléments d'une même rangée) */
  delay?: number;
  /** Décalage vertical initial en px */
  y?: number;
  className?: string;
  /** Balise HTML rendue (div par défaut) */
  as?: "div" | "section" | "li" | "span";
};

/**
 * Enveloppe une zone pour la faire apparaître en douceur (fade + slide-up)
 * lorsqu'elle entre dans le viewport. Respecte « prefers-reduced-motion ».
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </MotionTag>
  );
}
