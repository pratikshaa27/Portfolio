/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { GraduationCap, Calendar, CheckCircle, Clock } from "lucide-react";
import { EducationItem } from "../types";

const educationData: EducationItem[] = [
  {
    id: "edu_1",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institute: "K. K. Wagh Institute of Engineering Education and Research (KKWIEER), Nashik, Maharashtra, India",
    duration: "2021 — 2025",
    status: "Completed",
    description: "Completed specialized coursework in Artificial Intelligence, Machine Learning, Deep Learning, Neural Networks, Database Systems, and Advanced Software Development. Graduated with a CGPA of 8.44.",
  },
  {
    id: "edu_2",
    degree: "Diploma in Computer Technology",
    institute: "K. K. Wagh Polytechnic, Nashik, India",
    duration: "2018 — 2021",
    status: "Completed",
    description: "Core computer technology fundamentals, system software design, networking, object-oriented systems, and relational databases. Graduated with an academic score of 87.37%.",
  },
  {
    id: "edu_3",
    degree: "Secondary School Certificate (10th SSC)",
    institute: "Dr. Shalinitai Borse School, Nashik, India",
    duration: "2018",
    status: "Completed",
    description: "Graduated with an overall academic score of 87.60%, establishing a solid foundation in analytical thinking, mathematics, and foundational sciences.",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-start text-left mb-16"
      >
        <span className="text-xs font-mono tracking-[0.3em] text-purple-accent uppercase mb-2">
          02 / EDUCATION
        </span>
        <h2 className="text-4xl md:text-6xl text-white font-medium flex items-center gap-3">
          <span className="text-3xl md:text-5xl animate-pulse">🌸</span>
          Education{" "}
          <span className="font-display font-display-serif italic text-gradient">
            History
          </span>
          <span className="text-3xl md:text-5xl animate-pulse">🌸</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-accent mt-4" />
      </motion.div>

      {/* Vertical Timeline Wrapper */}
      <div className="relative border-l border-white/10 md:ml-32 pl-8 md:pl-12 space-y-12 text-left">
        {/* Timeline glowing neon line overlay */}
        <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-purple-accent via-blue-accent to-pink-accent opacity-50" />

        {educationData.map((item, index) => {
          const isPursuing = item.status.toLowerCase() === "pursuing";
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.15 }}
              className="relative group animate-[fadeIn_0.5s_ease_out]"
            >
              {/* Pulsating timeline anchor node */}
              <div className="absolute left-[-41px] md:left-[-57px] top-6 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-35 animate-ping ${isPursuing ? "bg-purple-accent" : "bg-blue-accent"
                    }`} />
                  <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-slate-950 ${isPursuing ? "bg-purple-accent glow-purple" : "bg-blue-accent glow-blue"
                    }`} />
                </div>
              </div>

              {/* Absolute Side Date Panel for desktops with Floating animation */}
              <div className="hidden md:block absolute left-[-180px] top-5 w-32 text-right">
                <motion.span
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  className="inline-block text-sm font-semibold text-white/85 font-mono tracking-tight bg-white/5 border border-white/5 py-1 px-3 rounded-full hover:border-purple-accent/30 transition-colors"
                >
                  {item.duration.split("—")[0].trim()}
                </motion.span>
              </div>

              {/* Course Card glass panel */}
              <div className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden glass-panel-hover group-hover:translate-x-2 transition-transform duration-300">

                {/* Background active pulse blur for pursuing item */}
                {isPursuing && (
                  <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
                )}

                <div>
                  {/* Status & Date Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    {/* Date Badge for Mobile */}
                    <span className="md:hidden text-xs font-semibold text-purple-accent font-mono tracking-tight bg-purple-500/10 border border-purple-500/20 py-1 px-2.5 rounded-full flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>

                    {/* Desktop dummy */}
                    <span className="hidden md:flex items-center gap-1.5 text-xs text-white/40 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-white/30" />
                      {item.duration}
                    </span>

                    {/* Status Pill */}
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border ${isPursuing
                        ? "bg-purple-500/10 text-purple-accent border-purple-500/20"
                        : "bg-pink-500/10 text-pink-accent border-pink-500/20"
                      }`}>
                      {isPursuing ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </div>

                  {/* Degree Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-purple-accent transition-colors duration-300">
                    {item.degree}
                  </h3>

                  {/* Institute Name */}
                  <div className="flex items-center gap-2 mt-2 font-medium text-white/80">
                    <GraduationCap className="w-4 h-4 text-purple-accent" />
                    <span className="text-sm tracking-wide">{item.institute}</span>
                  </div>

                  {/* Description of learning */}
                  {item.description && (
                    <p className="mt-4 text-sm text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Cyber decoration lines */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
