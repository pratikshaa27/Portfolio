/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Sparkles, ArrowUpRight, Code2 } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, onNavClick, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  const isLight = theme === "light";

  return (
    <>
      {/* Floating Navbar Container */}
      <motion.nav
        id="navbar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl"
      >
        <div
          className={`relative rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between transition-all duration-300 backdrop-blur-xl border ${scrolled
            ? isLight
              ? "bg-white/90 border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.1),0_0_20px_rgba(13,148,136,0.1)] py-1.5"
              : "bg-[#090D1A]/85 border-cyan-500/20 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6),0_0_20px_rgba(20,184,166,0.15)] py-1.5"
            : isLight
              ? "bg-white/80 border-slate-200/70 shadow-[0_8px_25px_rgba(15,23,42,0.06)]"
              : "bg-[#0B0F21]/60 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            }`}
        >
          {/* Top Edge Specular Shimmer */}
          <div
            className={`absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none`}
          />

          {/* Scroll Progress Bar along bottom edge */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 transition-all duration-100 rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Left: Minimalist Home Icon Button */}
          <button
            onClick={() => handleItemClick("home")}
            className="flex items-center group cursor-pointer p-0.5"
            aria-label="Scroll to home"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isLight
                  ? "bg-teal-700 text-white shadow-sm group-hover:bg-teal-800 group-hover:scale-105"
                  : "bg-teal-500/15 border border-teal-500/30 text-teal-300 group-hover:border-teal-400 group-hover:shadow-[0_0_12px_rgba(20,184,166,0.3)] group-hover:scale-105"
              }`}
            >
              <Code2 className="w-4 h-4" />
            </div>
          </button>

          {/* Desktop Navigation Links with 21st.dev Active Capsule Pill */}
          <div
            className={`hidden lg:flex items-center gap-1 p-1 rounded-full border ${isLight ? "bg-slate-100/80 border-slate-200/80" : "bg-white/[0.03] border-white/5"
              }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${isActive
                    ? isLight
                      ? "text-teal-700 font-bold"
                      : "text-white font-semibold"
                    : isLight
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-gray-400 hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Sliding Active Pill with Framer Motion Spring */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavCapsule"
                      className={`absolute inset-0 rounded-full border shadow-sm -z-0 ${isLight
                        ? "bg-white border-teal-500/30 shadow-[0_2px_8px_rgba(13,148,136,0.15)]"
                        : "bg-gradient-to-r from-cyan-500/20 via-teal-500/25 to-purple-500/20 border-cyan-400/40 shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                        }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Theme Toggle & Connect CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center backdrop-blur-md hover:scale-105 active:scale-95 ${isLight
                ? "bg-slate-100 border-slate-300/80 text-slate-800 hover:bg-slate-200 shadow-sm"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/40"
                }`}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-teal-600" />
              )}
            </button>

            {/* Quick CTA */}
            <button
              onClick={() => handleItemClick("contact")}
              className="relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold text-white overflow-hidden group cursor-pointer shadow-md shadow-cyan-500/10 border border-cyan-400/30 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 transition-all hover:scale-[1.03] active:scale-[0.97] hidden sm:flex items-center gap-1.5"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Hamburger Toggle (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-full border transition-colors cursor-pointer ${isLight
                ? "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                : "hover:bg-white/10 text-white border-white/10"
                }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation (Framer Motion AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className={`fixed top-20 left-4 right-4 z-50 p-5 rounded-3xl border shadow-2xl backdrop-blur-2xl lg:hidden flex flex-col gap-1.5 ${isLight ? "bg-white/95 border-slate-200 text-slate-900" : "bg-[#0B0F21]/95 border-white/15 text-white"
                }`}
            >
              <div
                className={`flex items-center justify-between pb-3 mb-1 border-b ${isLight ? "border-slate-200 text-slate-800" : "border-white/10 text-white"
                  }`}
              >
                <span className="text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Navigation
                </span>
                <span className="text-[11px] text-gray-500">Pratiksha Portfolio</span>
              </div>
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${isActive
                      ? isLight
                        ? "bg-teal-50 text-teal-700 border border-teal-200 font-semibold"
                        : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                      : isLight
                        ? "text-slate-700 hover:bg-slate-100"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
