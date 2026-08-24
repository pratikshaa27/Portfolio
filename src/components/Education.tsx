/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Calendar, CheckCircle, Clock, Sparkles } from "lucide-react";
import { EducationItem } from "../types";
import { SectionHeader } from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const educationData: EducationItem[] = [
  {
    id: "edu_1",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institute: "K. K. Wagh Institute of Engineering Education and Research (KKWIEER), Nashik, Maharashtra, India",
    duration: "2021 — 2025",
    status: "Completed",
    description: "Completed specialized coursework in Artificial Intelligence, Machine Learning, Deep Learning, Neural Networks, Database Systems, and Advanced Software Development. Graduated with a CGPA of 8.44.",
  },
  {
    id: "edu_2",
    degree: "Diploma in Computer Technology",
    institute: "K. K. Wagh Polytechnic, Nashik, India",
    duration: "2018 — 2021",
    status: "Completed",
    description: "Core computer technology fundamentals, system software design, networking, object-oriented systems, and relational databases. Graduated with an academic score of 87.37%.",
  },
  {
    id: "edu_3",
    degree: "Secondary School Certificate (10th SSC)",
    institute: "Dr. Shalinitai Borse School, Nashik, India",
    duration: "2018",
    status: "Completed",
    description: "Graduated with an overall academic score of 87.60%, establishing a solid foundation in analytical thinking, mathematics, and foundational sciences.",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    // Smooth ScrollTrigger-driven timeline height expansion
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 80%",
      scrub: 0.8,
      onUpdate: (self) => {
        gsap.set(line, {
          scaleY: Math.min(Math.max(self.progress * 1.05, 0), 1),
          transformOrigin: "top center",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Ambient background glow orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <SectionHeader
        number="02 / EDUCATION"
        titlePrefix="Education"
        highlightedText="History"
        emoji="✨"
      />

      {/* Vertical Timeline Wrapper */}
      <div className="relative border-l border-white/10 md:ml-36 pl-8 md:pl-12 space-y-12 text-left mt-12">
        {/* Timeline glowing neon line overlay with dynamic GSAP scroll expansion */}
        <div
          ref={lineRef}
          style={{ transform: "scaleY(0)" }}
          className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-teal-400 via-cyan-400 to-purple-accent origin-top shadow-[0_0_12px_rgba(45,212,191,0.7)]"
        />

        {educationData.map((item, index) => {
          const isPursuing = item.status.toLowerCase() === "pursuing";
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.15,
              }}
              className="relative group"
            >
              {/* Pulsating timeline anchor node */}
              <div className="absolute left-[-41px] md:left-[-57px] top-7 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute inline-flex h-7 w-7 rounded-full opacity-40 animate-ping ${
                      isPursuing ? "bg-purple-accent" : "bg-teal-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-4.5 w-4.5 border-2 border-slate-950 shadow-[0_0_12px_rgba(45,212,191,0.8)] ${
                      isPursuing
                        ? "bg-purple-accent glow-purple"
                        : "bg-gradient-to-br from-teal-300 to-cyan-400"
                    }`}
                  />
                </div>
              </div>

              {/* Absolute Side Date Panel for desktops with Floating animation */}
              <div className="hidden md:block absolute left-[-200px] top-6 w-36 text-right">
                <motion.span
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  className="inline-block text-xs font-mono font-semibold text-teal-300/90 tracking-tight bg-teal-500/10 border border-teal-500/20 py-1 px-3 rounded-full hover:border-teal-400/50 hover:bg-teal-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(45,212,191,0.1)]"
                >
                  {item.duration.split("—")[0].trim()}
                </motion.span>
              </div>

              {/* Course Card glass panel */}
              <motion.div
                whileHover={{
                  x: 6,
                  y: -3,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden glass-panel-hover border border-white/10 group-hover:border-teal-400/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] group-hover:shadow-[0_16px_36px_rgba(20,184,166,0.15)]"
              >
                {/* Glossy top edge light */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent group-hover:via-teal-400/80 transition-all duration-500 pointer-events-none" />

                {/* Background active pulse blur for pursuing item */}
                {isPursuing && (
                  <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
                )}

                <div>
                  {/* Status & Date Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    {/* Date Badge for Mobile */}
                    <span className="md:hidden text-xs font-semibold text-teal-300 font-mono tracking-tight bg-teal-500/10 border border-teal-500/20 py-1 px-2.5 rounded-full flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>

                    {/* Desktop Date Display */}
                    <span className="hidden md:flex items-center gap-1.5 text-xs text-white/50 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-teal-400/70" />
                      {item.duration}
                    </span>

                    {/* Status Pill */}
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1.5 border shadow-[0_0_10px_rgba(45,212,191,0.1)] ${
                        isPursuing
                          ? "bg-purple-accent/10 text-purple-accent border-purple-accent/30"
                          : "bg-teal-500/10 text-teal-300 border-teal-500/30"
                      }`}
                    >
                      {isPursuing ? (
                        <Clock className="w-3 h-3 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3 h-3 text-teal-400" />
                      )}
                      {item.status}
                    </span>
                  </div>

                  {/* Degree Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-teal-300 transition-colors duration-300">
                    {item.degree}
                  </h3>

                  {/* Institute Name */}
                  <div className="flex items-center gap-2 mt-2 font-medium text-white/80">
                    <GraduationCap className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="text-sm tracking-wide text-white/85">
                      {item.institute}
                    </span>
                  </div>

                  {/* Description of learning */}
                  {item.description && (
                    <p className="mt-4 text-sm text-white/70 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Micro accent corner tag */}
                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
                  <span className="flex items-center gap-1 text-teal-400/70 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    Verified Academic Record
                  </span>
                  <span>ACCREDITED</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
