/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Briefcase, ArrowRight, Shield, Globe, Terminal, Users } from "lucide-react";
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
      "Integrate intelligent systems, data analytic tools, and custom algorithms to enhance platform automation and user-focused digital solutions."
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
      "Collaborated closely with backend engineers and UI/UX designers to deliver high-quality, responsive web platforms."
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
      "Used Git & GitHub for version control and collaborative development within the software team."
    ],
  },
];

export default function Experience() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Internship":
        return <Shield className="w-4.5 h-4.5 text-purple-accent" />;
      case "Project Dev":
        return <Terminal className="w-4.5 h-4.5 text-blue-accent" />;
      case "Web Dev":
        return <Globe className="w-4.5 h-4.5 text-pink-accent" />;
      default:
        return <Users className="w-4.5 h-4.5 text-pink-accent" />;
    }
  };

  return (
    <section
      id="experience"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* 21st.dev Section Header */}
      <SectionHeader
        number="06 / EXPERIENCE"
        titlePrefix="Professional"
        highlightedText="Experience"
        emoji="✨"
      />

      {/* Grid of Experiences grouped nicely */}
      <div className="space-y-8 text-left">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
          >
            <SpotlightCard
              spotlightColor="rgba(20, 184, 166, 0.08)"
              borderColor="rgba(45, 212, 191, 0.25)"
              className="p-6 sm:p-8"
            >
              {/* Visual top indicator line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-accent/20 to-transparent" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {/* Left Column: Title, Company, Category Tag */}
                <div className="flex-shrink-0 md:max-w-xs w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                      {getCategoryIcon(exp.category)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/50">
                      {exp.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-purple-accent transition-colors duration-300">
                    {exp.role}
                  </h3>

                  <div className="text-sm font-medium text-white/70 mt-1">{exp.company}</div>
                  <div className="text-xs font-mono text-white/40 mt-3 bg-white/5 py-1 px-3 rounded-full border border-white/5 inline-block">
                    {exp.duration}
                  </div>
                </div>

                {/* Right Column: Responsibilities bullet-less document layout */}
                <div className="flex-1 md:pl-8 md:border-l border-white/5 space-y-4">
                  <span className="text-[9px] font-mono text-purple-accent/70 tracking-widest uppercase block mb-1">
                    CORE RESPONSIBILITIES & CONTRIBUTIONS
                  </span>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, rIndex) => (
                      <li key={rIndex} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed group/li">
                        <ArrowRight className="w-4.5 h-4.5 text-purple-accent/60 group-hover/li:text-purple-accent group-hover/li:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 group-hover/li:text-white transition-colors">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Micro aesthetic decorative element */}
              <div className="absolute bottom-4 right-4 text-white/5 font-mono text-[9px] select-none pointer-events-none">
                RECORD 0{index + 1}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
