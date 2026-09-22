/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import CustomCursor from "./components/CustomCursor";
import {
  ScrollReveal,
  ScrollProgressBar,
  ScrollVelocityBanner,
  useLenis,
} from "./components/ScrollReveal";

export default function App() {
  useLenis(); // Buttery-smooth inertial momentum scrolling
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    }
    return "dark";
  });

  const [palette, setPalette] = useState<"teal" | "violet" | "sunset" | "ocean" | "matrix">(() => {
    if (typeof window !== "undefined") {
      const savedPalette = localStorage.getItem("portfolio-palette");
      if (savedPalette && ["teal", "violet", "sunset", "ocean", "matrix"].includes(savedPalette)) {
        return savedPalette as any;
      }
    }
    return "teal";
  });

  // Sync theme & palette with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    root.setAttribute("data-palette", palette);
    localStorage.setItem("portfolio-theme", theme);
    localStorage.setItem("portfolio-palette", palette);
  }, [theme, palette]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Handle section tracking via IntersectionObserver
  useEffect(() => {
    if (isLoading) return;

    const sectionIds = ["home", "about", "education", "skills", "projects", "certificates", "experience", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Detect active section when centered in viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isLoading]);

  // Handle smooth scroll clicks
  const handleNavClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Small delay to allow drawer closing animations to settle
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveSection(sectionId);
      }, 50);
    }
  };

  return (
    <>
      {/* Premium Loader */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Main Portfolio System Container */}
      {!isLoading && (
        <div className="relative min-h-screen text-text select-none selection:bg-purple-accent/30 selection:text-white transition-opacity duration-1000 animate-[fadeIn_0.8s_ease_out]">
          {/* 21st.dev Top Neon Scroll Progress Bar */}
          <ScrollProgressBar />


          {/* Futuristic Particle & Stellar Background */}
          <Background />

          {/* Floating Glass Navbar */}
          <Navbar activeSection={activeSection} onNavClick={handleNavClick} theme={theme} onToggleTheme={toggleTheme} />

          {/* Main Layout Blocks */}
          <main className="relative z-10 w-full overflow-x-hidden">
            {/* HERO MODULE */}
            <Hero
              onNavClick={handleNavClick}
              onOpenResume={() => setIsResumeOpen(true)}
              theme={theme}
              onToggleTheme={toggleTheme}
              palette={palette}
              onPaletteChange={setPalette}
            />

            {/* IDENTITY / ABOUT MODULE */}
            <ScrollReveal variant="blur-in">
              <About />
            </ScrollReveal>

            {/* ACADEMICS / EDUCATION MODULE */}
            <ScrollReveal variant="fade-up">
              <Education />
            </ScrollReveal>

            {/* ABILITIES / SKILLS MODULE */}
            <Skills />

            {/* SHOWCASE / PROJECTS MODULE */}
            <ScrollReveal variant="blur-in">
              <Projects />
            </ScrollReveal>

            {/* 21st.dev Kinetic Scroll Velocity Banner */}
            <ScrollVelocityBanner />

            {/* MERITS / CERTIFICATES MODULE */}
            <ScrollReveal variant="fade-up">
              <Certificates />
            </ScrollReveal>

            {/* HISTORY / EXPERIENCE MODULE */}
            <ScrollReveal variant="blur-in">
              <Experience />
            </ScrollReveal>

            {/* TRANSCEIVER / CONTACT MODULE */}
            <ScrollReveal variant="fade-up">
              <Contact />
            </ScrollReveal>
          </main>

          {/* SYSTEM FOOTER */}
          <ScrollReveal variant="fade-up" amount={0.05}>
            <Footer onNavClick={handleNavClick} />
          </ScrollReveal>

          {/* Resume Modal Window */}
          <div className="print-container-wrapper">
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
