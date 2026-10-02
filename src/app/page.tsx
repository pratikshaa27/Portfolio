'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import {
  ScrollReveal,
  ScrollProgressBar,
  ScrollVelocityBanner,
  useLenis,
} from '@/components/ScrollReveal';

// Dynamically import client/browser-only components to prevent hydration mismatches
const Loader = dynamic(() => import('@/components/Loader'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Background = dynamic(() => import('@/components/Background'), { ssr: false });

export default function HomePage() {
  useLenis();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [palette, setPalette] = useState<'teal' | 'violet' | 'sunset' | 'ocean' | 'matrix'>('teal');

  // Load saved theme and palette after mount to prevent hydration mismatch
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
    const savedPalette = localStorage.getItem('portfolio-palette');
    if (savedPalette && ['teal', 'violet', 'sunset', 'ocean', 'matrix'].includes(savedPalette)) {
      setPalette(savedPalette as any);
    }
  }, []);

  // Sync theme & palette with document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    root.setAttribute('data-palette', palette);
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-palette', palette);
  }, [theme, palette]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Section observer for active navbar state
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'education',
      'skills',
      'projects',
      'certificates',
      'experience',
      'contact',
    ];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
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
  }, []);

  // Handle smooth navigation clicks
  const handleNavClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setActiveSection(sectionId);
      }, 50);
    }
  };

  return (
    <>
      {/* 1. Visual Loader Overlay */}
      {isLoading && (
        <Loader onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Full Semantic DOM rendered in initial HTML for Googlebot / Search Engines */}
      <div
        className={`relative min-h-screen text-text select-none selection:bg-purple-accent/30 selection:text-white transition-opacity duration-700 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Top neon scroll progress bar */}
        <ScrollProgressBar />

        {/* Custom cursor (desktop) */}
        <CustomCursor />

        {/* Ambient stellar particle background */}
        <Background />

        {/* Navigation Bar */}
        <Navbar
          activeSection={activeSection}
          onNavClick={handleNavClick}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main semantic content */}
        <main className="relative z-10 w-full overflow-x-hidden">
          {/* HERO */}
          <Hero
            onNavClick={handleNavClick}
            onOpenResume={() => setIsResumeOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
            palette={palette}
            onPaletteChange={setPalette}
          />

          {/* IDENTITY / ABOUT */}
          <ScrollReveal variant="blur-in">
            <About />
          </ScrollReveal>

          {/* ACADEMICS / EDUCATION */}
          <ScrollReveal variant="fade-up">
            <Education />
          </ScrollReveal>

          {/* ABILITIES / SKILLS */}
          <Skills />

          {/* SHOWCASE / PROJECTS */}
          <ScrollReveal variant="blur-in">
            <Projects />
          </ScrollReveal>

          {/* KINETIC VELOCITY BANNER */}
          <ScrollVelocityBanner />

          {/* MERITS / CERTIFICATES */}
          <ScrollReveal variant="fade-up">
            <Certificates />
          </ScrollReveal>

          {/* HISTORY / EXPERIENCE */}
          <ScrollReveal variant="blur-in">
            <Experience />
          </ScrollReveal>

          {/* TRANSCEIVER / CONTACT */}
          <ScrollReveal variant="fade-up">
            <Contact />
          </ScrollReveal>
        </main>

        {/* FOOTER */}
        <ScrollReveal variant="fade-up" amount={0.05}>
          <Footer onNavClick={handleNavClick} />
        </ScrollReveal>

        {/* RESUME MODAL */}
        <div className="print-container-wrapper">
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>
      </div>
    </>
  );
}
