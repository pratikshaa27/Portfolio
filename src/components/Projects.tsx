/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  BrainCircuit,
  Globe,
  Sparkles,
  Shield,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Maximize2,
} from "lucide-react";
import { ProjectItem } from "../types";
import { SectionHeader } from "./ScrollReveal";
import SpotlightCard from "./SpotlightCard";
import ProjectModal from "./ui/ProjectModal";

const projectsData: ProjectItem[] = [
  {
    id: "proj_4",
    title: "NeuroAI",
    subtitle: "EEG Based ASD Intelligence Platform",
    description:
      "An intelligent healthcare solution designed to support Autism Spectrum Disorder (ASD) analysis using EEG brain signal data. Combines Deep Learning and custom ML architectures to analyze emotional patterns, evaluate cognitive states, and predict therapy response effectiveness.",
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
    description:
      "Developed a robust mobile application to streamline Olivia's supply chain. Enables beauty parlours to place orders, tracks live deliveries, allows distributors to manage warehouse inventories, and provides administrators with real-time sales insights and analytic reports.",
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
    description:
      "Developed an adaptive productivity platform featuring structured learning roadmaps, integrated chatbot, and mental well-being trackers. Combines gamified challenges, rewards, and public speaking modules driven by behavioral analytics.",
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
    description:
      "Built a privacy-focused security tool leveraging NLP and machine learning algorithms to redact, anonymize, and obfuscate sensitive personal identifiers from documents across multiple formats, maintaining strict data compliance.",
    techStack: ["Machine Learning", "PyQt", "React.js", "NLP", "Python"],
    githubUrl: "https://github.com/pratikshaa27",
    liveUrl: "https://github.com/pratikshaa27",
    size: "normal",
    category: "AI & ML",
  },
];

