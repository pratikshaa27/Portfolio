/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

interface SkillChartProps {
  skillName: string;
  category: string;
  percent: number;
}

interface DataPoint {
  year: number;
  value: number;
}

// Generate unique ecosystems based on the selected skill
const getEcosystem = (skill: string): string[] => {
  const normalized = skill.toLowerCase();
  if (normalized.includes("python")) {
    return ["Machine Learning", "NLP & GenAI", "Flask", "Data Analysis", "MySQL"];
  }
  if (normalized.includes("react") || normalized.includes("mern")) {
    return ["JavaScript", "Tailwind CSS", "MongoDB", "Node.js", "Express.js"];
  }
  if (normalized.includes("javascript")) {
    return ["React.js", "MERN Stack", "Tailwind CSS", "Git & GitHub", "Figma"];
  }
  if (normalized.includes("tailwind")) {
    return ["React.js", "Figma / PowerBI", "JavaScript", "MERN Stack"];
  }
  if (normalized.includes("mongo") || normalized.includes("mysql") || normalized.includes("sqlite")) {
    return ["MERN Stack", "Python", "React.js", "Java", "Git & GitHub"];
  }
  if (normalized.includes("machine") || normalized.includes("nlp") || normalized.includes("data analysis")) {
    return ["Python", "PowerBI", "MySQL", "Problem Solving", "Flask"];
  }
  if (normalized.includes("java") || normalized.includes("c++")) {
    return ["Android Studio", "MySQL", "Git & GitHub", "Problem Solving"];
  }
  return ["Git & GitHub", "Task Prioritization", "Problem Solving", "Time Management"];
};

