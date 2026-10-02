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
  AnimatePresence,
  animate,
} from "motion/react";
import TechLogo from "./TechLogo";
import MagneticButton from "./MagneticButton";
import {
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Award,
  Layers,
  Code,
  Terminal,
  Database,
  Briefcase,
  Zap,
  Github,
  Linkedin,
  GraduationCap,
} from "lucide-react";

export type ThemePalette = "teal" | "violet" | "sunset" | "ocean" | "matrix";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
  onOpenResume?: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  palette?: ThemePalette;
  onPaletteChange?: (palette: ThemePalette) => void;
}

const rotatingRoles = [
  "AI & Data Science Engineer",
  "Junior Software Associate",
  "Full-Stack MERN Developer",
  "Machine Learning Builder",
];

const typingPhrases = [
  "Web & AI Systems",
  "Machine Learning Models",
  "Full-Stack Applications",
  "Intelligent Architectures",
];

const tickerTechnologies = [
  { name: "React JS", icon: Layers },
  { name: "Next JS", icon: Layers },
  { name: "Node JS", icon: Terminal },
  { name: "Python", icon: Code },
  { name: "Tailwind CSS", icon: Sparkles },
  { name: "Vue JS", icon: Layers },
  { name: "MERN Stack", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "Flask", icon: Terminal },
  { name: "Figma", icon: Sparkles },
  { name: "Git", icon: Code },
];

