/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUp, Sparkles, Terminal, Code2 } from "lucide-react";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Dynamic light/dark mode detector
  const [isLight, setIsLight] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`relative border-t transition-colors duration-300 py-10 px-4 md:px-8 overflow-hidden ${
        isLight
          ? "bg-slate-100/90 border-slate-200/80 text-slate-800"
          : "bg-slate-950/90 border-white/5 text-slate-200 backdrop-blur-md"
      }`}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute top-[-120px] left-1/2 -translate-x-1/2 w-[450px] h-[350px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
          isLight ? "bg-teal-300/25 opacity-70" : "bg-teal-500/10 opacity-60"
        }`}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        {/* Left: Branding & Core Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={() => onNavClick("home")}
            className="flex items-center gap-2.5 group cursor-pointer mb-2"
            aria-label="Scroll to home"
          >
            <div
              className={`relative flex items-center justify-center w-8 h-8 rounded-xl border transition-all duration-300 ${
                isLight
                  ? "bg-teal-700 border-teal-800 text-white shadow-sm group-hover:scale-105"
                  : "bg-slate-900 border-teal-500/30 text-teal-400 group-hover:border-teal-400 group-hover:shadow-[0_0_12px_rgba(20,184,166,0.3)] group-hover:scale-105"
              }`}
            >
              <Code2 className="w-4 h-4" />
            </div>
            <span
              className={`text-xs font-mono font-bold tracking-widest uppercase ${
                isLight ? "text-slate-900 group-hover:text-teal-700" : "text-white group-hover:text-teal-300"
              }`}
            >
              ENGINEERING PORTFOLIO<span className="text-teal-500 font-bold">.</span>
            </span>
          </button>

          <p
            className={`text-xs font-mono flex items-center gap-1.5 justify-center md:justify-start ${
              isLight ? "text-slate-600 font-medium" : "text-white/50"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-teal-500" />
            Engineered with Modern Vision • 2026 Edition
          </p>
        </div>

        {/* Center: Live Telemetry Indicator */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`hidden lg:flex items-center gap-2 font-mono text-[11px] rounded-full px-4 py-1.5 border shadow-sm transition-colors ${
            isLight
              ? "bg-white/80 border-slate-300/80 text-slate-700"
              : "bg-white/[0.03] border-teal-500/20 text-white/60 shadow-[0_0_12px_rgba(20,184,166,0.1)]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-500 animate-spin-slow" />
          <span>VERSION 2.5</span>
          <span className="mx-1 opacity-30">•</span>
          <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
            STATUS: ONLINE
          </span>
        </motion.div>

        {/* Right: Copyright & Return to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <span
            className={`text-xs font-mono ${
              isLight ? "text-slate-500 font-medium" : "text-white/40"
            }`}
          >
            © {currentYear} | All Rights Reserved.
          </span>

          <motion.button
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onNavClick("home")}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer group shadow-sm ${
              isLight
                ? "bg-white border-slate-300 hover:border-teal-600 text-slate-700 hover:text-teal-700 shadow-slate-200/60"
                : "bg-teal-500/10 border-teal-500/30 hover:border-teal-400 text-teal-300 hover:text-white shadow-[0_0_15px_rgba(20,184,166,0.2)]"
            }`}
            aria-label="Return to the top of the page"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
