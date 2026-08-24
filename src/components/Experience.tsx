/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Shield, Globe, Terminal, Users, Sparkles, Briefcase } from "lucide-react";
import { ExperienceItem } from "../types";
import SpotlightCard from "./SpotlightCard";
import { SectionHeader } from "./ScrollReveal";

const experienceData: ExperienceItem[] = [
  {
    id: "exp_1",
    role: "Junior Associate - Software Division",
    company: "ESDS Software Solution Limited // Full Time",
    duration: "November 2025 — Present",
    category: "Web Dev",
    responsibilities: [
      "Develop and maintain high-performance, robust full-stack software solutions and intelligent database integrations.",
      "Work within the Core Software Division to architect, build, and deploy secure and scalable corporate applications.",
      "Integrate intelligent systems, data analytic tools, and custom algorithms to enhance platform automation and user-focused digital solutions.",
    ],
  },
  {
    id: "exp_2",
    role: "Web Development Intern",
    company: "FireFist, Nashik // Internship",
    duration: "August 2024 — October 2024",
    category: "Internship",
    responsibilities: [
      "Worked on frontend development using React and Elementor, building responsive and intuitive user interfaces.",
      "Designed reusable UI components and built interactive web pages, contributing directly to optimized user experience.",
      "Collaborated closely with backend engineers and UI/UX designers to deliver high-quality, responsive web platforms.",
    ],
  },
  {
    id: "exp_3",
    role: "Fullstack Development Intern",
    company: "Golden Dream Software Solution // Internship",
    duration: "June 2022 — August 2022",
    category: "Internship",
    responsibilities: [
      "Built responsive and interactive websites using PHP, HTML, CSS, and JavaScript.",
      "Gained valuable hands-on experience in UI design, relational database integration with MySQL, and debugging codebases.",
      "Used Git & GitHub for version control and collaborative development within the software team.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Internship":
        return <Shield className="w-4 h-4 text-teal-300" />;
      case "Project Dev":
        return <Terminal className="w-4 h-4 text-cyan-300" />;
      case "Web Dev":
        return <Globe className="w-4 h-4 text-teal-400" />;
      default:
        return <Users className="w-4 h-4 text-teal-300" />;
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Background ambient glowing orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-cyan-500/5 to-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <SectionHeader
        number="06 / EXPERIENCE"
        titlePrefix="Professional"
        highlightedText="Experience"
        emoji="✨"
      />

      {/* List of Experiences with Staggered Scroll Reveals */}
      <div className="space-y-8 text-left mt-12">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.15,
            }}
            whileHover={{
              y: -4,
              scale: 1.008,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <SpotlightCard
              spotlightColor="rgba(20, 184, 166, 0.12)"
              borderColor="rgba(45, 212, 191, 0.35)"
              className="p-6 sm:p-8 md:p-10 relative overflow-hidden group/card border border-white/10 hover:border-teal-400/40 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(20,184,166,0.15)]"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-10">
                {/* Left Column: Title, Company, Category Tag */}
                <div className="flex-shrink-0 md:max-w-xs w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 350 }}
                      className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(45,212,191,0.1)] group-hover/card:border-teal-400/40"
                    >
                      {getCategoryIcon(exp.category)}
                    </motion.div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-300/90 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-md">
                      {exp.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover/card:text-teal-300 transition-colors duration-300">
                    {exp.role}
                  </h3>

                  <div className="text-sm font-medium text-white/80 mt-1.5 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{exp.company}</span>
                  </div>

                  <div className="text-xs font-mono text-teal-300/80 mt-3.5 bg-white/5 py-1 px-3 rounded-full border border-white/10 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    {exp.duration}
                  </div>
                </div>

                {/* Right Column: Responsibilities bullet-less document layout */}
                <div className="flex-1 space-y-4 md:pl-6">
                  <span className="text-[10px] font-mono text-teal-300/90 tracking-widest uppercase block font-semibold mb-2">
                    CORE RESPONSIBILITIES & CONTRIBUTIONS
                  </span>
                  <ul className="space-y-3.5">
                    {exp.responsibilities.map((resp, rIndex) => (
                      <motion.li
                        key={rIndex}
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 + rIndex * 0.1 }}
                        className="flex items-start gap-3 text-sm sm:text-[15px] text-white/80 leading-relaxed group/li"
                      >
                        <ArrowRight className="w-4.5 h-4.5 text-teal-400/70 group-hover/li:text-teal-300 group-hover/li:translate-x-1.5 transition-all duration-300 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 group-hover/li:text-white transition-colors duration-200">
                          {resp}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Aesthetic Footer Tag */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40">
                <span className="flex items-center gap-1 text-teal-400/70">
                  <Sparkles className="w-3 h-3" /> Certified Career Milestone
                </span>
                <span className="select-none tracking-widest">RECORD 0{index + 1}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
