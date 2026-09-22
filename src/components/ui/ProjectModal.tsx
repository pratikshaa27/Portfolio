import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Sparkles, Layers, Cpu } from "lucide-react";
import { ProjectItem } from "../../types";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-md transition-opacity cursor-pointer ${
              isLight ? "bg-slate-900/40" : "bg-black/75"
            }`}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl z-10 custom-scrollbar ${
              isLight
                ? "bg-white border-slate-200 text-slate-900 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)]"
                : "bg-[#0D101C]/95 border-white/15 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_rgba(139,92,246,0.15)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-70" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-5 right-5 p-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                isLight
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200"
                  : "bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border-white/10"
              }`}
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 ${
                  isLight
                    ? "bg-teal-50 text-teal-700 border-teal-200"
                    : "bg-cyan-500/10 text-cyan-300 border-cyan-500/25"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {project.category}
              </span>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border ${
                  isLight
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : "bg-purple-500/10 text-purple-300 border-purple-500/20"
                }`}
              >
                Featured Architecture
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              {project.title}
            </h2>
            <p
              className={`text-sm sm:text-base font-medium mb-6 ${
                isLight ? "text-teal-600" : "text-cyan-300/90"
              }`}
            >
              {project.subtitle}
            </p>

            {/* Description */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border mb-6 ${
                isLight
                  ? "bg-slate-50 border-slate-200/80 text-slate-700"
                  : "bg-white/[0.03] border-white/10 text-gray-300"
              }`}
            >
              <h3
                className={`text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5 ${
                  isLight ? "text-slate-700" : "text-gray-400"
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-500" />
                System Overview & Engineering Highlights
              </h3>
              <p className="text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4
                className={`text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5 ${
                  isLight ? "text-slate-700" : "text-gray-400"
                }`}
              >
                <Layers className="w-4 h-4 text-purple-500" />
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 text-slate-800 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200"
                        : "bg-white/5 border-white/10 text-gray-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-3 pt-4 border-t ${
                isLight ? "border-slate-200" : "border-white/10"
              }`}
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    isLight
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300 shadow-sm"
                      : "bg-white/10 hover:bg-white/15 text-white border-white/15"
                  }`}
                >
                  <Github className="w-4 h-4" />
                  View Source Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview / Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
