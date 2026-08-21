/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from "react";
import { motion } from "motion/react";
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

function ScrollReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
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

  // Sync theme with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

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
          {/* Small Pink Custom Cursor Follower */}
          <CustomCursor />

          {/* Futuristic Particle & Stellar Background */}
          <Background />

          {/* Floating Glass Navbar */}
          <Navbar activeSection={activeSection} onNavClick={handleNavClick} theme={theme} onToggleTheme={toggleTheme} />

          {/* Main Layout Blocks */}
          <main className="relative z-10 w-full overflow-hidden">
            {/* HERO MODULE */}
            <Hero onNavClick={handleNavClick} onOpenResume={() => setIsResumeOpen(true)} theme={theme} />

            {/* IDENTITY / ABOUT MODULE */}
            <ScrollReveal>
              <About />
            </ScrollReveal>

            {/* ACADEMICS / EDUCATION MODULE */}
            <ScrollReveal>
              <Education />
            </ScrollReveal>

            {/* ABILITIES / SKILLS MODULE */}
            <ScrollReveal>
              <Skills />
            </ScrollReveal>

            {/* SHOWCASE / PROJECTS MODULE */}
            <ScrollReveal>
              <Projects />
            </ScrollReveal>

            {/* MERITS / CERTIFICATES MODULE */}
            <ScrollReveal>
              <Certificates />
            </ScrollReveal>

            {/* HISTORY / EXPERIENCE MODULE */}
            <ScrollReveal>
              <Experience />
            </ScrollReveal>

            {/* TRANSCEIVER / CONTACT MODULE */}
            <ScrollReveal>
              <Contact />
            </ScrollReveal>
          </main>

          {/* SYSTEM FOOTER */}
          <Footer onNavClick={handleNavClick} />

          {/* Resume Modal Window */}
          <div className="print-container-wrapper">
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
