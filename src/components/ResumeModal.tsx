'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Download, Phone, Mail, Github, Linkedin, Calendar, MapPin, Award, BookOpen, Briefcase, Sparkles } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [profilePhoto, setProfilePhoto] = React.useState<string | null>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setProfilePhoto(localStorage.getItem("pratiksha_profile_photo") || null);
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleStorageChange = () => {
      setProfilePhoto(localStorage.getItem("pratiksha_profile_photo") || null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = "/Resume.pdf";
      link.download = "Pratiksha_Khandbahale_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setTimeout(() => setIsDownloading(false), 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030712]/90 backdrop-blur-md overflow-y-auto resume-modal-container bg-modal-overlay">
      {/* Printable Wrapper */}
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-white/10 rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200 bg-modal-card">
        
        {/* Header toolbar - Hidden during printing */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d111d] text-white print:hidden bg-modal-header">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-accent animate-pulse" />
            <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
              Resume Document Preview
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-xs py-2.5 px-5 rounded-full tracking-wider uppercase transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
            >
              <Download className={`w-3.5 h-3.5 text-white ${isDownloading ? "animate-spin" : "animate-bounce"}`} />
              <span className="text-white font-bold">{isDownloading ? "Downloading..." : "Download PDF"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal content area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#090d16] text-white print:bg-white print:p-0 print:overflow-visible bg-modal-content">
          
          {/* Printable Container */}
          <div 
            id="printable-resume-container" 
            className="w-full bg-[#0d111d] border border-white/10 rounded-2xl p-6 sm:p-12 text-left space-y-8 text-white shadow-xl relative overflow-hidden print:border-none print:bg-white print:text-black print:p-0 print:shadow-none"
          >
             {/* Background design accents - Hidden during printing */}
            <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-teal-600/5 blur-3xl pointer-events-none print:hidden" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-600/5 blur-3xl pointer-events-none print:hidden" />

            {/* Resume Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 print:grid-cols-12 print:gap-6">
              
              {/* Left Column: Personal info, Contact, Education, Skills, Responsibility */}
              <div className="md:col-span-4 space-y-8 border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-8 print:col-span-4 print:border-r print:border-black/10 print:pr-6 print:pb-0">
                
                {/* Profile Circle representation on resume */}
                <div className="space-y-4 text-center md:text-left print:text-left">
                  <div className="w-24 h-24 rounded-full border-2 border-teal-500/40 shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center justify-center mx-auto md:mx-0 overflow-hidden bg-slate-900 print:w-20 print:h-20 print:border-black/10">
                    <img
                      src={profilePhoto || "/photo.png?v=v3"}
                      alt="Pratiksha Khandbahale Portrait"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "/photo.png?v=v3";
                      }}
                      className="w-full h-full object-cover object-top filter brightness-[1.05] contrast-[1.05]"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white print:text-black">PRATIKSHA KHANDBAHALE</h2>
                    <p className="text-xs font-mono text-purple-accent print:text-slate-600 uppercase mt-1">Junior Software Associate</p>
                  </div>
                </div>

                {/* Contacts Block */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">CONTACTS</h3>
                  <div className="space-y-2 text-xs text-white/70 print:text-slate-800 font-mono">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-purple-accent/70 print:text-slate-600 flex-shrink-0" />
                      <span>+91 9970123811</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-purple-accent/70 print:text-slate-600 flex-shrink-0" />
                      <span className="break-all">khandbahalepratiksha2727@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-purple-accent/70 print:text-slate-600 flex-shrink-0" />
                      <span>Nashik, Maharashtra</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5 text-purple-accent/70 print:text-slate-600 flex-shrink-0" />
                      <span className="break-all">github.com/pratikshaa27</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-3.5 h-3.5 text-purple-accent/70 print:text-slate-600 flex-shrink-0" />
                      <span className="break-all">linkedin.com/in/pratiksha-khandbahale-005b39256/</span>
                    </div>
                  </div>
                </div>

                {/* Education Block */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">EDUCATION</h3>
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white print:text-black">B.Tech in Artificial Intelligence & Data Science</div>
                      <div className="text-[10px] text-white/60 print:text-slate-600 font-medium leading-tight">K.K. Wagh Institute of Engg Education & Research, Nashik</div>
                      <div className="flex justify-between text-[10px] font-mono text-purple-accent/80 print:text-slate-600">
                        <span>CGPA: 8.44</span>
                        <span>2021 — 2025</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white print:text-black">Diploma in Computer Technology</div>
                      <div className="text-[10px] text-white/60 print:text-slate-600 font-medium leading-tight">K.K. Wagh Polytechnic, Nashik</div>
                      <div className="flex justify-between text-[10px] font-mono text-purple-accent/80 print:text-slate-600">
                        <span>Score: 87.37%</span>
                        <span>2018 — 2021</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white print:text-black">Secondary School Certificate</div>
                      <div className="text-[10px] text-white/60 print:text-slate-600 font-medium leading-tight">Dr. Shalinitai Borse School, Nashik</div>
                      <div className="flex justify-between text-[10px] font-mono text-purple-accent/80 print:text-slate-600">
                        <span>Score: 87.60%</span>
                        <span>2018</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Bullet block */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">SKILLS</h3>
                  <div className="space-y-2 text-xs text-white/80 print:text-slate-800">
                    <div>
                      <strong className="text-white print:text-black font-semibold text-[11px] block">Languages:</strong>
                      <span className="font-mono text-[10px] text-white/60 print:text-slate-600">Python, JavaScript, Java, C++, PHP</span>
                    </div>
                    <div>
                      <strong className="text-white print:text-black font-semibold text-[11px] block">Frameworks:</strong>
                      <span className="font-mono text-[10px] text-white/60 print:text-slate-600">Tailwind CSS, MERN Stack, Flask, React.js</span>
                    </div>
                    <div>
                      <strong className="text-white print:text-black font-semibold text-[11px] block">Databases:</strong>
                      <span className="font-mono text-[10px] text-white/60 print:text-slate-600">MongoDB, MySQL, SQLite</span>
                    </div>
                    <div>
                      <strong className="text-white print:text-black font-semibold text-[11px] block">Tools:</strong>
                      <span className="font-mono text-[10px] text-white/60 print:text-slate-600">Machine Learning, Git, Figma, Android Studio</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Statement, Internships, Projects, Achievements, Certifications */}
              <div className="md:col-span-8 space-y-6 md:pl-4 print:col-span-8 print:pl-4">
                
                {/* Statement of Purpose */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">STATEMENT OF PURPOSE</h3>
                  <p className="text-xs text-white/70 print:text-slate-800 leading-relaxed text-justify">
                    I am a passionate Artificial Intelligence & Data Science graduate currently working as a Junior Associate in the Software Division at ESDS Software Solution Limited. Driven by a strong interest in building intelligent, scalable, and user-focused software solutions, I focus on writing clean, efficient, and maintainable code while continuously improving my technical expertise.
                  </p>
                </div>

                {/* Internships */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">EXPERIENCE & INTERNSHIPS</h3>
                  <div className="space-y-4">
                    {/* ESDS */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div className="text-xs font-bold text-white print:text-black">Junior Associate — Software Division</div>
                        <div className="text-[10px] font-mono text-purple-accent/85 print:text-slate-600">Nov 2025 — Present</div>
                      </div>
                      <div className="text-[10px] text-white/60 print:text-slate-600 font-medium">ESDS Software Solution Limited, Nashik (Full Time)</div>
                      <ul className="list-disc pl-4 text-[10px] text-white/70 print:text-slate-700 space-y-0.5 leading-relaxed">
                        <li>Develop and maintain high-performance full-stack solutions and intelligent database structures.</li>
                        <li>Work in Core Software Division architecting secure and scalable corporate enterprise portals.</li>
                        <li>Integrate complex custom data analytic algorithms to elevate platform automation.</li>
                      </ul>
                    </div>

                    {/* FireFist */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div className="text-xs font-bold text-white print:text-black">Web Development Intern</div>
                        <div className="text-[10px] font-mono text-purple-accent/85 print:text-slate-600">Aug 2024 — Oct 2024</div>
                      </div>
                      <div className="text-[10px] text-white/60 print:text-slate-600 font-medium">FireFist, Nashik (Internship)</div>
                      <ul className="list-disc pl-4 text-[10px] text-white/70 print:text-slate-700 space-y-0.5 leading-relaxed">
                        <li>Engineered frontend components using React and Elementor page builder systems.</li>
                        <li>Designed highly responsive and dynamic web page flows improving client-side navigation.</li>
                        <li>Collaborated with design units to transform layout mocks into optimized responsive elements.</li>
                      </ul>
                    </div>

                    {/* Golden Dream */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div className="text-xs font-bold text-white print:text-black">Fullstack Development Intern</div>
                        <div className="text-[10px] font-mono text-purple-accent/85 print:text-slate-600">Jun 2022 — Aug 2022</div>
                      </div>
                      <div className="text-[10px] text-white/60 print:text-slate-600 font-medium">Golden Dream Software Solution (Internship)</div>
                      <ul className="list-disc pl-4 text-[10px] text-white/70 print:text-slate-700 space-y-0.5 leading-relaxed">
                        <li>Constructed robust administrative portals and database systems using PHP and MySQL.</li>
                        <li>Gained hands-on competency in user interface layout styling, code debugging, and API routing.</li>
                        <li>Managed software iterations and source branches securely with Git & GitHub integration.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Selected Projects */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">SELECTED PROJECTS</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-white print:text-black">
                        <span>NeuroAI (2025)</span>
                        <span className="font-mono text-[9px] font-normal text-purple-accent print:text-slate-600">Python, Deep Learning, ML, EEG Processing</span>
                      </div>
                      <p className="text-[10px] text-white/70 print:text-slate-700 mt-1 leading-relaxed">
                        An intelligent healthcare system supporting Autism Spectrum Disorder (ASD) analysis from EEG signals. Integrates deep learning and ML models to analyze emotional patterns, evaluate cognitive states, and predict therapy response.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-white print:text-black">
                        <span>OliviaChain (2025)</span>
                        <span className="font-mono text-[9px] font-normal text-purple-accent print:text-slate-600">Flutter, Java, SQLite, Android Studio</span>
                      </div>
                      <p className="text-[10px] text-white/70 print:text-slate-700 mt-1 leading-relaxed">
                        Developed a mobile app to streamline Olivia's supply chain, enabling beauty parlours to place orders, distributors to manage inventories, and admins to access sales analytics.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-white print:text-black">
                        <span>Mindflow (2025)</span>
                        <span className="font-mono text-[9px] font-normal text-purple-accent print:text-slate-600">Flask, React.js, ML, Gamification</span>
                      </div>
                      <p className="text-[10px] text-white/70 print:text-slate-700 mt-1 leading-relaxed">
                        Productivity platform mapping adaptive roadmaps and mental well-being tracking. Integrated chatbot assistant, gamified milestones, and behavioral metrics for customizable growth patterns.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-white print:text-black">
                        <span>Re-dact (2024)</span>
                        <span className="font-mono text-[9px] font-normal text-purple-accent print:text-slate-600">Machine Learning, PyQt, React.js, NLP</span>
                      </div>
                      <p className="text-[10px] text-white/70 print:text-slate-700 mt-1 leading-relaxed">
                        Built a privacy redaction assistant utilizing advanced NLP structures to redact or obscure highly sensitive identifiers within documents across multiple file structures.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">HONORS & ACHIEVEMENTS</h3>
                  <ul className="list-disc pl-4 text-[10px] text-white/70 print:text-slate-700 space-y-0.5">
                    <li><strong>Top 5 Placing</strong> – 2Day National Level Hackathon 2025 (KKWIEER)</li>
                    <li><strong>Selected in Top 5 Teams</strong> – Smart India Hackathon (SIH) 2024 (IIT Kharagpur, West Bengal)</li>
                    <li><strong>1st Prize Winner</strong> – Project-Based Learning 2024 Competition (KKWIEER)</li>
                    <li><strong>National Hackathon Participant</strong> – NASA Space Apps 2024 & G.H. Raisoni</li>
                  </ul>
                </div>

                {/* Certifications */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-accent print:text-black border-b border-white/10 pb-1.5 print:border-black/20">COURSES & CERTIFICATIONS</h3>
                  <ul className="list-disc pl-4 text-[10px] text-white/70 print:text-slate-700 space-y-0.5">
                    <li><strong>AWS Academy Cloud Foundation (2025)</strong>: Cloud Computing, EC2 Services, Security.</li>
                    <li><strong>Data Analysis & Visualization (Udemy 2024)</strong>: Pandas, NumPy, Matplotlib, Seaborn.</li>
                    <li><strong>C/C++ Programming Specialization</strong> (Internshala 2022) & <strong>Certified Paper Presentation</strong> (2023).</li>
                  </ul>
                </div>

              </div>

            </div>

            {/* Bottom Footer block - Hidden during printing */}
            <div className="text-center pt-4 border-t border-white/5 text-[9px] font-mono text-white/30 tracking-wider uppercase flex justify-between items-center print:hidden">
              <span>DESIGNED BY PRATIKSHA KHANDBAHALE</span>
              <span>VERIFIED ORIGINAL RESUME DOCUMENT</span>
            </div>

          </div>
          
        </div>
        
      </div>
    </div>
  );
}
