"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Reveal — Scroll-reveal animation wrapper
 *
 * Fades in + slides up when element enters viewport.
 * Respects prefers-reduced-motion (no animation when requested).
 */

// Media query subscription for useSyncExternalStore
function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false; // Default to animations enabled on server
}

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Check reduced motion using useSyncExternalStore (React 18+ pattern)
  const prefersReduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    // Skip IntersectionObserver if reduced motion preferred
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced]);

  // If reduced motion is preferred, always show content (skip animation)
  const isVisible = prefersReduced || visible;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
