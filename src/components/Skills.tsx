/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SkillChart from "./SkillChart";
import TechLogo from "./TechLogo";
import SpotlightCard from "./SpotlightCard";
import {
  Code,
  Terminal,
  Database,
  BrainCircuit,
  Sparkles,
  Cpu,
  GitBranch,
  Layers,
  Smartphone,
  Clock,
  CheckSquare,
  HelpCircle,
  Info,
  Sliders,
  Eye,
  Orbit
} from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  borderGlow: string;
  skills: { name: string; level: string }[];
}

const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "text-purple-accent",
    borderGlow: "hover:border-purple-accent/40",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "Java", level: "Expert" },
      { name: "C++", level: "Intermediate" },
      { name: "PHP", level: "Intermediate" },
    ],
  },
  {
    title: "Frameworks & UI",
    icon: Terminal,
    color: "text-blue-accent",
    borderGlow: "hover:border-blue-accent/40",
    skills: [
      { name: "React.js", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Flask", level: "Intermediate" },
      { name: "MERN Stack", level: "Expert" },
    ],
  },
  {
    title: "Databases & Tools",
    icon: Database,
    color: "text-pink-accent",
    borderGlow: "hover:border-pink-accent/40",
    skills: [
      { name: "MongoDB", level: "Expert" },
      { name: "MySQL", level: "Expert" },
      { name: "SQLite", level: "Intermediate" },
      { name: "Git & GitHub", level: "Expert" },
      { name: "Android Studio", level: "Intermediate" },
      { name: "Figma / PowerBI", level: "Intermediate" },
    ],
  },
  {
    title: "AI, Data Science & Soft Skills",
    icon: BrainCircuit,
    color: "text-pink-accent",
    borderGlow: "hover:border-pink-accent/40",
    skills: [
      { name: "Machine Learning", level: "Expert" },
      { name: "NLP & GenAI", level: "Expert" },
      { name: "Data Analysis", level: "Expert" },
      { name: "Problem Solving", level: "Expert" },
      { name: "Time Management", level: "Expert" },
      { name: "Task Prioritization", level: "Expert" },
    ],
  },
];

interface SkillNode {
  name: string;
  category: "languages" | "frameworks" | "tools" | "ai-soft";
  level: "Expert" | "Intermediate";
  percent: number;
  x: number; // Desktop Left %
  y: number; // Desktop Top %
  mobileX: number; // Mobile Left %
  mobileY: number; // Mobile Top %
  size: number; // Node size multiplier
  icon: React.ComponentType<any>;
  description: string;
}