const getProjectDetails = (id: string, category: string, isLight: boolean) => {
  switch (id) {
    case "proj_4":
      return {
        icon: BrainCircuit,
        accent: isLight
          ? "text-teal-700 border-teal-300 bg-teal-50"
          : "text-cyan-300 border-cyan-500/25 bg-cyan-500/10",
        glowColor: isLight ? "rgba(13, 148, 136, 0.1)" : "rgba(6, 182, 212, 0.18)",
        gradient: isLight
          ? "from-teal-50 via-cyan-50 to-white"
          : "from-cyan-500/10 via-teal-500/5 to-purple-500/10",
      };
    case "proj_1":
      return {
        icon: Globe,
        accent: isLight
          ? "text-sky-700 border-sky-300 bg-sky-50"
          : "text-teal-300 border-teal-400/25 bg-teal-400/10",
        glowColor: isLight ? "rgba(2, 132, 199, 0.1)" : "rgba(20, 184, 166, 0.18)",
        gradient: isLight
          ? "from-sky-50 via-teal-50 to-white"
          : "from-teal-500/10 via-cyan-500/5 to-sky-400/10",
      };
    case "proj_2":
      return {
        icon: Sparkles,
        accent: isLight
          ? "text-purple-700 border-purple-300 bg-purple-50"
          : "text-purple-300 border-purple-500/25 bg-purple-500/10",
        glowColor: isLight ? "rgba(147, 51, 234, 0.1)" : "rgba(168, 85, 247, 0.18)",
        gradient: isLight
          ? "from-purple-50 via-pink-50 to-white"
          : "from-purple-500/10 via-cyan-500/5 to-pink-500/10",
      };
    case "proj_3":
    default:
      return {
        icon: Shield,
        accent: isLight
          ? "text-cyan-700 border-cyan-300 bg-cyan-50"
          : "text-sky-300 border-sky-400/25 bg-sky-400/10",
        glowColor: isLight ? "rgba(8, 145, 178, 0.1)" : "rgba(56, 189, 248, 0.18)",
        gradient: isLight
          ? "from-cyan-50 via-blue-50 to-white"
          : "from-sky-500/10 via-teal-500/5 to-cyan-400/10",
      };
  }
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"bento" | "carousel">("bento");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isLight, setIsLight] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const categories = ["All", "AI & ML", "Mobile Dev"];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = filteredProjects.length;

  // Auto-rotation for carousel
  useEffect(() => {
    if (viewMode !== "carousel" || isAutoplayPaused || isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => clearInterval(interval);
  }, [viewMode, isAutoplayPaused, isHovered, total]);

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

  // 3D Carousel spacing
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const xMultiplier = isMobile ? 120 : isTablet ? 240 : 360;
  const zMultiplier = isMobile ? 80 : isTablet ? 120 : 180;
  const rotateYMultiplier = isMobile ? -25 : isTablet ? -35 : -40;
  const scaleFactor = isMobile ? 0.22 : isTablet ? 0.16 : 0.12;

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];
  const activeDetails = getProjectDetails(
    activeProject?.id || "proj_4",
    activeProject?.category || "AI & ML",
    isLight
  );

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
      {/* Dynamic atmospheric ambient background glow */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${activeDetails.glowColor} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* 21st.dev Section Header */}
      <SectionHeader
        number="04 / SHOWCASE"
        titlePrefix="Featured"
        highlightedText="Projects"
        emoji="✨"
      />

      {/* Control Bar: Category Filters + View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        {/* Sliding Category Filter Pills */}
        <div
          className={`flex flex-wrap items-center gap-2 p-1 rounded-full border backdrop-blur-md ${
            isLight ? "bg-slate-100/90 border-slate-200 shadow-sm" : "bg-white/[0.04] border-white/10"
          }`}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveIndex(0);
                }}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                  isSelected
                    ? isLight
                      ? "text-white font-bold"
                      : "text-white font-bold"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {isSelected && (
                  <motion.div
                    layoutId="projectActiveFilter"
                    className={`absolute inset-0 rounded-full shadow-sm -z-0 ${
                      isLight
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 shadow-teal-500/25"
                        : "bg-gradient-to-r from-cyan-500/30 via-teal-500/30 to-purple-500/30 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* View Switcher: Bento Grid vs 3D Carousel */}
        <div
          className={`flex items-center gap-1.5 p-1 rounded-full border backdrop-blur-md ${
            isLight ? "bg-slate-100/90 border-slate-200 shadow-sm" : "bg-white/[0.04] border-white/10"
          }`}
        >
          <button
            onClick={() => setViewMode("bento")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              viewMode === "bento"
                ? isLight
                  ? "bg-white text-teal-700 font-bold shadow-sm"
                  : "bg-white/15 text-cyan-300 font-semibold shadow-inner"
                : isLight
                ? "text-slate-600 hover:text-slate-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Bento Grid</span>
          </button>
          <button
            onClick={() => setViewMode("carousel")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              viewMode === "carousel"
                ? isLight
                  ? "bg-white text-teal-700 font-bold shadow-sm"
                  : "bg-white/15 text-cyan-300 font-semibold shadow-inner"
                : isLight
                ? "text-slate-600 hover:text-slate-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Carousel</span>
          </button>
        </div>
      </div>

      {/* ─── VIEW 1: 21st.dev Style BENTO GRID ─── */}
      {viewMode === "bento" ? (
        <motion.div
          key="bento-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, idx) => {
            const details = getProjectDetails(project.id, project.category, isLight);
            const IconComponent = details.icon;
            const isFeatured = project.size === "large" || idx === 0;

            return (
              <SpotlightCard
                key={project.id}
                spotlightColor={details.glowColor}
                borderColor={isLight ? "rgba(13, 148, 136, 0.3)" : "rgba(6, 182, 212, 0.4)"}
                tilt={true}
                onClick={() => setSelectedProject(project)}
                className={`p-6 sm:p-8 flex flex-col justify-between cursor-pointer border transition-all duration-300 group glass-panel glass-panel-hover ${
                  isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                } ${
                  isLight
                    ? "hover:border-teal-400/60"
                    : "hover:border-cyan-400/50"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border flex items-center gap-1.5 ${details.accent}`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      {project.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isLight
                            ? "bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 border-slate-200"
                            : "bg-white/5 hover:bg-cyan-500/15 text-gray-400 hover:text-cyan-300 border-white/5"
                        }`}
                        title="View Full Architecture"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isLight
                              ? "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200"
                              : "bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border-white/5"
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isLight
                              ? "bg-slate-100 hover:bg-teal-50 text-teal-700 border-slate-200"
                              : "bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-300 border-white/5"
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`text-xl sm:text-2xl font-black transition-colors tracking-tight mb-1 ${
                      isLight
                        ? "text-slate-900 group-hover:text-teal-700"
                        : "text-white group-hover:text-cyan-300"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-xs font-mono mb-3 ${
                      isLight ? "text-teal-600 font-semibold" : "text-cyan-400/80"
                    }`}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 ${
                      isLight ? "text-slate-600" : "text-gray-300"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div
                  className={`pt-4 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isLight ? "border-slate-200/80" : "border-white/10"
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-colors ${
                          isLight
                            ? "bg-slate-100 border-slate-200 text-slate-700 group-hover:border-teal-300 group-hover:text-teal-800"
                            : "bg-white/5 border-white/5 text-gray-300 group-hover:border-cyan-500/20 group-hover:text-cyan-200"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`text-[11px] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 ${
                      isLight ? "text-teal-600" : "text-cyan-400"
                    }`}
                  >
                    Explore &rarr;
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </motion.div>
      ) : (
        /* ─── VIEW 2: 3D CAROUSEL PERSPECTIVE STAGE ─── */
        <div className="relative w-full">
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

              const details = getProjectDetails(project.id, project.category, isLight);
              const IconComponent = details.icon;

              return (
                <motion.div
                  key={project.id}
                  ref={isActive ? activeCardRef : null}
                  onMouseMove={isActive ? handleMouseMove : undefined}
                  onMouseEnter={isActive ? () => setIsHovered(true) : undefined}
                  onMouseLeave={isActive ? handleMouseLeave : undefined}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProject(project);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
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
                    transform:
                      isActive && isHovered
                        ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
                        : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
                    transition:
                      isActive && isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className={`absolute w-[290px] sm:w-[380px] md:w-[480px] h-[340px] sm:h-[370px] md:h-[400px] rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden group/card border transition-all duration-300 glass-panel ${
                    isLight
                      ? isActive
                        ? "border-teal-500/40 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.12)] cursor-grab"
                        : "border-slate-200 text-slate-700 cursor-pointer opacity-50 hover:opacity-80"
                      : isActive
                      ? "border-cyan-400/40 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-grab"
                      : "border-white/10 text-white cursor-pointer opacity-40 hover:opacity-75"
                  }`}
                >
                  {!isActive && (
                    <div
                      className={`absolute inset-0 rounded-[32px] z-20 transition-all duration-300 ${
                        isLight ? "bg-slate-200/30" : "bg-slate-950/40 backdrop-blur-[1px]"
                      }`}
                    />
                  )}

                  <div
                    className={`flex justify-between items-center z-10`}
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <span
                      className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-colors duration-300 ${details.accent}`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      {project.category}
                    </span>

                    <div
                      className={`flex gap-2 transition-all duration-300 ${
                        isActive ? "opacity-90 group-hover/card:opacity-100" : "opacity-0"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className={`p-2 rounded-xl border transition-all active:scale-90 ${
                          isLight
                            ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400/40 hover:text-white"
                        }`}
                        title="View Architecture"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-2 rounded-xl border transition-all active:scale-90 ${
                          isLight
                            ? "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900"
                            : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-2 rounded-xl border transition-all active:scale-90 ${
                          isLight
                            ? "bg-slate-100 border-slate-200 text-teal-700 hover:bg-teal-50"
                            : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div
                    className="my-auto text-left z-10"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <span
                      className={`text-[10px] sm:text-xs font-mono block mb-1 uppercase tracking-widest font-semibold ${
                        isLight ? "text-teal-600" : "text-cyan-400/80"
                      }`}
                    >
                      {project.subtitle}
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight transition-all duration-300 ${
                        isLight ? "text-slate-900" : "text-white group-hover/card:text-cyan-300"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mt-3 text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                        isLight ? "text-slate-600" : "text-gray-300"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div
                    className={`flex flex-wrap gap-1.5 pt-4 border-t z-10 ${
                      isLight ? "border-slate-200" : "border-white/10"
                    }`}
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-lg border transition-all ${
                          isLight
                            ? "bg-slate-100 border-slate-200 text-slate-700"
                            : "bg-white/5 border-white/5 text-gray-300"
                        }`}
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-md ${
                isLight
                  ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                  : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10"
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? isLight
                        ? "w-7 bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                        : "w-7 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                      : isLight
                      ? "w-2 bg-slate-300 hover:bg-slate-400"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-md ${
                isLight
                  ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                  : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10"
              }`}
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
