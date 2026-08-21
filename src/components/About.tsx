/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { BookOpen, Laptop, Compass, Heart, GraduationCap } from "lucide-react";
import { motion, animate } from "motion/react";
import SpotlightCard from "./SpotlightCard";
import { SectionHeader } from "./ScrollReveal";

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

function CountUp({ value, duration = 2, decimals = 0, suffix = "" }: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(current) {
        node.textContent = current.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, duration, decimals, suffix]);

  return <span ref={nodeRef}>0</span>;
}

export default function About() {
  const currentFocus = [
    {
      title: "Currently Learning",
      description: "AI, Deep Learning & Generative Models",
      icon: BookOpen,
      color: "from-purple-accent/15 to-blue-accent/5",
      border: "hover:border-purple-accent/40",
    },
    {
      title: "Building",
      description: "Full Stack Intelligent Web Systems",
      icon: Laptop,
      color: "from-blue-accent/15 to-pink-accent/5",
      border: "hover:border-blue-accent/40",
    },
    {
      title: "Exploring",
      description: "Neural Networks & Predictive Analytics",
      icon: Compass,
      color: "from-pink-accent/15 to-purple-accent/5",
      border: "hover:border-pink-accent/40",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Cinematic continuous rotating background blob */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-gradient-to-tr from-teal-500/5 to-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/5 to-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      {/* 21st.dev Section Header */}
      <SectionHeader
        number="01 / PROFILE"
        titlePrefix="About"
        highlightedText="Me"
        emoji="✨"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Statement of Purpose (21st.dev Spotlight Bento Card) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <SpotlightCard className="p-8 md:p-10 flex flex-col justify-between h-full" spotlightColor="rgba(20, 184, 166, 0.08)" borderColor="rgba(45, 212, 191, 0.25)">
            {/* Subtle watermark background */}
            <div className="absolute right-6 top-8 text-white/5 font-mono text-8xl font-bold select-none pointer-events-none">
              01
            </div>

            <div>
              {/* Header style */}
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">Executive Profile</h3>
                  <span className="text-[10px] font-mono text-teal-300 uppercase tracking-widest">21ST.DEV CERTIFIED</span>
                </div>
              </div>

              {/* Document Content */}
              <div className="space-y-5 text-white/80 text-sm sm:text-base leading-relaxed text-left font-sans">
                <p>
                  My name is <strong className="text-white font-semibold">Pratiksha Khandbahale</strong>, and I am a passionate Artificial Intelligence & Data Science engineer currently working as a Junior Associate in the Software Division at ESDS Software Solution Limited.
                </p>
                <p>
                  I specialize in building intelligent, scalable, and visually captivating full-stack applications. My work sits at the intersection of AI algorithms, real-time data pipelines, and responsive web animations.
                </p>
                <p>
                  With hands-on experience in modern JavaScript frameworks (React, Next.js), Python backend architectures, and machine learning models, I focus on delivering clean, performant code that drives real business value.
                </p>
              </div>
            </div>

            {/* Footer of the statement card */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1.5 text-purple-accent">
                <Heart className="w-3.5 h-3.5 fill-purple-accent/20 text-purple-accent" /> Passion driven development.
              </span>
              <span>PRATIKSHA KHANDBAHALE</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right: Current Focus Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {currentFocus.map((focus, index) => {
            const Icon = focus.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex-1 rounded-3xl glass-panel p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group glass-panel-hover border-transparent ${focus.border}`}
              >
                {/* Micro glowing color block */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${focus.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`} />

                {/* Focus Header */}
                <div className="flex justify-between items-start z-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-white/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-300" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-wider">FOCUS 0{index + 1}</span>
                </div>

                {/* Focus Text */}
                <div className="mt-6 text-left z-10">
                  <h4 className="text-xs font-mono text-purple-accent/80 uppercase tracking-widest mb-1.5">
                    {focus.title}
                  </h4>
                  <p className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                    {focus.description}
                  </p>
                </div>

                {/* Abstract geometric micro line accent */}
                <div className="absolute right-0 bottom-0 w-12 h-1 h-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Premium Stats Counter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 relative">
        {[
          { label: "B.TECH ACADEMIC CGPA", val: 8.44, dec: 2, suff: "", subtitle: "K. K. Wagh IEER" },
          { label: "COMPLETED PROJECTS", val: 12, dec: 0, suff: "+", subtitle: "Full Stack & AI" },
          { label: "HACKATHON STANDINGS", val: 1, dec: 0, suff: "st", subtitle: "State Level Champion" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: idx * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group/stat hover:border-purple-accent/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] animate-[fadeIn_0.5s_ease_out]"
          >
            {/* Glossy hover reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-accent/0 via-purple-accent/5 to-blue-accent/0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Neon glowing line accent */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-purple-accent/40 to-transparent group-hover/stat:via-purple-accent/80 transition-all duration-500" />

            <div className="text-left">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 block mb-2 uppercase">{stat.label}</span>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight text-gradient">
                <CountUp value={stat.val} decimals={stat.dec} suffix={stat.suff} />
              </h3>
            </div>
            <div className="text-left mt-4 border-t border-white/5 pt-3">
              <span className="text-[10px] font-mono text-purple-accent/70 uppercase tracking-wider">{stat.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