export default function SkillChart({ skillName, category, percent }: SkillChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [dimensions, setDimensions] = useState({ width: 340, height: 160 });

  // Generate dynamic path data based on skill level and name
  const chartData = useMemo<DataPoint[]>(() => {
    const seed = skillName.charCodeAt(0) + skillName.charCodeAt(skillName.length - 1);
    const startValue = 15 + (seed % 25); // Starts between 15% and 40%
    const midpointValue = Math.min(percent - 10, startValue + 20 + (seed % 20));

    return [
      { year: 2022, value: startValue },
      { year: 2023, value: Math.min(percent - 15, Math.round(startValue * 1.4)) },
      { year: 2024, value: midpointValue },
      { year: 2025, value: Math.min(percent - 5, Math.round(midpointValue * 1.2)) },
      { year: 2026, value: percent },
    ];
  }, [skillName, percent]);

  const ecosystem = useMemo(() => getEcosystem(skillName), [skillName]);

  // Handle ResizeObserver to make SVG fully responsive
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const parent = svgEl.parentElement;
    if (!parent) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Restrict dimensions for aesthetic fit
        setDimensions({
          width: Math.max(280, Math.min(width, 420)),
          height: 140,
        });
      }
    });

    resizeObserver.observe(parent);
    return () => resizeObserver.disconnect();
  }, []);

  // Compute D3 paths and scales
  const { linePath, areaPath, points } = useMemo(() => {
    const { width, height } = dimensions;
    const margin = { top: 15, right: 15, bottom: 25, left: 25 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([2022, 2026])
      .range([margin.left, margin.left + innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([margin.top + innerHeight, margin.top]);

    // Line generator
    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Area generator for smooth translucent gradient overlay
    const areaGenerator = d3
      .area<DataPoint>()
      .x((d) => xScale(d.year))
      .y1((d) => yScale(d.value))
      .y0(margin.top + innerHeight)
      .curve(d3.curveMonotoneX);

    const generatedLine = lineGenerator(chartData) || "";
    const generatedArea = areaGenerator(chartData) || "";

    const mappedPoints = chartData.map((d) => ({
      ...d,
      cx: xScale(d.year),
      cy: yScale(d.value),
    }));

    return {
      linePath: generatedLine,
      areaPath: generatedArea,
      points: mappedPoints,
    };
  }, [chartData, dimensions]);

  return (
    <div className="flex flex-col gap-5 text-left w-full h-full">
      {/* Diagnostics Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
          <span className="text-[10px] font-mono tracking-widest text-teal-400 font-extrabold uppercase">
            SYSTEM TELEMETRY DIAGNOSTIC
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
          <Activity className="w-3.5 h-3.5 text-teal-400" />
          <span>REALTIME FEED</span>
        </div>
      </div>

      {/* D3 Graphical Node View */}
      <div className="relative rounded-2xl bg-black/40 border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="text-left">
            <h5 className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Proficiency Level</h5>
            <span className="text-xl font-black font-sans text-white tracking-tight flex items-baseline gap-1">
              {percent}% <span className="text-xs font-mono font-medium text-teal-400">// {percent >= 90 ? "Expert" : "Intermediate"}</span>
            </span>
          </div>

          {hoveredPoint && (
            <div className="text-right text-[10px] font-mono bg-teal-500/10 border border-teal-500/25 px-2.5 py-1 rounded-lg">
              <span className="text-white font-bold">{hoveredPoint.year}</span>: <span className="text-teal-400 font-extrabold">{hoveredPoint.value}%</span>
            </div>
          )}
        </div>

        {/* SVG Canvas Area */}
        <div className="w-full h-[140px] flex items-center justify-center relative">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            className="overflow-visible"
          >
            <defs>
              {/* Premium teal & cyan glowing line gradient */}
              <linearGradient id="chart-glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Translucent fill gradient */}
              <linearGradient id="area-fill-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.0" />
              </linearGradient>

              {/* Drop Shadow filter for point highlights */}
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Grid Line Accents */}
            <g opacity="0.12" stroke="#FFFFFF" strokeWidth="1">
              <line x1="25" y1="15" x2={dimensions.width - 15} y2="15" strokeDasharray="3" />
              <line x1="25" y1="65" x2={dimensions.width - 15} y2="65" strokeDasharray="3" />
              <line x1="25" y1="115" x2={dimensions.width - 15} y2="115" strokeDasharray="3" />
            </g>

            {/* D3 Smooth Paths */}
            <path d={areaPath} fill="url(#area-fill-gradient)" />
            <path
              d={linePath}
              fill="none"
              stroke="url(#chart-glow-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]"
            />

            {/* Interactive Grid Dots */}
            {points.map((p) => {
              const isHovered = hoveredPoint?.year === p.year;
              return (
                <g key={p.year}>
                  {/* Invisible pointer catcher bubble */}
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r="14"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />

                  {/* Pulsing glow outer ring */}
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r={isHovered ? 7.5 : 5}
                    fill="none"
                    stroke={isHovered ? "#38BDF8" : "#14B8A6"}
                    strokeWidth={isHovered ? 3 : 1.5}
                    className="transition-all duration-200 pointer-events-none"
                    style={{ filter: isHovered ? "url(#neon-glow)" : "none" }}
                  />

                  {/* Solid inner core dot */}
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r="2.5"
                    fill="#FFFFFF"
                    className="pointer-events-none"
                  />
                </g>
              );
            })}

            {/* Bottom Year Labels */}
            <g fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">
              <text x={points[0]?.cx || 25} y={dimensions.height - 4}>22</text>
              <text x={points[1]?.cx || 100} y={dimensions.height - 4}>23</text>
              <text x={points[2]?.cx || 175} y={dimensions.height - 4}>24</text>
              <text x={points[3]?.cx || 250} y={dimensions.height - 4}>25</text>
              <text x={points[4]?.cx || 325} y={dimensions.height - 4}>26</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Tech Ecosystem Hub */}
      <div>
        <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-teal-400" />
          RELATED TECH ECOSYSTEMS
        </h5>
        <div className="flex flex-wrap gap-1.5">
          {ecosystem.map((tech) => (
            <span
              key={tech}
              className="text-[9.5px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20 hover:border-teal-500/35 px-2.5 py-1 rounded-xl transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