export default function Hero({
  onNavClick,
  onOpenResume,
  theme = "dark",
  onToggleTheme,
  palette = "teal",
  onPaletteChange,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Typewriter typing animation state for the main headline
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = typingPhrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (typedText.length < fullText.length) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  // Dynamic role rotator
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // 3D Mouse Parallax & Dynamic Light Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springTilt = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springTilt);
  const smoothY = useSpring(mouseY, springTilt);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const spotlightX = useTransform(smoothX, [-0.5, 0.5], [-120, 120]);
  const spotlightY = useTransform(smoothY, [-0.5, 0.5], [-80, 80]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
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

  const isLight = theme === "light";

  // Floating Particle Generator
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 7.5 + 4) % 94}%`,
        top: `${(i * 9 + 12) % 82}%`,
        size: (i % 3) + 2,
        delay: (i * 0.4) % 3,
        duration: 3.5 + (i % 4) * 0.8,
      })),
    []
  );


  // Animation variants for staggered entrance
  const leftColVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12,
      },
    },
  };

  const fadeInUpVariant: any = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const scaleUpVariant: any = {
    hidden: { opacity: 0, scale: 0.94, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-0 overflow-hidden select-none transition-colors duration-700 ${isLight ? "bg-[#f0f9fa]" : "bg-[#060e11]"
        }`}
    >
      {/* ─── Ambient Glow Blobs & Dynamic Studio Lighting ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className={`absolute inset-0 opacity-[0.04] ${isLight ? "invert" : ""}`}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--purple) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dynamic Mouse Spotlight Beam */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-30 transition-colors duration-700"
          style={{
            x: spotlightX,
            y: spotlightY,
            background: "radial-gradient(circle, var(--purple) 0%, var(--blue) 50%, transparent 75%)",
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: isLight ? [0.2, 0.28, 0.2] : [0.3, 0.42, 0.3],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--purple) 0%, transparent 70%)",
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: isLight ? [0.2, 0.28, 0.2] : [0.3, 0.42, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 right-[5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[150px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)",
          }}
        />

        {/* Floating Neon Micro-Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "var(--purple)",
              boxShadow: "0 0 8px var(--purple)",
              animation: `float-particle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ─── MAIN HERO CONTENT: 3D SPLIT BENTO (Chosen Style) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{ opacity: heroOpacity, y: heroY }}
        className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 my-auto py-2 sm:py-3 z-10"
      >
        {/* Left Column: Heading, Role rotator, Bio, CTAs, Stats with coordinated entrance */}
        <motion.div
          variants={leftColVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-7/12 flex flex-col items-start text-left z-20"
        >
          {/* Top Status Pill - 21st.dev Style */}
          <motion.div
            variants={fadeInUpVariant}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-4 shadow-sm backdrop-blur-md transition-all ${
              isLight
                ? "bg-teal-500/10 border-teal-500/30 text-teal-800 shadow-teal-500/10"
                : "bg-teal-500/[0.08] border-teal-500/30 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]"
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute w-2 h-2 rounded-full bg-teal-400 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-teal-400" />
            </div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-extrabold">
              AI & SOFTWARE SYSTEMS
            </span>
          </motion.div>

          {/* Staggered Animated Headline with Typewriter Effect */}
          <motion.h1
            variants={fadeInUpVariant}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.1] font-sans"
          >
            <span className={`inline-block ${isLight ? "text-slate-900" : "text-white"}`}>
              Crafting Scalable
            </span>
            <br />
            <span
              className={`bg-clip-text text-transparent animate-gradient-flow inline-flex items-center min-h-[1.15em] relative ${
                isLight
                  ? "bg-gradient-to-r from-teal-700 via-cyan-800 to-teal-900 font-extrabold"
                  : "bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400"
              }`}
              style={{
                textShadow: isLight
                  ? "none"
                  : "0 0 35px rgba(20, 184, 166, 0.4)",
              }}
            >
              <span>{typedText || "\u00A0"}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className={`inline-block w-[3px] sm:w-[4px] h-[0.82em] ml-1.5 align-middle rounded-sm ${
                  isLight
                    ? "bg-teal-700 shadow-[0_0_8px_rgba(13,148,136,0.6)]"
                    : "bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
                }`}
              />
            </span>
            <br />
            <span className={`inline-block ${isLight ? "text-slate-900" : "text-white"}`}>
              with Modern Vision.
            </span>
          </motion.h1>

          {/* Specializing In Pill with Shimmer & Live Pulse */}
          <motion.div
            variants={scaleUpVariant}
            whileHover={{ scale: 1.02 }}
            className={`mt-3 sm:mt-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border backdrop-blur-md shadow-sm transition-all duration-300 relative overflow-hidden group ${isLight
              ? "bg-white/90 border-teal-500/25 text-slate-800 shadow-teal-500/10"
              : "bg-teal-950/40 border-teal-500/35 text-white shadow-[0_0_15px_rgba(20,184,166,0.15)]"
              }`}
          >
            {/* Micro animated light sweep on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-teal-400/15 to-transparent pointer-events-none" />

            <span className="text-[11px] font-mono uppercase tracking-widest text-teal-500 font-bold flex items-center gap-1.5 relative z-10">
              <div className="relative">
                <span className="absolute -inset-0.5 rounded-full bg-teal-400/50 animate-ping" />
                <Zap className="w-3.5 h-3.5 text-teal-400 fill-teal-400 relative z-10" />
              </div>
              SPECIALIZING IN:
            </span>
            <div className="h-6 overflow-hidden flex items-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`text-xs sm:text-sm font-mono font-extrabold whitespace-nowrap ${
                    isLight ? "text-teal-800" : "text-cyan-400"
                  }`}
                >
                  {rotatingRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bio text with smooth fade */}
          <motion.p
            variants={fadeInUpVariant}
            className={`mt-3 sm:mt-4 text-sm sm:text-base max-w-xl leading-relaxed font-normal ${isLight ? "text-slate-600" : "text-slate-300/90"
              }`}
          >
            B.Tech in Artificial Intelligence & Data Science (<span className="font-semibold text-teal-400">KKWIEER</span>, 8.44 CGPA) and Junior Associate in the Software Division at{" "}
            <span className="font-semibold text-teal-400">ESDS Software Solution Limited</span>. Smart India Hackathon finalist passionate about scalable full-stack architectures, machine learning workflows, and modern web systems.
          </motion.p>

          {/* Action CTAs & Socials with Spring & Shimmer Physics */}
          <motion.div
            variants={fadeInUpVariant}
            className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <MagneticButton strength={0.3} onClick={() => onNavClick("projects")}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 hover:from-teal-600 hover:to-cyan-600 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_4px_25px_rgba(20,184,166,0.4)] hover:shadow-[0_6px_35px_rgba(20,184,166,0.7)] transition-all cursor-pointer overflow-hidden"
              >
                {/* Continuous Light Shimmer Sweep Animation */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.8s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                <span className="relative z-10">EXPLORE WORK</span>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </motion.div>
              </motion.button>
            </MagneticButton>

            {onOpenResume && (
              <MagneticButton strength={0.25} onClick={onOpenResume}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md overflow-hidden ${isLight
                    ? "bg-white/90 border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-teal-500 shadow-sm hover:shadow-[0_4px_20px_rgba(20,184,166,0.2)]"
                    : "bg-white/[0.05] border-white/20 text-white hover:bg-white/[0.1] hover:border-teal-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.25)]"
                    }`}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent pointer-events-none" />
                  <span className="relative z-10">VIEW RESUME</span>
                  <ArrowUpRight className="w-4 h-4 text-teal-400 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
              </MagneticButton>
            )}

            <div className="flex items-center gap-2 ml-0.5">
              <motion.a
                href="https://github.com/pratikshaa27"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.15, y: -3, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
                className={`relative p-2.5 rounded-full border transition-all duration-300 group ${isLight
                  ? "bg-white/80 border-slate-200 text-slate-700 hover:text-teal-600 hover:border-teal-500 shadow-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.25)]"
                  : "bg-white/[0.05] border-white/15 text-slate-300 hover:text-teal-400 hover:border-teal-400/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                  }`}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/pratiksha-khandbahale-005b39256/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.15, y: -3, rotate: -6 }}
                whileTap={{ scale: 0.92 }}
                className={`relative p-2.5 rounded-full border transition-all duration-300 group ${isLight
                  ? "bg-white/80 border-slate-200 text-slate-700 hover:text-teal-600 hover:border-teal-500 shadow-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.25)]"
                  : "bg-white/[0.05] border-white/15 text-slate-300 hover:text-teal-400 hover:border-teal-400/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                  }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </motion.a>
            </div>
          </motion.div>

          {/* Real-time Engineering Impact Telemetry Bar */}
          <motion.div
            variants={fadeInUpVariant}
            className={`relative w-full mt-6 sm:mt-7 rounded-2xl glass-panel p-3 sm:p-4 border overflow-hidden ${
              isLight ? "border-slate-200/90 shadow-sm" : "border-white/10"
            }`}
          >
            {/* Top glass specular shimmer */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent pointer-events-none" />

            <div className="w-full grid grid-cols-3 gap-3 sm:gap-5 relative">
              <motion.div
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="p-1 sm:p-2 rounded-xl transition-colors group cursor-default hover:bg-teal-500/[0.06]"
              >
                <div className={`text-xl sm:text-2xl font-black font-sans flex items-center gap-1.5 ${
                  isLight ? "text-teal-700" : "text-teal-400"
                }`}>
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
                  >
                    15+
                  </motion.span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping opacity-70 ${isLight ? "bg-teal-600" : "bg-teal-400"}`} />
                </div>
                <div
                  className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mt-0.5 ${isLight ? "text-slate-700 font-bold" : "text-slate-400"
                    }`}
                >
                  Projects Built
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="p-1 sm:p-2 rounded-xl transition-colors group cursor-default hover:bg-cyan-500/[0.06]"
              >
                <div className={`text-xl sm:text-2xl font-black font-sans flex items-center gap-1.5 ${
                  isLight ? "text-cyan-800" : "text-cyan-400"
                }`}>
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.3 }}
                  >
                    1+ Yr
                  </motion.span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse opacity-70 ${isLight ? "bg-cyan-700" : "bg-cyan-400"}`} />
                </div>
                <div
                  className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mt-0.5 ${isLight ? "text-slate-700 font-bold" : "text-slate-400"
                    }`}
                >
                  Industry Exp
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="p-1 sm:p-2 rounded-xl transition-colors group cursor-default hover:bg-teal-300/[0.06]"
              >
                <div className={`text-xl sm:text-2xl font-black font-sans flex items-center gap-1.5 ${
                  isLight ? "text-teal-800" : "text-teal-300"
                }`}>
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.4 }}
                  >
                    Top 5
                  </motion.span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping opacity-70 ${isLight ? "bg-amber-600" : "bg-amber-400"}`} />
                </div>
                <div
                  className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mt-0.5 ${isLight ? "text-slate-700 font-bold" : "text-slate-400"
                    }`}
                >
                  SIH '24 Finalist
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Portrait Showcase with Watermark & 4 Floating Badges */}
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full lg:w-5/12 flex justify-center items-end relative pb-0 pt-8 sm:pt-12 mt-auto"
        >
          {/* Background Name Watermark with Smooth Breathing Float */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: isLight ? [0.035, 0.065, 0.035] : [0.03, 0.055, 0.03],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] lg:text-[140px] font-black uppercase tracking-tighter select-none pointer-events-none -z-10 leading-none ${isLight ? "text-teal-900" : "text-white"
              }`}
            style={{ fontFamily: "'Anton', 'Bebas Neue', Impact, sans-serif" }}
          >
            PORTFOLIO
          </motion.div>

          {/* Ambient Radial Spotlight with Pulsating Breathing Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full blur-[90px] pointer-events-none -z-5 ${isLight
              ? "bg-gradient-to-tr from-teal-400/30 to-cyan-300/30"
              : "bg-gradient-to-tr from-teal-500/40 via-cyan-400/30 to-sky-500/20"
              }`}
          />

          <div className="relative w-[300px] sm:w-[380px] md:w-[420px] flex justify-center items-end">
            {/* Cutout Image with Breathing Float & Gentle Zoom */}
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.012, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full flex justify-center items-end"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              }}
            >
              <img
                src={finalPhoto}
                alt="Pratiksha Khandbahale"
                className={`w-auto h-[340px] sm:h-[420px] md:h-[460px] lg:h-[500px] max-h-[64vh] object-contain object-bottom filter transition-all duration-500 ${isLight
                  ? "drop-shadow-[0_20px_35px_rgba(20,184,166,0.2)]"
                  : "drop-shadow-[0_25px_50px_rgba(20,184,166,0.35)]"
                  }`}
              />
            </motion.div>

            {/* Badge 1: Smart India Hackathon Winner (Top-Left, floating beside hair) */}
            <motion.div
              style={{ transform: "translateZ(45px)" }}
              initial={{ opacity: 0, scale: 0.65, y: 25 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -7, 0],
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.35 },
                scale: { type: "spring", stiffness: 280, damping: 18, delay: 0.35 },
                y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.1, y: -9, rotate: 1 }}
              className={`absolute top-0 sm:top-2 -left-6 sm:-left-14 lg:-left-20 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border shadow-xl transition-all cursor-pointer overflow-hidden group glass-panel glass-panel-hover ${isLight
                ? "border-amber-400/50 text-slate-800 shadow-amber-500/10 hover:shadow-amber-500/25"
                : "border-amber-400/40 text-white shadow-amber-500/15 hover:shadow-amber-500/30"
                }`}
            >
              {/* Micro Shimmer Line */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent pointer-events-none" />

              <div className="relative">
                <span className="absolute -inset-1 rounded-xl bg-amber-400/30 animate-ping opacity-50 pointer-events-none" />
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-bold shadow-md relative z-10">
                  <Award className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-slate-950" />
                </div>
              </div>
              <div className="flex flex-col text-left relative z-10">
                <span className="text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider leading-tight">
                  Smart India Hackathon
                </span>
                <span className={`text-[8.5px] sm:text-[9px] font-mono font-extrabold tracking-widest uppercase ${
                  isLight ? "text-amber-600" : "text-amber-400"
                }`}>
                  Top 5 Finalist (IIT KGP)
                </span>
              </div>
            </motion.div>

            {/* Badge 2: ESDS Software (Top-Right, safely beside shoulder/arm) */}
            <motion.div
              style={{ transform: "translateZ(40px)" }}
              initial={{ opacity: 0, scale: 0.65, y: 25 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, 7, 0],
                rotate: [0.5, -0.5, 0.5],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.5 },
                scale: { type: "spring", stiffness: 280, damping: 18, delay: 0.5 },
                y: { duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              }}
              whileHover={{ scale: 1.1, y: -5, rotate: -1 }}
              className={`absolute top-36 sm:top-40 -right-6 sm:-right-14 lg:-right-20 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border shadow-xl transition-all cursor-pointer overflow-hidden group glass-panel glass-panel-hover ${isLight
                ? "border-teal-500/40 text-slate-800 shadow-teal-500/10 hover:shadow-teal-500/25"
                : "border-teal-500/35 text-white shadow-teal-500/20 hover:shadow-teal-500/35"
                }`}
            >
              {/* Micro Shimmer Line */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent pointer-events-none" />

              <div className="relative">
                <span className="absolute -inset-1 rounded-xl bg-teal-400/30 animate-ping opacity-50 pointer-events-none" />
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md relative z-10">
                  <Briefcase className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
              </div>
              <div className="flex flex-col text-left relative z-10">
                <span className="text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider leading-tight">
                  ESDS Software
                </span>
                <span className={`text-[8.5px] sm:text-[9px] font-mono font-extrabold tracking-widest uppercase ${
                  isLight ? "text-teal-700" : "text-teal-400"
                }`}>
                  Junior Associate
                </span>
              </div>
            </motion.div>

            {/* Badge 3: Full-Stack & AI (Bottom-Left, safely beside hip) */}
            <motion.div
              style={{ transform: "translateZ(50px)" }}
              initial={{ opacity: 0, scale: 0.65, y: 25 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
                rotate: [0.5, -0.5, 0.5],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.65 },
                scale: { type: "spring", stiffness: 280, damping: 18, delay: 0.65 },
                y: { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              whileHover={{ scale: 1.1, y: -9, rotate: 1 }}
              className={`absolute bottom-20 sm:bottom-24 -left-6 sm:-left-12 lg:-left-18 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border shadow-xl transition-all cursor-pointer overflow-hidden group glass-panel glass-panel-hover ${isLight
                ? "border-cyan-500/40 text-slate-800 shadow-cyan-500/10 hover:shadow-cyan-500/25"
                : "border-cyan-500/35 text-white shadow-cyan-500/20 hover:shadow-cyan-500/35"
                }`}
            >
              {/* Micro Shimmer Line */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />

              <div className="relative">
                <span className="absolute -inset-1 rounded-xl bg-cyan-400/30 animate-ping opacity-50 pointer-events-none" />
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-md relative z-10">
                  <Layers className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
              </div>
              <div className="flex flex-col text-left relative z-10">
                <span className="text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider leading-tight">
                  Full-Stack & AI
                </span>
                <span className={`text-[8.5px] sm:text-[9px] font-mono font-extrabold tracking-widest uppercase ${
                  isLight ? "text-cyan-700" : "text-cyan-400"
                }`}>
                  MERN • Python • ML
                </span>
              </div>
            </motion.div>

            {/* Badge 4: B.Tech AI & DS (Bottom-Right, floating beside lower arm) */}
            <motion.div
              style={{ transform: "translateZ(45px)" }}
              initial={{ opacity: 0, scale: 0.65, y: 25 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, 6, 0],
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.8 },
                scale: { type: "spring", stiffness: 280, damping: 18, delay: 0.8 },
                y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                rotate: { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              }}
              whileHover={{ scale: 1.1, y: -5, rotate: -1 }}
              className={`absolute bottom-4 sm:bottom-6 -right-6 sm:-right-12 lg:-right-16 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border shadow-xl transition-all cursor-pointer overflow-hidden group glass-panel glass-panel-hover ${isLight
                ? "border-emerald-500/40 text-slate-800 shadow-emerald-500/10 hover:shadow-emerald-500/25"
                : "border-emerald-500/35 text-white shadow-emerald-500/20 hover:shadow-emerald-500/35"
                }`}
            >
              {/* Micro Shimmer Line */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent pointer-events-none" />

              <div className="relative">
                <span className="absolute -inset-1 rounded-xl bg-emerald-400/30 animate-ping opacity-50 pointer-events-none" />
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-md relative z-10">
                  <GraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
              </div>
              <div className="flex flex-col text-left relative z-10">
                <span className="text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider leading-tight">
                  B.Tech AI & DS
                </span>
                <span className={`text-[8.5px] sm:text-[9px] font-mono font-extrabold tracking-widest uppercase ${
                  isLight ? "text-emerald-700" : "text-emerald-400"
                }`}>
                  KKWIEER • 8.44 CGPA
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Bottom Marquee Ticker (Previous Glowing Teal Line Color & Gradient) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative z-20 mt-auto"
      >
        <div
          className={`w-full py-3.5 border-y overflow-hidden relative backdrop-blur-md transition-colors duration-500 ${isLight
            ? "bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 border-teal-400/40 shadow-[0_4px_25px_rgba(20,184,166,0.25)]"
            : "bg-gradient-to-r from-[#032629] via-[#0f766e] to-[#032629] border-teal-400/30 shadow-[0_4px_30px_rgba(20,184,166,0.35)]"
            }`}
        >
          {/* Continuous Sweeping Light Beam Animation */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Gradient Edge Masks for Smooth Fade */}
          <div
            className={`absolute left-0 inset-y-0 w-16 sm:w-28 z-10 pointer-events-none opacity-80 ${isLight
              ? "bg-gradient-to-r from-teal-600 to-transparent"
              : "bg-gradient-to-r from-[#032629] to-transparent"
              }`}
          />
          <div
            className={`absolute right-0 inset-y-0 w-16 sm:w-28 z-10 pointer-events-none opacity-80 ${isLight
              ? "bg-gradient-to-l from-teal-600 to-transparent"
              : "bg-gradient-to-l from-[#032629] to-transparent"
              }`}
          />

          <motion.div
            className="flex items-center gap-8 sm:gap-14 whitespace-nowrap will-change-transform"
            animate={{
              x: ["0%", "-33.333%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedTechnologies.map((tech, i) => (
              <div key={`${tech.name}-${i}`} className="flex items-center gap-8 sm:gap-14 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.12, y: -2 }}
                  className="flex items-center gap-2.5 transition-all cursor-pointer group py-1 px-3 rounded-xl hover:bg-white/15"
                >
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.25 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  >
                    <TechLogo
                      name={tech.name}
                      className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                    />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold tracking-wider uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] group-hover:text-teal-100 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
                <span className="text-teal-200/50 font-mono text-sm select-none">/</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
