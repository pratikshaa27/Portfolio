/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence
} from "motion/react";
import TechLogo from "./TechLogo";
import MagneticButton from "./MagneticButton";
import {
  ArrowUpRight,
  Sparkles,
  Award,
  Layers,
  Code,
  Terminal,
  Database,
  MapPin,
  Briefcase,
  Zap,
  ChevronDown
} from "lucide-react";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
  onOpenResume?: () => void;
  theme?: "dark" | "light";
}

const rotatingRoles = [
  "FULL-STACK ENGINEER",
  "AI & ML INNOVATOR",
  "CREATIVE ARCHITECT",
  "UI/UX CRAFTSMAN"
];

const tickerTechnologies = [
  { name: "React JS", icon: Layers },
  { name: "Vue JS", icon: Layers },
  { name: "Tailwind CSS", icon: Sparkles },
  { name: "Next JS", icon: Layers },
  { name: "Node JS", icon: Terminal },
  { name: "Python", icon: Code },
  { name: "MERN Stack", icon: Database },
];

/* ─── Cinematic Character Blur-to-Focus Reveal ─── */
function HeroCharReveal({
  text,
  className,
  delay = 0,
  theme = "dark",
}: {
  text: string;
  className?: string;
  delay?: number;
  theme?: "dark" | "light";
}) {
  const chars = text.split("");
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 50, filter: "blur(20px)", scale: 0.85 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block select-none"
          style={{
            willChange: "opacity, transform, filter",
            backgroundImage:
              theme === "light"
                ? "linear-gradient(180deg, #094a4c 0%, #0d9488 50%, #0284c7 100%)"
                : "linear-gradient(180deg, #ffffff 0%, #e0f2fe 40%, #5eead4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Bottom Tag Stagger Item ─── */
function StaggerTag({
  children,
  index,
  onClick,
  theme = "dark",
}: {
  children: React.ReactNode;
  index: number;
  onClick?: () => void;
  theme?: "dark" | "light";
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay: 1.0 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`transition-all duration-300 cursor-pointer ${
        theme === "light"
          ? "text-slate-700 hover:text-teal-600 font-bold hover:scale-105"
          : "text-white/75 hover:text-teal-400 font-bold hover:scale-105"
      }`}
      onClick={onClick}
    >
      {children}
    </motion.span>
  );
}

export default function Hero({ onNavClick, onOpenResume, theme = "dark" }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotate roles dynamically
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // 21st.dev Scroll-Driven Interactive Parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll Transforms
  const titleScrollY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleScrollScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.08]);
  const titleScrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const portraitScrollScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  const haloScrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const haloScrollRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const capsulesScrollOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const capsulesLeftScrollX = useTransform(scrollYProgress, [0, 0.4], [0, -90]);
  const capsulesRightScrollX = useTransform(scrollYProgress, [0, 0.4], [0, 90]);

  const bottomGridScrollY = useTransform(scrollYProgress, [0, 0.5], [0, 30]);
  const bottomGridOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.25]);

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Mouse-tracking for 3D parallax & light cone tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const flareX = useTransform(smoothX, [-0.5, 0.5], [-80, 80]);
  const mouseTextX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const mouseTextY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const mousePortraitX = useTransform(smoothX, [-0.5, 0.5], [-26, 26]);
  const mousePortraitY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const finalPhoto = "/photo.png?v=v3";
  const duplicatedTechnologies = useMemo(
    () => [...tickerTechnologies, ...tickerTechnologies, ...tickerTechnologies],
    []
  );

  return (
    <section
      ref={heroRef}
      id="home"
      className={`relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-0 overflow-hidden select-none transition-colors duration-700 ${
        theme === "light" ? "bg-[#f0f9fa]" : "bg-[#060e11]"
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1400px" }}
    >
      {/* ─── Cinematic Anamorphic Horizontal Light Streak (Top/Center) ─── */}
      <motion.div
        style={{ x: flareX }}
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent blur-[0.5px] pointer-events-none -z-5"
      />
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent blur-[1px] pointer-events-none -z-5" />

      {/* ─── Cinematic Viewport HUD & Film Metadata Framing ─── */}
      <div className="absolute top-24 sm:top-28 left-6 sm:left-12 flex items-center gap-3 text-[9px] font-mono text-teal-500/40 tracking-[0.25em] uppercase hidden md:flex pointer-events-none z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
        <span>REC [●] 2.39:1 CINEMASCOPE</span>
        <span>•</span>
        <span>ISO 400</span>
      </div>

      <div className="absolute top-24 sm:top-28 right-6 sm:right-12 flex items-center gap-3 text-[9px] font-mono text-teal-500/40 tracking-[0.25em] uppercase hidden md:flex pointer-events-none z-20">
        <span>FPS 60.00</span>
        <span>•</span>
        <span>LAT 19.9975° N</span>
        <span>•</span>
        <span>2026 // EDITION</span>
      </div>

      {/* ─── Corner Film Crop Crosshairs ─── */}
      <div className="absolute top-28 left-6 sm:left-10 text-teal-500/25 font-mono text-xs pointer-events-none select-none hidden lg:block">
        ┌─
      </div>
      <div className="absolute top-28 right-6 sm:right-10 text-teal-500/25 font-mono text-xs pointer-events-none select-none hidden lg:block">
        ─┐
      </div>

      {/* ─── Ambient Glow Orbs, Spotlight Beams & Cinematic Vignette ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{ x: bgX, y: bgY }}
      >
        {/* Deep Spotlight Aura */}
        <div
          className={`absolute top-[2%] left-[8%] w-[800px] h-[800px] rounded-full blur-[170px] animate-pulse-slow ${
            theme === "light"
              ? "bg-gradient-to-tr from-teal-400/35 via-cyan-300/20 to-transparent"
              : "bg-gradient-to-tr from-teal-600/40 via-cyan-500/25 to-transparent"
          }`}
        />
        <div
          className={`absolute bottom-[6%] right-[6%] w-[750px] h-[750px] rounded-full blur-[170px] animate-pulse-slow ${
            theme === "light"
              ? "bg-gradient-to-br from-teal-300/30 via-sky-200/20 to-transparent"
              : "bg-gradient-to-br from-teal-500/30 via-sky-900/25 to-transparent"
          }`}
          style={{ animationDelay: "-3.5s" }}
        />

        {/* Cinematic Concentric Wireframe Halo Rings with Scroll Acceleration */}
        <motion.div
          style={{ scale: haloScrollScale, rotate: haloScrollRotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-teal-500/[0.08] rounded-full pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        </motion.div>
        <motion.div
          style={{ scale: haloScrollScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] border border-dashed border-teal-500/[0.08] rounded-full pointer-events-none"
        >
          <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </motion.div>

        {/* Floating Cinematic Dust Sparkles */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[18%] w-2 h-2 rounded-full bg-teal-400 blur-[0.5px] shadow-[0_0_15px_rgba(20,184,166,0.9)]"
        />
        <motion.div
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute top-1/3 right-[20%] w-2.5 h-2.5 rounded-full bg-cyan-400 blur-[0.5px] shadow-[0_0_18px_rgba(6,182,212,0.9)]"
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
          className="absolute bottom-1/3 left-[26%] w-1.5 h-1.5 rounded-full bg-teal-300 blur-[0.5px] shadow-[0_0_12px_rgba(45,212,191,0.9)]"
        />
      </motion.div>

      {/* ─── Cinematic Vignette Outer Edge Shadow (Dark mode depth) ─── */}
      {theme === "dark" && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(6,14,17,0.7)_100%)] z-1" />
      )}

      {/* ─── Top Editorial Meta Header (HUD Pill) ─── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-2 pb-1 flex items-center justify-between z-20">
        <motion.div
          initial={{ opacity: 0, y: -15, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border shadow-lg ${
            theme === "light"
              ? "bg-white/90 border-teal-500/25 text-slate-800 shadow-teal-500/10"
              : "bg-black/50 border-teal-500/25 text-teal-200/90 backdrop-blur-xl shadow-teal-500/15"
          }`}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase font-bold">
            AVAILABLE FOR VISIONARY ROLES
          </span>
        </motion.div>

        {/* Dynamic Rotating Role Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase overflow-hidden"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.45 }}
              className="text-teal-400 font-black"
            >
              {rotatingRoles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── Main Hero Center Stage ─── */}
      <div className="relative w-full max-w-[1400px] mx-auto flex-1 flex flex-col justify-center items-center px-4 sm:px-8 my-auto z-10 min-h-[460px] sm:min-h-[520px] md:min-h-[580px]">
        {/* Floating Cinematic Glass Micro-Capsules (Drifting with Scroll & Mouse) */}
        <motion.div
          style={{
            x: capsulesLeftScrollX,
            opacity: capsulesScrollOpacity,
          }}
          initial={{ opacity: 0, x: -45, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute left-4 sm:left-10 lg:left-16 top-[38%] z-20 hidden lg:flex items-center gap-3 px-4.5 py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
            theme === "light"
              ? "bg-white/95 border-teal-500/30 text-slate-800 shadow-teal-500/15"
              : "bg-[#091a1e]/85 border-teal-500/35 text-white/90 shadow-teal-500/25"
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
            <Award className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono font-bold tracking-wider leading-tight">
              STATE HACKATHON
            </span>
            <span className="text-[9px] font-mono text-teal-400 font-extrabold tracking-widest uppercase">
              1st PLACE CHAMPION
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{
            x: capsulesRightScrollX,
            opacity: capsulesScrollOpacity,
          }}
          initial={{ opacity: 0, x: 45, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute right-4 sm:right-10 lg:right-16 top-[38%] z-20 hidden lg:flex items-center gap-3 px-4.5 py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
            theme === "light"
              ? "bg-white/95 border-teal-500/30 text-slate-800 shadow-teal-500/15"
              : "bg-[#091a1e]/85 border-teal-500/35 text-white/90 shadow-teal-500/25"
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono font-bold tracking-wider leading-tight">
              ESDS SOFTWARE
            </span>
            <span className="text-[9px] font-mono text-teal-400 font-extrabold tracking-widest uppercase">
              JUNIOR ASSOCIATE
            </span>
          </div>
        </motion.div>

        {/* 21st.dev Scroll-Driven Parallax Title Stage */}
        <motion.div
          className="w-full text-center relative z-0 flex items-center justify-center select-none pointer-events-none"
          style={{
            x: mouseTextX,
            y: titleScrollY,
            scale: titleScrollScale,
            opacity: titleScrollOpacity,
          }}
        >
          <h1
            style={{ fontFamily: "'Anton', 'Bebas Neue', Impact, sans-serif" }}
            className={`relative text-[19vw] sm:text-[18vw] md:text-[17vw] lg:text-[16.5vw] font-black uppercase tracking-[-0.01em] leading-none text-center select-none ${
              theme === "light"
                ? "drop-shadow-[0_15px_30px_rgba(13,148,136,0.25)]"
                : "drop-shadow-[0_25px_60px_rgba(20,184,166,0.55)] filter drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]"
            }`}
          >
            <HeroCharReveal text="PRATIKSHA" delay={0.12} theme={theme} />
          </h1>
        </motion.div>

        {/* Silhouette Glow Backlight (Directly behind portrait) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: theme === "light" ? 0.45 : 0.85, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] sm:w-[500px] md:w-[650px] h-[360px] sm:h-[500px] md:h-[650px] rounded-full pointer-events-none -z-5 blur-[120px]"
          style={{
            background:
              theme === "light"
                ? "radial-gradient(circle, rgba(20,184,166,0.35) 0%, rgba(6,182,212,0.18) 50%, transparent 75%)"
                : "radial-gradient(circle, rgba(20,184,166,0.55) 0%, rgba(6,182,212,0.28) 50%, transparent 75%)",
          }}
        />

        {/* 21st.dev Scroll-Driven Parallax Portrait with Grounding Mask */}
        <motion.div
          initial={{ opacity: 0, y: 75, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-full flex justify-center items-end"
          style={{
            x: mousePortraitX,
            y: portraitScrollY,
            scale: portraitScrollScale,
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          }}
        >
          <motion.img
            src={finalPhoto}
            alt="Pratiksha Khandbahale"
            referrerPolicy="no-referrer"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = "/photo.png?v=v3";
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className={`h-[340px] sm:h-[440px] md:h-[560px] lg:h-[640px] xl:h-[680px] object-contain object-bottom filter ${
              theme === "light"
                ? "drop-shadow-[0_18px_40px_rgba(20,184,166,0.28)]"
                : "drop-shadow-[0_24px_55px_rgba(20,184,166,0.45)]"
            }`}
          />
        </motion.div>

        {/* ─── 21st.dev Style Floating Scroll Prompt Indicator ─── */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none cursor-pointer"
          onClick={() => onNavClick("about")}
        >
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-teal-500/50 font-bold">
            SCROLL
          </span>
          <div className="w-5 h-8 rounded-full border border-teal-500/30 flex justify-center p-1 bg-teal-500/5 backdrop-blur-sm shadow-[0_0_10px_rgba(20,184,166,0.15)]">
            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.9)]"
            />
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Hero Grid with Staggered Tag Reveals & Socials ─── */}
      <motion.div
        style={{
          y: bottomGridScrollY,
          opacity: bottomGridOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`w-full max-w-7xl mx-auto px-6 sm:px-10 py-4.5 z-20 grid grid-cols-1 md:grid-cols-12 gap-6 border-t items-center ${
          theme === "light" ? "border-teal-500/15" : "border-white/10"
        }`}
      >
        {/* Bottom Left: Staggered Specialization Tags */}
        <div className="md:col-span-7 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-[13px] font-sans font-bold tracking-[0.15em]">
          <StaggerTag index={0} onClick={() => onNavClick("skills")} theme={theme}>
            WEB DESIGN
          </StaggerTag>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className={theme === "light" ? "text-teal-600/40 text-xs" : "text-teal-400/40 text-xs"}
          >
            •
          </motion.span>
          <StaggerTag index={1} onClick={() => onNavClick("skills")} theme={theme}>
            UI/UX DESIGN
          </StaggerTag>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className={theme === "light" ? "text-teal-600/40 text-xs" : "text-teal-400/40 text-xs"}
          >
            •
          </motion.span>
          <StaggerTag index={2} onClick={() => onNavClick("skills")} theme={theme}>
            AI & DATA SCIENCE
          </StaggerTag>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={theme === "light" ? "text-teal-600/40 text-xs" : "text-teal-400/40 text-xs"}
          >
            •
          </motion.span>
          <StaggerTag index={3} onClick={() => onNavClick("skills")} theme={theme}>
            MERN STACK
          </StaggerTag>
        </div>

        {/* Bottom Right: Staggered Social Links & Cinematic Resume Action */}
        <div
          className={`md:col-span-5 flex items-center justify-start md:justify-end gap-5 text-xs sm:text-[13px] font-sans font-extrabold tracking-[0.15em] ${
            theme === "light" ? "text-slate-800" : "text-white/90"
          }`}
        >
          <motion.a
            href="https://github.com/pratikshaa27"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 15, filter: "blur(5px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className={`transition-colors uppercase relative group py-1 ${
              theme === "light" ? "hover:text-teal-600" : "hover:text-teal-400"
            }`}
          >
            <span>GITHUB</span>
            <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-teal-400 transition-all duration-300 group-hover:w-full" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/pratiksha-khandbahale-005b39256/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 15, filter: "blur(5px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`transition-colors uppercase relative group py-1 ${
              theme === "light" ? "hover:text-teal-600" : "hover:text-teal-400"
            }`}
          >
            <span>LINKEDIN</span>
            <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-teal-400 transition-all duration-300 group-hover:w-full" />
          </motion.a>
          {onOpenResume && (
            <MagneticButton strength={0.3} onClick={onOpenResume}>
              <motion.button
                initial={{ opacity: 0, x: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 hover:from-teal-600 hover:to-cyan-600 !text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_20px_rgba(20,184,166,0.45)] hover:shadow-[0_0_30px_rgba(20,184,166,0.7)] transition-all cursor-pointer"
              >
                <span>VIEW RESUME</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            </MagneticButton>
          )}
        </div>
      </motion.div>

      {/* ─── Strict 1-Line Infinite Moving Skills Marquee Banner ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scaleX: 0.9 }}
        animate={{ opacity: 1, y: 0, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full relative overflow-hidden py-3.5 border-y z-20 transition-colors duration-500 ${
          theme === "light"
            ? "bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 border-teal-400/40 shadow-[0_4px_25px_rgba(20,184,166,0.25)]"
            : "bg-gradient-to-r from-[#032629] via-[#0f766e] to-[#032629] border-teal-400/30 shadow-[0_4px_30px_rgba(20,184,166,0.35)]"
        }`}
      >
        {/* Continuous Sweeping Light Beam Animation */}
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12 z-10"
          animate={{ x: ["-100%", "350%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />

        {/* Side fade masks for ultra-smooth edge blending */}
        <div
          className={`absolute inset-y-0 left-0 w-12 bg-gradient-to-r to-transparent z-10 pointer-events-none opacity-60 ${
            theme === "light" ? "from-teal-600" : "from-[#032629]"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 w-12 bg-gradient-to-l to-transparent z-10 pointer-events-none opacity-60 ${
            theme === "light" ? "from-teal-600" : "from-[#032629]"
          }`}
        />

        {/* Strict 1-Line Horizontal Infinite Slider Container */}
        <div className="w-full overflow-hidden flex items-center select-none">
          <motion.div
            className="flex items-center flex-nowrap whitespace-nowrap gap-8 sm:gap-14 min-w-max"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 22,
                ease: "linear",
              },
            }}
          >
            {duplicatedTechnologies.map((tech, i) => (
              <div key={`${tech.name}-${i}`} className="flex items-center gap-8 sm:gap-14 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-3 transition-all cursor-pointer group py-1 px-3 rounded-xl hover:bg-white/15"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  >
                    <TechLogo
                      name={tech.name}
                      className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                    />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase !text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] group-hover:text-teal-100 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
                <span className="!text-white/35 font-light text-sm select-none">|</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
