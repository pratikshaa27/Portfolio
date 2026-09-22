/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechLogo from "./TechLogo";
import { SectionHeader } from "./ScrollReveal";
import {
  Code,
  Terminal,
  Database,
  BrainCircuit,
  Award,
  Sparkles,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  level: string;
  percent: number;
}

interface SkillCategory {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<any>;
  overallPercent: number;
  skills: SkillItem[];
}

const categories: SkillCategory[] = [
  {
    id: "programming-languages",
    number: "01",
    title: "Programming Languages",
    icon: Code,
    overallPercent: 92,
    skills: [
      { name: "Python", level: "Expert", percent: 92 },
      { name: "JavaScript", level: "Expert", percent: 92 },
      { name: "Java", level: "Expert", percent: 92 },
      { name: "C++", level: "Intermediate", percent: 75 },
      { name: "PHP", level: "Intermediate", percent: 75 },
    ],
  },
  {
    id: "frameworks-ui",
    number: "02",
    title: "Frameworks & UI",
    icon: Terminal,
    overallPercent: 88,
    skills: [
      { name: "React.js", level: "Expert", percent: 92 },
      { name: "Tailwind CSS", level: "Expert", percent: 92 },
      { name: "Flask", level: "Intermediate", percent: 75 },
      { name: "MERN Stack", level: "Expert", percent: 92 },
    ],
  },
  {
    id: "databases-tools",
    number: "03",
    title: "Databases & Tools",
    icon: Database,
    overallPercent: 85,
    skills: [
      { name: "MongoDB", level: "Expert", percent: 92 },
      { name: "MySQL", level: "Expert", percent: 92 },
      { name: "SQLite", level: "Intermediate", percent: 75 },
      { name: "Git & GitHub", level: "Expert", percent: 92 },
      { name: "Android Studio", level: "Intermediate", percent: 75 },
      { name: "Figma / PowerBI", level: "Intermediate", percent: 75 },
    ],
  },
  {
    id: "ai-soft-skills",
    number: "04",
    title: "AI, Data Science & Soft Skills",
    icon: BrainCircuit,
    overallPercent: 94,
    skills: [
      { name: "Machine Learning", level: "Expert", percent: 92 },
      { name: "NLP & GenAI", level: "Expert", percent: 92 },
      { name: "Data Analysis", level: "Expert", percent: 92 },
      { name: "Problem Solving", level: "Expert", percent: 92 },
      { name: "Time Management", level: "Expert", percent: 92 },
      { name: "Task Prioritization", level: "Expert", percent: 92 },
    ],
  },
];

interface SkillCardProps {
  card: SkillCategory;
  index: number;
  totalCards: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ card, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const IconComponent = card.icon;

  useEffect(() => {
    const cardEl = cardRef.current;
    const containerEl = containerRef.current;
    if (!cardEl || !containerEl) return;

    const targetScale = 1 - (totalCards - index) * 0.04;

    // Initial state
    gsap.set(cardEl, {
      scale: 1,
      transformOrigin: "center top",
    });

    // Create ScrollTrigger for sticky card stacking animation
    const trigger = ScrollTrigger.create({
      trigger: containerEl,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);

        gsap.set(cardEl, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      className="sticky flex items-center justify-center w-full min-h-[75vh] sm:min-h-[80vh]"
      style={{
        top: `calc(85px + ${index * 22}px)`,
      }}
    >
      <div
        ref={cardRef}
        className="glass-panel group relative w-full max-w-4xl rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-300 text-left border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
        style={{
          transformOrigin: "top center",
        }}
      >
        {/* Top glass specular shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent pointer-events-none" />

        {/* Subtle hover neon glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none group-hover:bg-teal-500/20 transition-all duration-500" />

        <div>
          {/* Header with Year / Category badge & Status */}
          <div className="flex items-center justify-between gap-3 mb-6 border-b border-slate-200 dark:border-white/[0.08] pb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.15)] group-hover:border-teal-400/40 transition-colors">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-teal-600 dark:text-teal-300/80 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  CATEGORY {card.number}
                </span>
                <h3 className="skill-category-title text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight mt-0.5 transition-colors">
                  {card.title}
                </h3>
              </div>
            </div>

            {/* Status / Percentage Pill */}
            <span className="text-xs sm:text-sm font-mono font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30 shadow-[0_0_10px_rgba(45,212,191,0.1)]">
              <CheckCircle className="w-4 h-4" />
              {card.overallPercent}%
            </span>
          </div>

          {/* Skill Bars List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mt-4">
            {card.skills.map((skill, si) => (
              <div key={skill.name} className="flex flex-col gap-1.5 group/line">
                <div className="flex justify-between items-baseline">
                  <span className="skill-name-text text-sm sm:text-base font-semibold group-hover/line:text-teal-600 dark:group-hover/line:text-teal-300 transition-colors flex items-center gap-2">
                    <TechLogo name={skill.name} className="w-4 h-4 flex-shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                  <span className="skill-level-text text-xs font-mono font-medium">
                    {skill.level} · {skill.percent}%
                  </span>
                </div>
                <div className="skill-bar-bg w-full h-[6px] rounded-full overflow-hidden border border-slate-300/40 dark:border-white/[0.04]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + si * 0.05,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 shadow-[0_0_8px_rgba(45,212,191,0.4)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-teal-600 dark:text-teal-400/80" />
            <span className="skill-footer-text font-semibold">{card.skills.length} Mastered Skills</span>
          </div>
          <span className="text-teal-700 dark:text-teal-400/70 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Verified · 2026
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/[0.04] blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <SectionHeader
        number="03 / EXPERTISE"
        titlePrefix="My"
        highlightedText="Skills"
        emoji="✨"
      />

      {/* GSAP Stacking Cards Container */}
      <div className="mt-12 relative w-full flex flex-col items-center">
        {categories.map((card, index) => (
          <SkillCard
            key={card.id}
            card={card}
            index={index}
            totalCards={categories.length}
          />
        ))}
      </div>
    </section>
  );
}