const galaxySkillsData: SkillNode[] = [
  // Programming Languages
  {
    name: "Python",
    category: "languages",
    level: "Expert",
    percent: 92,
    x: 42, y: 28,
    mobileX: 30, mobileY: 26,
    size: 1.15,
    icon: Code,
    description: "Primary language for building production ML pipelines, training NLP models, and scripting automated backends."
  },
  {
    name: "JavaScript",
    category: "languages",
    level: "Expert",
    percent: 92,
    x: 28, y: 18,
    mobileX: 18, mobileY: 14,
    size: 1.15,
    icon: Terminal,
    description: "Creating interactive, fast, client-side animations, UI events, and custom rendering engines."
  },
  {
    name: "Java",
    category: "languages",
    level: "Expert",
    percent: 92,
    x: 18, y: 26,
    mobileX: 10, mobileY: 34,
    size: 1.15,
    icon: Code,
    description: "Developing robust enterprise solutions, object-oriented APIs, and performant backend services."
  },
  {
    name: "C++",
    category: "languages",
    level: "Intermediate",
    percent: 75,
    x: 30, y: 36,
    mobileX: 12, mobileY: 24,
    size: 0.9,
    icon: Code,
    description: "High-performance programming, data structures, and algorithmic puzzle-solving with manual memory optimization."
  },
  {
    name: "PHP",
    category: "languages",
    level: "Intermediate",
    percent: 75,
    x: 15, y: 14,
    mobileX: 42, mobileY: 10,
    size: 0.9,
    icon: Code,
    description: "Server-side web scripting, dynamic templating, and legacy database integrations."
  },

  // Frameworks & UI
  {
    name: "React.js",
    category: "frameworks",
    level: "Expert",
    percent: 92,
    x: 58, y: 28,
    mobileX: 70, mobileY: 26,
    size: 1.15,
    icon: Layers,
    description: "Building clean, high-performance web user interfaces with state management, modular components, and smooth motion profiles."
  },
  {
    name: "Tailwind CSS",
    category: "frameworks",
    level: "Expert",
    percent: 92,
    x: 74, y: 18,
    mobileX: 82, mobileY: 14,
    size: 1.15,
    icon: Sparkles,
    description: "Crafting modern, highly responsive visual layouts, utility-first UI layers, and rapid style implementations."
  },
  {
    name: "Flask",
    category: "frameworks",
    level: "Intermediate",
    percent: 75,
    x: 66, y: 14,
    mobileX: 58, mobileY: 10,
    size: 0.9,
    icon: Terminal,
    description: "Lightweight Python microservices, RESTful API endpoints, and fast web service routing."
  },
  {
    name: "MERN Stack",
    category: "frameworks",
    level: "Expert",
    percent: 92,
    x: 40, y: 48,
    mobileX: 30, mobileY: 42,
    size: 1.15,
    icon: Database,
    description: "Full-stack development leveraging MongoDB, Express, React, and Node.js for scalable web applications."
  },

  // Databases & Tools
  {
    name: "MongoDB",
    category: "tools",
    level: "Expert",
    percent: 92,
    x: 24, y: 65,
    mobileX: 14, mobileY: 66,
    size: 1.15,
    icon: Database,
    description: "Designing flexible, schema-less document collections for fast query operations and high write-through volumes."
  },
  {
    name: "MySQL",
    category: "tools",
    level: "Expert",
    percent: 92,
    x: 34, y: 78,
    mobileX: 20, mobileY: 78,
    size: 1.15,
    icon: Database,
    description: "Structured relational database management, complex schema design, and optimized SQL join queries."
  },
  {
    name: "SQLite",
    category: "tools",
    level: "Intermediate",
    percent: 75,
    x: 16, y: 78,
    mobileX: 10, mobileY: 90,
    size: 0.9,
    icon: Database,
    description: "Lightweight local data storage, client-side databases, and embedded device state management."
  },
  {
    name: "Git & GitHub",
    category: "tools",
    level: "Expert",
    percent: 92,
    x: 32, y: 56,
    mobileX: 15, mobileY: 52,
    size: 1.15,
    icon: GitBranch,
    description: "Distributed version control, collaborative branch management, pull requests, and automated deployment actions."
  },
  {
    name: "Android Studio",
    category: "tools",
    level: "Intermediate",
    percent: 75,
    x: 14, y: 56,
    mobileX: 42, mobileY: 90,
    size: 0.9,
    icon: Smartphone,
    description: "Building native mobile applications with custom layouts, lifecycle controls, and API integrations."
  },
  {
    name: "Figma / PowerBI",
    category: "tools",
    level: "Intermediate",
    percent: 75,
    x: 84, y: 26,
    mobileX: 90, mobileY: 34,
    size: 0.9,
    icon: Sparkles,
    description: "Designing beautiful digital interfaces, user experience blueprints, and creating interactive business intelligence dashboards."
  },

  // AI & Soft Skills
  {
    name: "Machine Learning",
    category: "ai-soft",
    level: "Expert",
    percent: 92,
    x: 76, y: 65,
    mobileX: 86, mobileY: 66,
    size: 1.15,
    icon: Cpu,
    description: "Feature engineering, selecting neural networks, model training, evaluation, and deployment optimization."
  },
  {
    name: "NLP & GenAI",
    category: "ai-soft",
    level: "Expert",
    percent: 92,
    x: 60, y: 48,
    mobileX: 70, mobileY: 42,
    size: 1.15,
    icon: BrainCircuit,
    description: "Developing applications with Large Language Models (LLMs), prompt engineering, text embeddings, and semantic search."
  },
  {
    name: "Data Analysis",
    category: "ai-soft",
    level: "Expert",
    percent: 92,
    x: 66, y: 78,
    mobileX: 80, mobileY: 78,
    size: 1.15,
    icon: Cpu,
    description: "Statistical research, cleaning raw datasets, identifying trends, and presenting diagnostic metrics."
  },
  {
    name: "Problem Solving",
    category: "ai-soft",
    level: "Expert",
    percent: 92,
    x: 84, y: 56,
    mobileX: 85, mobileY: 52,
    size: 1.15,
    icon: HelpCircle,
    description: "Deconstructing complex logical challenges, designing efficient algorithms, and debugging core system logic."
  },
  {
    name: "Time Management",
    category: "ai-soft",
    level: "Expert",
    percent: 92,
    x: 82, y: 78,
    mobileX: 90, mobileY: 90,
    size: 1.15,
    icon: Clock,
    description: "Punctual project delivery, organizing sprints, and balancing multi-threaded workstreams."
  },
  {
    name: "Task Prioritization",
    category: "ai-soft",
    level: "Expert",
    percent: 92,
    x: 68, y: 56,
    mobileX: 58, mobileY: 90,
    size: 1.15,
    icon: CheckSquare,
    description: "Agile task sorting, maximizing team efficiency, and critical-path milestone planning."
  }
];

