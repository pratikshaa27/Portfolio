/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, Code2, Sparkles, BrainCircuit, Globe, Shield, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { ProjectItem } from "../types";
import { SectionHeader } from "./ScrollReveal";

const projectsData: ProjectItem[] = [
  {
    id: "proj_4",
    title: "NeuroAI",
    subtitle: "EEG Based ASD Intelligence Platform",
    description: "An intelligent healthcare solution designed to support Autism Spectrum Disorder (ASD) analysis using EEG brain signal data. Combines Deep Learning and custom ML architectures to analyze emotional patterns, evaluate cognitive states, and predict therapy response effectiveness.",
    techStack: ["Python", "Machine Learning", "Deep Learning", "EEG Processing", "AI Models"],
    githubUrl: "https://github.com/pratikshaa27/NeuroAI",
    liveUrl: "https://github.com/pratikshaa27/NeuroAI",
    size: "large",
    category: "AI & ML",
  },
  {
    id: "proj_1",
    title: "OliviaChain",
    subtitle: "Supply Chain Management & Delivery System",
    description: "Developed a robust mobile application to streamline Olivia's supply chain. Enables beauty parlours to place orders, tracks live deliveries, allows distributors to manage warehouse inventories, and provides administrators with real-time sales insights and analytic reports.",
    techStack: ["Flutter", "Java", "SQLite", "Android Studio", "Git"],
    githubUrl: "https://github.com/pratikshaa27",
    liveUrl: "https://github.com/pratikshaa27",
    size: "normal",
    category: "Mobile Dev",
  },
  {
    id: "proj_2",
    title: "Mindflow",
    subtitle: "Personalized Productivity & Well-being Platform",
    description: "Developed an adaptive productivity platform featuring structured learning roadmaps, integrated chatbot, and mental well-being trackers. Combines gamified challenges, rewards, and public speaking modules driven by behavioral analytics.",
    techStack: ["Machine Learning", "Flask", "React.js", "Gamification", "Python"],
    githubUrl: "https://github.com/pratikshaa27",
    liveUrl: "https://github.com/pratikshaa27",
    size: "normal",
    category: "AI & ML",
  },
  {
    id: "proj_3",
    title: "Re-dact",
    subtitle: "AI-Powered Secure Data Redaction Tool",
    description: "Built a privacy-focused security tool leveraging NLP and machine learning algorithms to redact, anonymize, and obfuscate sensitive personal identifiers from documents across multiple formats, maintaining strict data compliance.",
    techStack: ["Machine Learning", "PyQt", "React.js", "NLP", "Python"],
    githubUrl: "https://github.com/pratikshaa27",
    liveUrl: "https://github.com/pratikshaa27",
    size: "normal",
    category: "AI & ML",
  },
];

