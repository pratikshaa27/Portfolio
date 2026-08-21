/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";

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
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, onNavClick, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  return (
    <>
      {/* Navbar Container */}
      <nav
        id="navbar"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500`}
      >
        <div
          className={`relative glass-panel rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 overflow-hidden ${scrolled ? "bg-[rgba(13,16,28,0.75)] shadow-lg shadow-purple-accent/5 py-2 border-white/15" : ""
            }`}
        >
          {/* Scroll Progress Bar */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-accent transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
          {/* Logo */}
          <button
            onClick={() => handleItemClick("home")}
            className="flex items-center group cursor-pointer"
            aria-label="Scroll to home"
          >
            <span className="text-sm font-mono font-extrabold tracking-wider text-pink-400 group-hover:opacity-90 transition-opacity">
              {/* PRATIKSHA.K 🌸 */}
            </span>
          </button>

          {/* Desktop Navigation Links with Animated Teal Underline */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer group ${
                    isActive ? "text-teal-400 font-bold drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]" : "text-white/75 hover:text-teal-400"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Animated Active / Hover Teal Underline Bar */}
                  {isActive ? (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute left-2 right-2 bottom-0.5 h-[2px] bg-teal-400 rounded-full shadow-[0_0_12px_#14b8a6]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute left-2 right-2 bottom-0.5 w-0 h-[2px] bg-teal-400 rounded-full transition-all duration-300 group-hover:w-[calc(100%-16px)] shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Theme switcher and CTA button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-white/10 hover:bg-teal-500/20 text-white hover:border-teal-500/30 transition-all cursor-pointer flex items-center justify-center bg-white/5 backdrop-blur-md shadow-inner"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-teal-400" />
              ) : (
                <Moon className="w-4 h-4 text-teal-400" />
              )}
            </button>

            {/* Call To Action button (hidden on smaller screens) */}
            <div className="hidden sm:flex items-center">
              <button
                onClick={() => handleItemClick("contact")}
                className="relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wider text-white overflow-hidden group cursor-pointer shadow-lg backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 font-bold">Connect</span>
              </button>
            </div>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Glass Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-4 rounded-3xl glass-panel max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full py-3 px-6 rounded-2xl text-sm font-semibold tracking-wide text-left transition-all ${isActive
                      ? "bg-gradient-accent text-white shadow-lg shadow-purple-500/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => handleItemClick("contact")}
                className="w-full mt-4 py-3.5 px-6 rounded-2xl text-sm font-bold text-center text-slate-950 bg-white shadow-lg hover:opacity-90 transition-all"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
