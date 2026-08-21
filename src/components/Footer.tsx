/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowUp, Sparkles, Terminal } from "lucide-react";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-slate-950/80 backdrop-blur-md py-12 px-4 md:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative"
      >
        {/* Left: Branding & Core Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={() => onNavClick("home")}
            className="flex items-center gap-2 group cursor-pointer mb-3"
            aria-label="Scroll to home"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-white/10 group-hover:border-purple-accent/30 transition-all">
              <span className="text-xs font-black text-gradient">PK</span>
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-white">
              PRATIKSHA KHANDBAHALE
            </span>
          </button>

          <p className="text-xs text-white/40 font-mono flex items-center gap-1.5 justify-center md:justify-start">
            <Terminal className="w-3.5 h-3.5 text-purple-accent" />
            Designed & Developed by Pratiksha Khandbahale
          </p>
        </div>

        {/* Center: System Telemetry Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] text-white/30 border border-white/5 bg-white/2 rounded-full px-4 py-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-accent animate-pulse" />
          <span>VERSION 2.5</span>
          <span className="mx-1">•</span>
          <span>STATUS: ONLINE</span>
        </div>

        {/* Right: Copyright & Return to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <span className="text-xs font-mono text-white/30">
            © {currentYear} | All Rights Reserved.
          </span>

          <button
            onClick={() => onNavClick("home")}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-purple-accent/40 hover:scale-110 active:scale-95 text-white/70 hover:text-white shadow-md transition-all duration-300 cursor-pointer group"
            aria-label="Return to the top of the page"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