const getProjectDetails = (id: string, category: string) => {
  switch (id) {
    case "proj_4":
      return {
        icon: BrainCircuit,
        glow: "hover:shadow-teal-500/20",
        border: "hover:border-teal-500/30",
        gradient: "from-teal-500/10 via-cyan-500/5 to-teal-500/10",
        accent: "text-purple-accent border-teal-500/20 bg-teal-500/10",
        glowColor: "rgba(20, 184, 166, 0.15)",
      };
    case "proj_1":
      return {
        icon: Globe,
        glow: "hover:shadow-teal-400/20",
        border: "hover:border-teal-400/30",
        gradient: "from-teal-500/10 via-cyan-500/5 to-sky-400/10",
        accent: "text-pink-accent border-teal-400/20 bg-teal-400/10",
        glowColor: "rgba(45, 212, 191, 0.15)",
      };
    case "proj_2":
      return {
        icon: Sparkles,
        glow: "hover:shadow-cyan-500/20",
        border: "hover:border-cyan-500/30",
        gradient: "from-cyan-500/10 via-teal-500/5 to-sky-500/10",
        accent: "text-blue-accent border-cyan-500/20 bg-cyan-500/10",
        glowColor: "rgba(6, 182, 212, 0.15)",
      };
    case "proj_3":
    default:
      return {
        icon: Shield,
        glow: "hover:shadow-sky-400/20",
        border: "hover:border-sky-400/30",
        gradient: "from-teal-500/10 via-cyan-500/5 to-teal-400/10",
        accent: "text-pink-accent border-sky-400/20 bg-sky-400/10",
        glowColor: "rgba(56, 189, 248, 0.15)",
      };
  }
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  const categories = ["All", "AI & ML", "Mobile Dev"];

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  // Resize listener for responsive 3D values
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = filteredProjects.length;

  // Auto-rotation effect with hover-pause functionality
  useEffect(() => {
    if (isAutoplayPaused || isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500); // Automatically rotate every 4.5 seconds

    return () => clearInterval(interval);
  }, [isAutoplayPaused, isHovered, total, activeIndex]);

  const getWrappedOffset = (index: number, active: number, count: number) => {
    let diff = index - active;
    if (diff < -count / 2) diff += count;
    if (diff > count / 2) diff -= count;
    return diff;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Get responsive spacing for 3D layout
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const xMultiplier = isMobile ? 120 : isTablet ? 240 : 360;
  const zMultiplier = isMobile ? 80 : isTablet ? 120 : 180;
  const rotateYMultiplier = isMobile ? -25 : isTablet ? -35 : -40;
  const scaleFactor = isMobile ? 0.22 : isTablet ? 0.16 : 0.12;

  // Active item styling configuration
  const activeProject = projectsData[activeIndex];
  const activeDetails = getProjectDetails(activeProject.id, activeProject.category);

  // Tilt event handlers for the active card only
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = activeCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rotateX = -(mouseY / (height / 2)) * 10;
    const rotateY = (mouseX / (width / 2)) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="projects"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative overflow-hidden"
    >
      {/* Dynamic atmospheric ambient background glow responding to selected project */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${activeDetails.glowColor} 0%, transparent 70%)`
        }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -z-10"
      />

      {/* 21st.dev Section Header */}
      <SectionHeader
        number="04 / SHOWCASE"
        titlePrefix="Featured"
        highlightedText="Projects"
        emoji="✨"
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12 select-none">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${isSelected
                  ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)] border border-teal-400 font-bold"
                  : "bg-white text-slate-800 border border-slate-200/80 hover:border-teal-400 hover:text-teal-600 shadow-sm font-semibold"
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3D Carousel Perspective Stage */}
      <div
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => setIsAutoplayPaused(false)}
        className="relative w-full h-[460px] sm:h-[480px] md:h-[500px] flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d] select-none"
      >
        {filteredProjects.map((project, index) => {
          const offset = getWrappedOffset(index, activeIndex, total);
          const absOffset = Math.abs(offset);
          const isActive = index === activeIndex;

          const x = offset * xMultiplier;
          const z = -absOffset * zMultiplier;
          const rotateY = offset * rotateYMultiplier;
          const scale = 1 - absOffset * scaleFactor;
          const opacity = absOffset > 1.5 ? 0 : 1 - absOffset * 0.45;
          const zIndex = 10 - absOffset;

          const details = getProjectDetails(project.id, project.category);
          const IconComponent = details.icon;

          return (
            <motion.div
              key={project.id}
              ref={isActive ? activeCardRef : null}
              onMouseMove={isActive ? handleMouseMove : undefined}
              onMouseEnter={isActive ? () => setIsHovered(true) : undefined}
              onMouseLeave={isActive ? handleMouseLeave : undefined}
              onClick={!isActive ? () => setActiveIndex(index) : undefined}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsAutoplayPaused(true)}
              onDragEnd={(e, info) => {
                const threshold = 60;
                if (info.offset.x < -threshold) {
                  handleNext();
                } else if (info.offset.x > threshold) {
                  handlePrev();
                }
                setIsAutoplayPaused(false);
              }}
              animate={{
                x,
                z,
                rotateY,
                scale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 18,
              }}
              style={{
                zIndex,
                transformStyle: "preserve-3d",
                transform: isActive && isHovered
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
                  : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
                transition: isActive && isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`absolute w-[290px] sm:w-[380px] md:w-[480px] h-[340px] sm:h-[370px] md:h-[400px] rounded-[32px] glass-panel p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden group/card border border-white/10 ${isActive ? "cursor-grab active:cursor-grabbing hover:border-purple-accent/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "cursor-pointer opacity-40 hover:opacity-75"
                }`}
            >
              {/* Overlay Glass Blur and darkening for inactive cards */}
              {!isActive && (
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] rounded-[32px] z-20 transition-all duration-300 group-hover/card:bg-slate-950/20" />
              )}

              {/* Dynamic theme backdrop glow for cards */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${details.gradient} opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none z-0`}
              />

              {/* Holographic Vertical Scanline Sweep for active card */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-accent/60 to-transparent shadow-[0_0_8px_rgba(167,139,250,0.5)] animate-[scan_3.5s_linear_infinite] pointer-events-none z-10" />
              )}

              {/* Card Header */}
              <div className="flex justify-between items-center z-10" style={{ transform: "translateZ(20px)" }}>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-colors duration-300 ${details.accent}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  {project.category}
                </span>

                {/* GitHub and Live Link Actions */}
                <div className={`flex gap-2 transition-all duration-300 ${isActive ? "opacity-75 group-hover/card:opacity-100" : "opacity-0"}`}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                    aria-label={`View code for ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                    aria-label={`Launch live demo for ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card Main content */}
              <div className="my-auto text-left z-10" style={{ transform: "translateZ(40px)" }}>
                <span className="text-[10px] sm:text-xs font-mono text-white/40 block mb-1 uppercase tracking-widest font-semibold">
                  {project.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3.5xl font-extrabold tracking-tight text-white group-hover/card:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-3 sm:line-clamp-4">
                  {project.description}
                </p>
              </div>

              {/* Card Tech tags footer */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 z-10" style={{ transform: "translateZ(30px)" }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg text-white/60 group-hover/card:text-white/90 group-hover/card:border-white/10 transition-all duration-300"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modern Premium Navigation Controls */}
      <div className="flex flex-col items-center gap-6 mt-8 relative z-30">
        {/* Nav Buttons & Dots */}
        <div className="flex items-center gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-purple-accent/40 hover:bg-white/10 transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Glowing Indicator Dots */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-inner">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="relative h-2 rounded-full cursor-pointer focus:outline-none group/dot"
                style={{ width: index === activeIndex ? "24px" : "8px" }}
                aria-label={`Jump to project ${index + 1}`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${index === activeIndex
                      ? "bg-purple-accent shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                      : "bg-white/20 group-hover/dot:bg-white/40"
                    }`}
                />
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-purple-accent/40 hover:bg-white/10 transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Swipe Hint */}
        <span className="text-[9px] font-mono tracking-[0.3em] text-white/30 uppercase flex items-center gap-1">
          <Layers className="w-3 h-3 text-purple-accent" />
          Swipe or Drag to explore
        </span>
      </div>
    </section>
  );
}
