/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Award, ShieldCheck, CheckCircle2, Trophy, Star, Sparkles } from "lucide-react";
import { CertificateItem, AchievementItem } from "../types";
import { SectionHeader } from "./ScrollReveal";

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
  return (
    <section
      id="certificates"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* 21st.dev Section Header */}
      <SectionHeader
        number="05 / CREDENTIALS"
        titlePrefix="Certificates &"
        highlightedText="Achievements"
        emoji="✨"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Verified Certifications (Timeline Card Layout) */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-white/50 uppercase tracking-widest pl-2">
            <Award className="w-4 h-4 text-purple-accent" />
            <span>Verified Credentials</span>
          </div>

          <div className="space-y-6">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="rounded-3xl glass-panel p-6 flex gap-4 relative overflow-hidden group/cert border border-transparent hover:border-purple-accent/30 transition-all duration-300 shadow-lg hover:shadow-purple-accent/5 hover:-translate-y-1"
              >
                {/* Shiny holographic gloss sweep overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover/cert:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Verified icon indicator */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-purple-accent/10 border border-purple-accent/20 flex items-center justify-center group-hover/cert:scale-105 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6 text-purple-accent" />
                  </div>
                </div>

                <div className="flex-1">
                  <span className="text-[10px] font-mono text-purple-accent/80 block uppercase tracking-wider">
                    {cert.platform}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-tight mt-1">
                    {cert.name}
                  </h3>
                  <span className="text-xs text-white/40 block mt-1 font-mono">
                    Issued: {cert.date} | Credential ID: {cert.credentialId}
                  </span>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Aesthetic interactive verification button with bouncy spring */}
                <motion.a
                  href="https://github.com/pratikshaa27"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 450, damping: 10 }}
                  className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-purple-accent/20 hover:border-purple-accent/30 transition-colors cursor-pointer"
                  title="Verify Certificate"
                >
                  <CheckCircle2 className="w-4 h-4 text-pink-accent group-hover/cert:animate-pulse" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Key Milestones Achievements (Large High-Contrast Panel) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 rounded-[32px] glass-panel p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle matrix background glow */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-purple-600/5 to-transparent blur-2xl pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-pink-accent animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">Key Achievements</h3>
                <span className="text-[10px] font-mono text-white/40 uppercase">HONORS & AWARDS</span>
              </div>
            </div>

            {/* Achievements Items List */}
            <div className="space-y-8 text-left">
              {achievementsData.map((ach) => (
                <div key={ach.id} className="relative pl-6 border-l border-white/10 group/ach">
                  {/* Hover active highlight node */}
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-pink-accent/30 group-hover/ach:bg-pink-accent group-hover/ach:scale-125 transition-all duration-300" />

                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h4 className="font-bold text-white leading-snug group-hover/ach:text-pink-accent transition-colors">
                      {ach.title}
                    </h4>
                    <span className="text-[9px] font-mono tracking-widest text-pink-accent uppercase bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
                      {ach.badge}
                    </span>
                  </div>

                  <p className="text-xs text-white/70 mt-2 leading-relaxed">
                    {ach.detail}
                  </p>

                  <span className="text-[10px] font-mono text-white/30 block mt-2">
                    Date: {ach.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Abstract Footer HUD detail */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-accent" /> Verified honors repository
            </span>
            <span>VERIFIED RECORD</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
