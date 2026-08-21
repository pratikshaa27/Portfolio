/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

const words = ["Developer", "Engineer", "Creator", "Innovator"];

/* ─── 21st.dev TextReveal-inspired Word Animator with blur preset ─── */
const WordAnimator = ({ word }: { word: string; key?: string | number }) => {
  const characters = Array.from(word);
  return (
    <span className="inline-flex">
      {characters.map((char, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ y: 35, opacity: 0, rotateX: -60, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
          exit={{ y: -35, opacity: 0, rotateX: 60, filter: "blur(10px)" }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.03,
          }}
          className="inline-block origin-bottom font-display font-extrabold tracking-tight"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

/* ─── 3D Rolling Counter Digit (21st.dev counter-loader inspired) ─── */
const RollingDigit = ({ digit, index }: { digit: string; index: number; key?: React.Key }) => {
  return (
    <span className="relative inline-block overflow-hidden" style={{ perspective: "200px" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: "100%", rotateX: -90, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-100%", rotateX: 90, opacity: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.02,
          }}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const PinkWireframeGlobe = ({ progress = 0 }: { progress: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);

  // Keep progress ref updated without re-creating the effect
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angleY = 0;
    let angleX = 0.25;

    const radius = 90;
    const points: { x: number; y: number; z: number }[] = [];
    const latBands = 10;
    const lonBands = 20;

    // Generate sphere points
    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= lonBands; lon++) {
        const phi = (lon * 2 * Math.PI) / lonBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = cosPhi * sinTheta * radius;
        const y = cosTheta * radius;
        const z = sinPhi * sinTheta * radius;

        points.push({ x, y, z });
      }
    }

    const resize = () => {
      canvas.width = 240;
      canvas.height = 240;
    };
    resize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Speed increases as progress nears 100%
      const speedMultiplier = 1 + (progressRef.current / 100) * 2;

      // Rotate and project points
      const projected: { x: number; y: number; z: number }[] = [];
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      for (const p of points) {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        const fov = 200;
        const scale = fov / (fov + z2);
        const x2d = x1 * scale + cx;
        const y2d = y2 * scale + cy;

        projected.push({ x: x2d, y: y2d, z: z2 });
      }

      // Glow intensity increases with progress
      const glowIntensity = 0.15 + (progressRef.current / 100) * 0.45;

      // Latitudinal lines - pink gradient based on depth
      for (let lat = 0; lat <= latBands; lat++) {
        ctx.beginPath();
        for (let lon = 0; lon <= lonBands; lon++) {
          const idx = lat * (lonBands + 1) + lon;
          const p = projected[idx];
          if (lon === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const depthRatio = (lat / latBands);
        const alpha = glowIntensity + depthRatio * 0.3;
        ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Longitudinal lines
      for (let lon = 0; lon <= lonBands; lon++) {
        ctx.beginPath();
        for (let lat = 0; lat <= latBands; lat++) {
          const idx = lat * (lonBands + 1) + lon;
          const p = projected[idx];
          if (lat === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const alpha = glowIntensity + (lon / lonBands) * 0.25;
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw glowing equator ring
      ctx.beginPath();
      const eqLat = Math.round(latBands / 2);
      for (let lon = 0; lon <= lonBands; lon++) {
        const idx = eqLat * (lonBands + 1) + lon;
        const p = projected[idx];
        if (lon === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      const eqGlow = 0.4 + (progressRef.current / 100) * 0.5;
      ctx.strokeStyle = `rgba(20, 184, 166, ${eqGlow})`;
      ctx.lineWidth = 1.5 + (progressRef.current / 100) * 0.8;
      ctx.shadowColor = "#14b8a6";
      ctx.shadowBlur = 10 + (progressRef.current / 100) * 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      angleY += 0.012 * speedMultiplier;
      angleX = 0.25 + Math.sin(angleY * 0.4) * 0.08;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-56 h-56 flex items-center justify-center my-6">
      {/* Centered Initials with teal glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="text-3xl font-black tracking-widest font-display drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]"
          style={{
            background: "linear-gradient(to bottom, #fff 30%, #5eead4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          PK
        </span>
      </div>
      <canvas ref={canvasRef} className="w-56 h-56 drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]" />
    </div>
  );
};

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 2600ms Counter countdown
  useEffect(() => {
    const duration = 2600;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    let currentVal = 0;

    const timer = setInterval(() => {
      currentVal += increment;
      if (currentVal >= 100) {
        setCount(100);
        clearInterval(timer);
        // Begin the cinematic exit sequence
        setTimeout(() => {
          setIsExiting(true);
        }, 300);
      } else {
        setCount(Math.floor(currentVal));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Handle exit animation completion
  useEffect(() => {
    if (!isExiting) return;

    // After exit animations play, mark as done
    const exitTimer = setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 1100); // Matches the longest exit animation duration

    return () => clearTimeout(exitTimer);
  }, [isExiting, onComplete]);

  // Words rotation every 600ms during loading
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 600);

    return () => clearInterval(wordTimer);
  }, []);

  // Format count as 3-char padded string for rolling digits
  const countStr = String(count).padStart(3, "0");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          ref={loaderRef}
          id="loading-screen"
          initial={{ opacity: 1 }}
          animate={isExiting ? {
            y: "-105%",
            borderBottomLeftRadius: "50% 20%",
            borderBottomRightRadius: "50% 20%",
          } : {
            y: "0%",
          }}
          transition={isExiting ? {
            duration: 1.0,
            ease: [0.76, 0, 0.24, 1],
          } : undefined}
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(20, 184, 166, ${0.06 + (count / 100) * 0.18}) 0%, rgba(6, 182, 212, ${0.02 + (count / 100) * 0.08}) 40%, #060e11 100%)`,
            borderBottomLeftRadius: "0%",
            borderBottomRightRadius: "0%",
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
        >
          {/* Subtle Grid overlay for high-tech aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* ─── Content that scales up and blurs on exit (21st.dev Preloader pattern) ─── */}
          <motion.div
            ref={contentRef}
            className="flex flex-col justify-between flex-1"
            animate={isExiting ? {
              scale: 3,
              opacity: 0,
              filter: "blur(20px)",
            } : {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={isExiting ? {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            } : undefined}
          >
            {/* Top Info HUD */}
            <div className="flex justify-between items-start w-full relative z-10">
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs font-mono tracking-[0.3em] text-teal-400 uppercase font-bold">
                  PRATIKSHA KHANDBAHALE
                </span>
                <span className="text-[9px] font-mono text-cyan-300/40 tracking-widest uppercase mt-1">
                  Creative Portfolio Initializing
                </span>
              </motion.div>
              <motion.div
                className="text-right font-mono text-[9px] text-cyan-300/40 tracking-widest hidden sm:block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>REV // 2026.07</div>
                <div>LOC // MH, INDIA</div>
              </motion.div>
            </div>

            {/* Central Orbiting Holographic Rings & Rotating Words */}
            <div className="relative flex flex-col items-center justify-center my-auto z-10">
              {/* Concentric spinning rings with progress-aware glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                {/* Outer dotted ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] border border-dashed border-teal-500/15 rounded-full"
                  style={{
                    boxShadow: `0 0 ${10 + (count / 100) * 20}px rgba(20, 184, 166, ${0.05 + (count / 100) * 0.1})`,
                  }}
                />
                
                {/* Middle solid ring with orbital nodes */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] border border-teal-500/15 rounded-full flex items-center justify-center"
                  style={{
                    borderColor: `rgba(20, 184, 166, ${0.1 + (count / 100) * 0.2})`,
                    boxShadow: `0 0 ${8 + (count / 100) * 15}px rgba(20, 184, 166, ${0.05 + (count / 100) * 0.1})`,
                  }}
                >
                  <div
                    className="absolute top-0 w-2.5 h-2.5 bg-teal-400 rounded-full"
                    style={{
                      boxShadow: `0 0 ${15 + (count / 100) * 10}px rgba(45, 212, 191, 0.9)`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      boxShadow: `0 0 ${12 + (count / 100) * 10}px rgba(6, 182, 212, 0.9)`,
                    }}
                  />
                </motion.div>

                {/* Inner ambient ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] border border-teal-500/15 rounded-full flex items-center justify-center"
                  style={{
                    borderColor: `rgba(20, 184, 166, ${0.1 + (count / 100) * 0.15})`,
                    background: `radial-gradient(circle, rgba(20, 184, 166, ${0.06 + (count / 100) * 0.08}) 0%, transparent 70%)`,
                  }}
                >
                  <div
                    className="absolute right-0 w-2 h-2 bg-teal-300 rounded-full"
                    style={{
                      boxShadow: `0 0 ${12 + (count / 100) * 10}px rgba(45, 212, 191, 0.9)`,
                    }}
                  />
                </motion.div>
              </div>

              {/* Canvas Rotating Globe - speed tied to progress */}
              <div className="relative z-20">
                <PinkWireframeGlobe progress={count} />
              </div>

              {/* Word Display Section with enhanced blur transitions */}
              <div className="h-14 flex items-center justify-center overflow-hidden z-20">
                <AnimatePresence mode="wait">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl text-center uppercase tracking-tight">
                    <span
                      style={{
                        background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #38bdf8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <WordAnimator key={wordIndex} word={words[wordIndex]} />
                    </span>
                  </h1>
                </AnimatePresence>
              </div>
              
              <motion.div
                className="text-[9px] font-mono tracking-[0.25em] text-teal-400/40 uppercase mt-4 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                System Boot Sequence
              </motion.div>
            </div>

            {/* ─── Bottom Loading Progress Bar & Rolling Counter ─── */}
            <div className="w-full max-w-lg mx-auto flex flex-col gap-4 relative z-10">
              <div className="flex justify-between items-baseline font-mono">
                <motion.span
                  className="text-[10px] tracking-[0.2em] text-teal-400/50 font-semibold"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  LOADING CORE ASSETS
                </motion.span>

                {/* ─── 3D Rolling Digit Counter ─── */}
                <span className="text-3xl sm:text-4xl font-black font-sans tracking-tighter">
                  <span
                    style={{
                      background: "linear-gradient(to bottom, #fff 20%, #2dd4bf 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      perspective: "200px",
                    }}
                    className="inline-flex"
                  >
                    {countStr.split("").map((digit, i) => (
                      <RollingDigit key={i} digit={digit} index={i} />
                    ))}
                  </span>
                  <span className="text-xs text-teal-400/50 ml-1 font-mono font-medium">%</span>
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="relative w-full h-[3px] bg-teal-500/15 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    width: `${count}%`,
                    background: "linear-gradient(90deg, #14b8a6, #06b6d4, #38bdf8)",
                    boxShadow: `0 0 ${15 + (count / 100) * 20}px rgba(20, 184, 166, ${0.3 + (count / 100) * 0.4}), 0 0 ${30 + (count / 100) * 20}px rgba(6, 182, 212, ${0.1 + (count / 100) * 0.2})`,
                  }}
                  transition={{ ease: "easeOut" }}
                >
                  {/* Horizontal shimmer overlay */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
              </div>

              <div className="flex justify-between text-[9px] font-mono text-teal-400/35 tracking-wider">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  WELCOME PROMPT
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ESTABLISHING INTERFACE
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
