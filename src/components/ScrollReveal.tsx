/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { ArrowUp, Compass, Sparkles } from "lucide-react";
import Lenis from "lenis";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "blur-in"
  | "flip-up";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number | "some" | "all";
  once?: boolean;
  blur?: boolean;
}

const variantStyles: Record<
  RevealVariant,
  { initial: Record<string, any>; animate: Record<string, any> }
> = {
  "fade-up": {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-down": {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  "slide-left": {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  "scale-up": {
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  },
  "blur-in": {
    initial: { opacity: 0, filter: "blur(14px)", y: 30 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  "flip-up": {
    initial: { opacity: 0, rotateX: 20, y: 40 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
  },
};

/**
 * 21st.dev inspired modern ScrollReveal wrapper with unblur + spring physics
 */
export function ScrollReveal({
  children,
  variant = "blur-in",
  delay = 0,
  duration = 0.85,
  className = "",
  amount = 0.15,
  once = true,
  blur = true,
}: ScrollRevealProps) {
  const selected = variantStyles[variant] || variantStyles["blur-in"];

  const initialProps = {
    ...selected.initial,
    ...(blur && !selected.initial.filter ? { filter: "blur(8px)" } : {}),
  };

  const animateProps = {
    ...selected.animate,
    ...(blur && !selected.animate.filter ? { filter: "blur(0px)" } : {}),
  };

  return (
    <motion.div
      initial={initialProps}
      whileInView={animateProps}
      viewport={{ once, amount, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Ultra smooth cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hook to initialize Lenis smooth momentum scrolling
 */
export function useLenis() {
  useEffect(() => {
    // Only enable if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);
}

/**
 * Stagger Container to cascade children animations on scroll
 */
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  className = "",
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.1, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Item for use inside StaggerContainer
 */
export function StaggerItem({
  children,
  className = "",
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Top Glowing Scroll Progress Bar (21st.dev style)
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-teal-400 via-cyan-400 to-pink-accent shadow-[0_0_12px_rgba(45,212,191,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}

/**
 * Floating Scroll-To-Top Button with Circular SVG Progress Ring
 */
export function ScrollToTopButton() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
      setVisible(latest > 0.08); // Show after 8% scroll
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.6,
        y: visible ? 0 : 20,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-12 h-12 rounded-full bg-slate-900/90 dark:bg-slate-950/90 light:bg-white/95 backdrop-blur-xl border border-teal-500/30 flex items-center justify-center text-teal-400 hover:text-white shadow-[0_4px_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all cursor-pointer group"
        aria-label="Scroll back to top"
      >
        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5 pointer-events-none">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-700/30 dark:stroke-white/10 light:stroke-slate-300 fill-none"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-teal-400 fill-none transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <ArrowUp className="w-4 h-4 z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
      </motion.button>
    </motion.div>
  );
}

/**
 * Standardized 21st.dev Section Header with un-blur title reveal & shimmer accent
 */
interface SectionHeaderProps {
  number: string;
  titlePrefix: string;
  highlightedText: string;
  titleSuffix?: string;
  emoji?: string;
}

export function SectionHeader({
  number,
  titlePrefix,
  highlightedText,
  titleSuffix = "",
  emoji = "✨",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start text-left mb-16 relative"
    >
      {/* Category Pill Tag */}
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] text-teal-400 uppercase bg-teal-500/10 border border-teal-500/20 shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping inline-block" />
          {number}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-4xl md:text-6xl text-white font-medium flex items-center gap-3 tracking-tight">
        <span className="text-3xl md:text-5xl animate-pulse">{emoji}</span>
        {titlePrefix}{" "}
        <span className="font-display font-display-serif italic text-gradient">
          {highlightedText}
        </span>
        {titleSuffix && ` ${titleSuffix}`}
        <span className="text-3xl md:text-5xl animate-pulse">{emoji}</span>
      </h2>

      {/* Animated Gradient Accent Bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "4rem", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="h-[2.5px] bg-gradient-accent mt-4 rounded-full"
      />
    </motion.div>
  );
}

/**
 * 21st.dev Kinetic Scroll Velocity Marquee Banner
 */
export function ScrollVelocityBanner({
  text = "ARTIFICIAL INTELLIGENCE • FULL STACK DEVELOPMENT • MACHINE LEARNING • DATA SCIENCE • NEURAL NETWORKS • REACT • PYTHON",
}: {
  text?: string;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-3, 3]);

  return (
    <div className="relative w-full overflow-hidden py-6 select-none pointer-events-none opacity-80">
      <motion.div
        style={{ skewX: skewVelocity }}
        className="flex whitespace-nowrap gap-8 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-white/30"
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 items-center"
        >
          <span>{text}</span>
          <Sparkles className="w-3.5 h-3.5 text-teal-400 inline" />
          <span>{text}</span>
          <Sparkles className="w-3.5 h-3.5 text-teal-400 inline" />
          <span>{text}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Interactive Right-Side Floating Section Dots Navigator
 */
const sectionNavList = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function FloatingScrollTracker({
  activeSection,
  onNavClick,
}: {
  activeSection: string;
  onNavClick: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 p-2 rounded-full bg-slate-900/40 dark:bg-slate-950/60 light:bg-white/60 backdrop-blur-xl border border-white/10 shadow-2xl">
      {sectionNavList.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHover = hovered === sec.id;

        return (
          <div
            key={sec.id}
            className="relative flex items-center justify-center group"
            onMouseEnter={() => setHovered(sec.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <button
              onClick={() => onNavClick(sec.id)}
              className="relative p-1.5 focus:outline-none cursor-pointer"
              aria-label={`Jump to ${sec.label}`}
            >
              {/* Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.4 : isHover ? 1.2 : 1,
                  backgroundColor: isActive
                    ? "rgb(45, 212, 191)"
                    : isHover
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(255, 255, 255, 0.25)",
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? "shadow-[0_0_10px_rgba(45,212,191,0.9)]" : ""
                }`}
              />

              {/* Active pulsing outer halo */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-dot"
                  className="absolute inset-0 rounded-full border border-teal-400/60 animate-ping pointer-events-none"
                />
              )}
            </button>

            {/* Hover Tooltip Label */}
            {isHover && (
              <motion.span
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="absolute right-9 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[10px] font-mono tracking-wider border border-white/10 shadow-xl whitespace-nowrap pointer-events-none backdrop-blur-md"
              >
                {sec.label}
              </motion.span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ScrollReveal;
