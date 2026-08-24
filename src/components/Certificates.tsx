/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, CheckCircle2, Trophy, Sparkles } from "lucide-react";
import { CertificateItem, AchievementItem } from "../types";
import { SectionHeader } from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const certificatesData: CertificateItem[] = [
  {
    id: "cert_1",
    name: "Machine Learning Specialization",
    platform: "Stanford Online / Coursera",
    date: "July 2025",
    skillsGained: ["Supervised Learning", "Neural Networks", "Logistic Regression", "Recommender Systems"],
    credentialId: "ML-STANFORD-932X",
  },
  {
    id: "cert_2",
    name: "Full-Stack Software Architecture",
    platform: "Meta / Coursera",
    date: "March 2025",
    skillsGained: ["React Native", "Django Backend", "API Integrations", "Database Normalization"],
    credentialId: "META-FS-841A",
  },
  {
    id: "cert_3",
    name: "Data Analytics & Engineering",
    platform: "Google Career Certificates",
    date: "November 2024",
    skillsGained: ["R Programming", "SQL Core", "Data Visualizations", "Predictive Structuring"],
    credentialId: "GOOG-DA-713B",
  },
];

const achievementsData: AchievementItem[] = [
  {
    id: "ach_1",
    title: "1st Place Winner - State Level Hackathon",
    detail: "Developed 'EcoSync', an intelligent AI IoT solution mapping dynamic energy telemetry metrics to reduce commercial office grids carbon footprint by 34%. Awarded top engineering honor among 120 participating state teams.",
    date: "February 2026",
    badge: "Champion",
  },
  {
    id: "ach_2",
    title: "Academic Excellence Achievement Award",
    detail: "Consistently ranked in Top 5% of Department cohort across engineering assessments. Awarded the SPPU Institutional Merit Scholar honor for excellence in algorithmic problem-solving studies.",
    date: "Annually",
    badge: "Scholar",
  },
  {
    id: "ach_3",
    title: "Technical Lead - College Coding Society",
    detail: "Mentored over 200 freshman students in core programming fields, organized competitive coding events, and coordinated technical workshops on Full Stack development, React, and Python AI modeling.",
    date: "2025 - Present",
    badge: "Leader",
  },
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Background ambient glowing orb */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <SectionHeader
        number="05 / CREDENTIALS"
        titlePrefix="Certificates &"
        highlightedText="Achievements"
        emoji="✨"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
        {/* Left: Verified Certifications */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-white/60 uppercase tracking-widest pl-2">
            <Award className="w-4 h-4 text-teal-400" />
            <span>Verified Credentials</span>
          </div>

          <div className="space-y-6">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="rounded-3xl glass-panel p-6 sm:p-7 flex gap-4 sm:gap-5 relative overflow-hidden group/cert border border-white/10 hover:border-teal-400/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_rgba(20,184,166,0.18)]"
              >
                {/* Shiny holographic gloss sweep overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover/cert:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Top line highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent group-hover/cert:via-teal-400/80 transition-all duration-500 pointer-events-none" />

                {/* Verified icon indicator with spring */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 350 }}
                    className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover/cert:border-teal-400/50 group-hover/cert:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300"
                  >
                    <ShieldCheck className="w-6 h-6 text-teal-400" />
                  </motion.div>
                </div>

                <div className="flex-1 pr-8">
                  <span className="text-[10px] font-mono text-teal-300 uppercase tracking-wider font-semibold block">
                    {cert.platform}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-tight mt-1 group-hover/cert:text-teal-300 transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <span className="text-xs text-white/50 block mt-1 font-mono">
                    Issued: {cert.date} | Credential ID: {cert.credentialId}
                  </span>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg text-white/80 group-hover/cert:border-teal-500/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive verification badge button */}
                <motion.a
                  href="https://github.com/pratikshaa27"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 450, damping: 10 }}
                  className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-400/40 transition-colors cursor-pointer shadow-sm"
                  title="Verify Certificate"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-300 group-hover/cert:animate-pulse" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Key Milestones Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-[32px] glass-panel p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
        >
          {/* Ambient matrix glow */}
          <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-gradient-to-bl from-teal-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-8 border-b border-white/10 pb-6 text-left">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(45,212,191,0.15)]"
              >
                <Trophy className="w-5 h-5 text-teal-400 animate-pulse" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight flex items-center gap-2">
                  Key Achievements
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                </h3>
                <span className="text-[10px] font-mono text-teal-300/80 uppercase tracking-widest font-semibold">
                  HONORS & AWARDS
                </span>
              </div>
            </div>

            {/* Achievements Items List */}
            <div className="space-y-8 text-left">
              {achievementsData.map((ach, idx) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + idx * 0.15 }}
                  className="relative pl-6 border-l border-white/10 group/ach"
                >
                  {/* Hover active highlight node with ping */}
                  <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-teal-400/40 group-hover/ach:bg-teal-400 group-hover/ach:scale-125 transition-all duration-300 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  </div>

                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h4 className="font-bold text-white leading-snug group-hover/ach:text-teal-300 transition-colors">
                      {ach.title}
                    </h4>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-teal-300 uppercase bg-teal-500/10 px-2.5 py-0.5 rounded-md border border-teal-500/30 shadow-[0_0_8px_rgba(45,212,191,0.1)]">
                      {ach.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 mt-2.5 leading-relaxed font-sans">
                    {ach.detail}
                  </p>

                  <span className="text-[10px] font-mono text-white/40 block mt-2">
                    Date: {ach.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Abstract Footer detail */}
          <div className="mt-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span className="flex items-center gap-1.5 text-teal-400/80 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Verified Honors Repository
            </span>
            <span>VERIFIED RECORD</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
