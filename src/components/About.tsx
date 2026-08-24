/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { BookOpen, Laptop, Compass, Heart, GraduationCap, Sparkles } from "lucide-react";
import { motion, animate, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "./SpotlightCard";
import { SectionHeader } from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

function CountUp({ value, duration = 2, decimals = 0, suffix = "" }: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-40px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(current) {
        node.textContent = current.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, duration, decimals, suffix, isInView]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const currentFocus = [
    {
      title: "Currently Learning",
      description: "AI, Deep Learning & Generative Models",
      icon: BookOpen,
      color: "from-purple-accent/15 to-blue-accent/5",
      border: "hover:border-purple-accent/40",
      accent: "rgba(168, 85, 247, 0.4)",
    },
    {
      title: "Building",
      description: "Full Stack Intelligent Web Systems",
      icon: Laptop,
      color: "from-blue-accent/15 to-pink-accent/5",
      border: "hover:border-blue-accent/40",
      accent: "rgba(59, 130, 246, 0.4)",
    },
    {
      title: "Exploring",
      description: "Neural Networks & Predictive Analytics",
      icon: Compass,
      color: "from-pink-accent/15 to-purple-accent/5",
      border: "hover:border-pink-accent/40",
      accent: "rgba(236, 72, 153, 0.4)",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Subtle entrance animation via GSAP
    const ctx = gsap.context(() => {
      gsap.from(".about-floating-blob", {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Cinematic continuous rotating background glow blobs */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.08, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="about-floating-blob absolute top-1/4 right-0 w-[450px] h-[450px] bg-gradient-to-tr from-teal-500/10 to-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.12, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
        className="about-floating-blob absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <SectionHeader
        number="01 / PROFILE"
        titlePrefix="About"
        highlightedText="Me"
        emoji="✨"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-10">
        {/* Left: Statement of Purpose (Spotlight Bento Card) */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col"
        >
          <SpotlightCard
            className="p-8 md:p-10 flex flex-col justify-between h-full relative overflow-hidden group/card"
            spotlightColor="rgba(20, 184, 166, 0.12)"
            borderColor="rgba(45, 212, 191, 0.35)"
          >
            {/* Subtle electric edge reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent opacity-50 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Subtle watermark background */}
            <motion.div
              initial={{ opacity: 0.03, scale: 0.95 }}
              whileInView={{ opacity: 0.05, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute right-6 top-8 text-white/5 font-mono text-8xl font-bold select-none pointer-events-none"
            >
              01
            </motion.div>

            <div>
              {/* Header style */}
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.15)]"
                >
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight flex items-center gap-2">
                    Executive Profile
                    <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] font-mono text-teal-300 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                    21ST.DEV CERTIFIED
                  </span>
                </div>
              </div>

              {/* Document Content */}
              <div className="space-y-5 text-white/80 text-sm sm:text-base leading-relaxed text-left font-sans">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  My name is <strong className="text-white font-semibold">Pratiksha Khandbahale</strong>, and I am a passionate Artificial Intelligence & Data Science engineer currently working as a Junior Associate in the Software Division at ESDS Software Solution Limited.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  I specialize in building intelligent, scalable, and visually captivating full-stack applications. My work sits at the intersection of AI algorithms, real-time data pipelines, and responsive web animations.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  With hands-on experience in modern JavaScript frameworks (React, Next.js), Python backend architectures, and machine learning models, I focus on delivering clean, performant code that drives real business value.
                </motion.p>
              </div>
            </div>

            {/* Footer of the statement card */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1.5 text-purple-accent hover:text-teal-300 transition-colors">
                <Heart className="w-3.5 h-3.5 fill-purple-accent/20 text-purple-accent animate-pulse" /> Passion driven development.
              </span>
              <span className="tracking-wider font-semibold text-white/50">PRATIKSHA KHANDBAHALE</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right: Current Focus Cards with 3D hover physics */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {currentFocus.map((focus, index) => {
            const Icon = focus.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -5,
                  scale: 1.015,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`flex-1 rounded-3xl glass-panel p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group glass-panel-hover border border-white/10 ${focus.border} transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)]`}
              >
                {/* Micro glowing color block */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${focus.color} opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none`} />

                {/* Shimmer line top */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-teal-400/40 transition-all duration-500" />

                {/* Focus Header */}
                <div className="flex justify-between items-start z-10">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 350 }}
                    className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-white/30 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-white group-hover:text-teal-300 transition-colors duration-300" />
                  </motion.div>
                  <span className="text-[10px] font-mono text-white/40 tracking-widest font-semibold px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02]">
                    FOCUS 0{index + 1}
                  </span>
                </div>

                {/* Focus Text */}
                <div className="mt-6 text-left z-10">
                  <h4 className="text-xs font-mono text-purple-accent/90 uppercase tracking-widest mb-1.5 font-semibold group-hover:text-teal-300 transition-colors">
                    {focus.title}
                  </h4>
                  <p className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight group-hover:text-white/95">
                    {focus.description}
                  </p>
                </div>

                {/* Abstract geometric micro line accent */}
                <div className="absolute right-0 bottom-0 w-16 h-1 bg-gradient-to-l from-teal-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Premium Stats Counter Row with Spring Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 relative">
        {[
          { label: "B.TECH ACADEMIC CGPA", val: 8.44, dec: 2, suff: "", subtitle: "K. K. Wagh IEER" },
          { label: "COMPLETED PROJECTS", val: 12, dec: 0, suff: "+", subtitle: "Full Stack & AI" },
          { label: "HACKATHON STANDINGS", val: 1, dec: 0, suff: "st", subtitle: "State Level Champion" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: idx * 0.12,
            }}
            whileHover={{
              scale: 1.04,
              y: -4,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group/stat border border-white/10 hover:border-teal-400/40 transition-all duration-500 hover:shadow-[0_12px_36px_rgba(20,184,166,0.25)]"
          >
            {/* Glossy hover reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/0 via-teal-500/5 to-cyan-500/0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Neon glowing line accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent group-hover/stat:via-teal-400/80 transition-all duration-500" />

            <div className="text-left">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 block mb-2 uppercase font-semibold">
                {stat.label}
              </span>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight text-gradient">
                <CountUp value={stat.val} decimals={stat.dec} suffix={stat.suff} />
              </h3>
            </div>
            <div className="text-left mt-4 border-t border-white/10 pt-3">
              <span className="text-[10px] font-mono text-teal-300/80 uppercase tracking-wider font-medium">
                {stat.subtitle}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