const categoryConfig = {
  all: {
    label: "All Universe",
    color: "text-white dark:text-white light:text-slate-800",
    borderGlow: "border-white/10 dark:border-white/10 light:border-slate-200",
    bg: "bg-white/5 dark:bg-white/5 light:bg-slate-100",
    glowColor: "rgba(20, 184, 166, 0.05)",
  },
  languages: {
    label: "Programming Languages",
    icon: Code,
    color: "text-purple-accent",
    borderGlow: "border-purple-accent/20",
    bg: "bg-purple-accent/10",
    glowColor: "rgba(20, 184, 166, 0.15)",
  },
  frameworks: {
    label: "Frameworks & UI",
    icon: Terminal,
    color: "text-blue-accent",
    borderGlow: "border-blue-accent/20",
    bg: "bg-blue-accent/10",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  tools: {
    label: "Databases & Tools",
    icon: Database,
    color: "text-pink-accent",
    borderGlow: "border-pink-accent/20",
    bg: "bg-pink-accent/10",
    glowColor: "rgba(56, 189, 248, 0.15)",
  },
  "ai-soft": {
    label: "AI, Data Science & Soft Skills",
    icon: BrainCircuit,
    color: "text-pink-accent",
    borderGlow: "border-pink-accent/20",
    bg: "bg-pink-accent/10",
    glowColor: "rgba(45, 212, 191, 0.15)",
  }
};

export default function Skills() {
  const [viewMode, setViewMode] = useState<"galaxy" | "grid">("grid");
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryConfig | "all">("all");
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [clickedNode, setClickedNode] = useState<SkillNode | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const overallPercentages = [92, 88, 85, 94];

  const getLevelPercent = (level: string) => {
    if (level === "Expert") return 92;
    return 75;
  };

  const isMobile = windowWidth < 640;

  // Parallax Tilt Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Subtle 5 degrees tilt limit
    const rotateX = -(mouseY / (height / 2)) * 5;
    const rotateY = (mouseX / (width / 2)) * 5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const activeNodeInfo = hoveredNode || clickedNode || null;

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative overflow-hidden"
    >
      {/* Ambient background glow responding to selected category or node */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${activeNodeInfo
              ? categoryConfig[activeNodeInfo.category].glowColor
              : activeCategory !== "all"
                ? categoryConfig[activeCategory].glowColor
                : "rgba(139, 92, 246, 0.04)"
            } 0%, transparent 70%)`
        }}
        transition={{ duration: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* Header Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
      >
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-mono tracking-[0.3em] text-purple-accent uppercase mb-2">
            03 / EXPERTISE
          </span>
          <h2 className="text-4xl md:text-6xl text-white font-medium flex items-center gap-3">
            <span className="text-3xl md:text-5xl animate-pulse">✨</span>
            My Skills{" "}
            <span className="text-3xl md:text-5xl animate-pulse">✨</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-accent mt-4" />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === "galaxy" ? (
          /* ============================================================== */
          /* INTERACTIVE GALAXY VIEW                                         */
          /* ============================================================== */
          <motion.div
            key="galaxy-view"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-start items-center relative z-20">
              {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((key) => {
                const config = categoryConfig[key];
                const isActive = activeCategory === key;
                const IconComponent = (config as any).icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      setClickedNode(null); // Clear selected node on category change
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-mono font-medium border transition-all cursor-pointer ${isActive
                        ? `${config.color} ${config.borderGlow} ${config.bg} shadow-md backdrop-blur-md`
                        : "border-white/5 bg-white/[0.02] text-white/40 hover:text-white/80 hover:border-white/10"
                      }`}
                  >
                    {key !== "all" && IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Universe Canvas */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setClickedNode(null)}
              className="relative w-full h-[520px] sm:h-[650px] rounded-[36px] border border-slate-200/20 dark:border-white/10 overflow-hidden bg-slate-900/40 dark:bg-slate-950/50 light:bg-slate-100/60 backdrop-blur-md shadow-2xl flex flex-col justify-between p-6 sm:p-8 select-none [perspective:1200px]"
            >
              {/* Starry deep space dust particles background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.15, 0.5, 0.15],
                      scale: [0.8, 1.2, 0.8],
                      y: [0, Math.sin(i) * 15, 0]
                    }}
                    transition={{
                      duration: 5 + (i % 3) * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4
                    }}
                    style={{
                      left: `${(i * 7) % 95 + 2}%`,
                      top: `${(i * 13) % 90 + 5}%`,
                    }}
                    className={`absolute w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${i % 4 === 0
                        ? "bg-purple-accent shadow-[0_0_6px_rgba(236,72,153,0.6)]"
                        : i % 4 === 1
                          ? "bg-blue-accent shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                          : i % 4 === 2
                            ? "bg-pink-accent shadow-[0_0_6px_rgba(251,113,133,0.6)]"
                            : "bg-pink-300 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                      }`}
                  />
                ))}
              </div>

              {/* Sci-fi Coordinate HUD grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:35px_35px] pointer-events-none z-0" />

              {/* 3D Parallax Perspective Stage */}
              <motion.div
                animate={{
                  rotateX: tilt.x,
                  rotateY: tilt.y
                }}
                transition={{ type: "spring", stiffness: 90, damping: 22 }}
                style={{ transformStyle: "preserve-3d" }}
                className="absolute inset-0 z-10 w-full h-full"
              >
                {galaxySkillsData.map((node) => {
                  const nodeConfig = categoryConfig[node.category];
                  const Icon = node.icon;

                  // Category active filtering logic
                  const isDimmed = activeCategory !== "all" && node.category !== activeCategory;
                  const isHighlighted = activeCategory !== "all" && node.category === activeCategory;
                  const isSelected = clickedNode?.name === node.name;

                  // Staggered float drift variables
                  const floatSeedX = Math.sin(node.name.charCodeAt(0)) * 6;
                  const floatSeedY = Math.cos(node.name.charCodeAt(1)) * 6;
                  const durationSeed = 4 + (node.name.length % 4) * 1.5;

                  return (
                    <motion.div
                      key={node.name}
                      drag
                      dragConstraints={containerRef}
                      dragElastic={0.12}
                      dragMomentum={true}
                      initial={{
                        opacity: 0,
                        scale: 0.4,
                        z: -200
                      }}
                      animate={{
                        opacity: isDimmed ? 0.15 : 1,
                        scale: isDimmed ? 0.8 : isSelected ? 1.15 : isHighlighted ? 1.08 : 1,
                        left: isMobile ? `${node.mobileX}%` : `${node.x}%`,
                        top: isMobile ? `${node.mobileY}%` : `${node.y}%`,
                        x: [0, floatSeedX, 0],
                        y: [0, floatSeedY, 0],
                        z: isDimmed ? 0 : node.level === "Expert" ? 45 : 20,
                      }}
                      transition={{
                        opacity: { duration: 0.4 },
                        scale: { type: "spring", stiffness: 120, damping: 15 },
                        left: { duration: 0.8, ease: "easeOut" },
                        top: { duration: 0.8, ease: "easeOut" },
                        // Floating drift looped
                        x: { duration: durationSeed, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                        y: { duration: durationSeed + 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        pointerEvents: isDimmed ? "none" : "auto"
                      }}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setClickedNode(clickedNode?.name === node.name ? null : node);
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border text-center font-sans transition-shadow duration-300 ${node.level === "Expert"
                          ? "w-20 h-20 sm:w-28 sm:h-28"
                          : "w-18 h-18 sm:w-24 sm:h-24"
                        } ${isSelected
                          ? `${nodeConfig.bg} ${nodeConfig.borderGlow} ${nodeConfig.color} shadow-[0_0_24px_rgba(139,92,246,0.35)] ring-2 ring-purple-accent/40`
                          : isDimmed
                            ? "bg-slate-950/20 border-white/5 text-white/20 shadow-none"
                            : `${nodeConfig.bg} border-white/10 ${nodeConfig.color} shadow-lg hover:border-purple-accent/30 hover:shadow-[0_0_15px_rgba(167,139,250,0.2)]`
                        }`}
                    >
                      {/* Holographic scanning vertical swipe inside bubbles */}
                      {!isDimmed && (
                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-0 hover:opacity-100 group-hover:opacity-100">
                          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[scan_3s_linear_infinite]" />
                        </div>
                      )}

                      {/* Bubble Content */}
                      <div className="flex flex-col items-center justify-center p-2 pointer-events-none select-none">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-1.5 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-[10px] sm:text-xs font-black tracking-tight leading-tight text-white block">
                          {node.name}
                        </span>
                        <span className="text-[8px] font-mono tracking-wider font-semibold text-white/40 block mt-0.5">
                          {node.level}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* ─── D3 / Diagnostics Realtime Interactive Inspector Overlay ─── */}
              <AnimatePresence>
                {clickedNode && (
                  <motion.div
                    initial={{ x: "110%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "110%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 bottom-4 w-full max-w-[340px] sm:max-w-[400px] z-30 rounded-[28px] glass-panel border border-teal-500/20 p-5 flex flex-col justify-start gap-4 shadow-2xl shadow-teal-500/10 backdrop-blur-xl overflow-y-auto"
                  >
                    {/* Close button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setClickedNode(null);
                      }}
                      className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/30 text-white hover:scale-105 transition-all cursor-pointer"
                      aria-label="Close Diagnostics"
                    >
                      <span className="text-xs font-mono">✕</span>
                    </button>

                    {/* Chart & Ecosystem Data */}
                    <div className="flex-1 mt-3 flex flex-col gap-4">
                      <div>
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${categoryConfig[clickedNode.category].color} ${categoryConfig[clickedNode.category].borderGlow} ${categoryConfig[clickedNode.category].bg}`}>
                          {categoryConfig[clickedNode.category].label}
                        </span>
                        <h4 className="text-2xl font-black text-white tracking-tight mt-2 flex items-baseline gap-1.5">
                          {clickedNode.name}
                        </h4>
                        <p className="text-xs text-white/60 leading-relaxed font-sans mt-1.5">
                          {clickedNode.description}
                        </p>
                      </div>

                      <SkillChart
                        skillName={clickedNode.name}
                        category={clickedNode.category}
                        percent={clickedNode.percent}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* HUD Control Labels */}
              <div className="flex justify-between items-start relative z-20 pointer-events-none w-full text-[9px] font-mono text-white/20 tracking-wider">
                <div className="flex flex-col gap-1">
                  <span>COORDINATES GRID // 3D STAGE</span>
                  <span>DRAG TO FLICK // HOVER TO PROBE</span>
                </div>
                <div className="text-right flex flex-col gap-1">
                  <span>UNIVERSE SCALE: 1.0</span>
                  <span>SYSTEM // ONLINE</span>
                </div>
              </div>

              {/* Dynamic Bottom telemetry Telemetry HUD Card */}
              <div className="relative z-20 w-full bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                <AnimatePresence mode="wait">
                  {activeNodeInfo ? (
                    <motion.div
                      key={activeNodeInfo.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 text-left"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${categoryConfig[activeNodeInfo.category].color} ${categoryConfig[activeNodeInfo.category].borderGlow} ${categoryConfig[activeNodeInfo.category].bg}`}>
                          {categoryConfig[activeNodeInfo.category].label}
                        </span>
                        <h4 className="text-sm font-extrabold text-white tracking-tight">
                          {activeNodeInfo.name}
                        </h4>
                        <span className="text-[10px] font-mono text-white/40">
                          // Depth Telemetry: {activeNodeInfo.percent}% ({activeNodeInfo.level})
                        </span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed font-sans line-clamp-2">
                        {activeNodeInfo.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-hud"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 text-left flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-purple-accent/60 animate-pulse">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          COSMIC INTERFACE DISSECTOR
                        </h4>
                        <p className="text-[11px] text-white/30 font-mono mt-0.5 tracking-wide">
                          Click or Hover over any planetary skill bubble to analyze system telemetry and practical use-cases.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mini Dial Gauge or visual widget inside HUD */}
                <div className="hidden md:flex items-center gap-3 border-l border-white/10 pl-4 shrink-0">
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] font-mono text-white/30 uppercase leading-none">Overall Expert Index</span>
                    <span className="text-xl font-bold font-sans tracking-tight text-white mt-1">92.2%</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-purple-accent/20 bg-purple-accent/5 flex items-center justify-center text-purple-accent animate-spin-slow">
                    <Orbit className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* ORIGINAL GRID VIEW                                             */
          /* ============================================================== */
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skillsData.map((category, catIndex) => {
              const Icon = category.icon;
              const targetPercent = overallPercentages[catIndex];
              const strokeDasharray = 2 * Math.PI * 18; // ~113.1

              return (
                <SpotlightCard
                  key={category.title}
                  spotlightColor="rgba(236, 72, 153, 0.05)"
                  borderColor="rgba(236, 72, 153, 0.25)"
                  className="p-6 sm:p-8 flex flex-col justify-between"
                >
                  {/* Corner matrix effect */}
                  <div className="absolute right-0 top-0 w-20 h-20 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />

                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all duration-300">
                          <Icon className={`w-5 h-5 ${category.color} group-hover:rotate-[10deg] transition-transform duration-300`} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                            {category.title}
                          </h3>
                          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                            CATEGORY 0{catIndex + 1}
                          </span>
                        </div>
                      </div>

                      {/* Circular skill indicator */}
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="18"
                            className="stroke-white/5 fill-none"
                            strokeWidth="2.5"
                          />
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="18"
                            className="stroke-purple-accent fill-none"
                            strokeWidth="2.5"
                            strokeDasharray={strokeDasharray}
                            initial={{ strokeDashoffset: strokeDasharray }}
                            whileInView={{ strokeDashoffset: strokeDasharray - (strokeDasharray * targetPercent) / 100 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                          />
                        </svg>
                        <span className="absolute text-[9px] font-mono font-bold text-white/80">
                          {targetPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Smooth Filling Linear Skill Progress Bars */}
                    <div className="space-y-5">
                      {category.skills.map((skill, skillIndex) => {
                        const percent = getLevelPercent(skill.level);
                        return (
                          <div key={skill.name} className="flex flex-col gap-1.5 text-left group/line cursor-pointer">
                            <div className="flex justify-between items-baseline">
                              <span className="text-sm font-semibold tracking-wide text-white/90 group-hover/line:text-purple-accent transition-colors flex items-center gap-2">
                                <TechLogo name={skill.name} className="w-4 h-4 flex-shrink-0" />
                                {skill.name}
                              </span>
                              <span className="text-[10px] font-mono text-white/40 group-hover/line:text-white/80 transition-colors">
                                {skill.level} ({percent}%)
                              </span>
                            </div>
                            <div className="w-full h-[5px] bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percent}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: skillIndex * 0.08 }}
                                className="h-full bg-gradient-accent rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status footer for each module */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-white/30">
                    <span>Verified Competency</span>
                    <span>Updated 2026</span>
                  </div>
                </SpotlightCard>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
