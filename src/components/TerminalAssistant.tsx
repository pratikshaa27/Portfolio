import React, { useState, useEffect, useRef } from "react";
import { Terminal, Send, Sparkles, X, Minimize2, Maximize2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LogEntry {
  type: "input" | "output" | "system";
  content: string;
}

export const TerminalAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: "system", content: "Pratiksha AI Terminal v2.5.0 [Online]" },
    { type: "system", content: "Type 'help' or click a command below to explore." },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  const handleCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: LogEntry[] = [...logs, { type: "input", content: cmdStr }];

    switch (cmd) {
      case "help":
        newLogs.push({
          type: "output",
          content: `Available Commands:
  • skills       - View core technical stack & proficiency
  • projects     - Inspect featured full-stack & AI apps
  • experience   - View career timeline & milestones
  • contact      - Get email, GitHub, LinkedIn links
  • bio          - Read quick background & summary
  • clear        - Wipe terminal history`,
        });
        break;
      case "skills":
        newLogs.push({
          type: "output",
          content: "⚡ Core Tech Stack: React, Next.js, TypeScript, Node.js, Python, TailwindCSS, Framer Motion, GSAP, D3.js, PostgreSQL, Docker.",
        });
        break;
      case "projects":
        newLogs.push({
          type: "output",
          content: "🚀 Featured Showcase:\n 1. AI Vision Synthesizer - Multi-modal generative app\n 2. Quantum Dashboard - Real-time telemetry visualization\n 3. Nexus E-Commerce - Next-gen store with 3D models",
        });
        break;
      case "experience":
        newLogs.push({
          type: "output",
          content: "💼 Timeline:\n • Senior Full-Stack Engineer @ Tech Core\n • AI Engineer & Frontend Architect\n • Open Source Contributor & Designer",
        });
        break;
      case "contact":
        newLogs.push({
          type: "output",
          content: "📫 Reach out: Email: pratiksha@dev.io | GitHub: @pratiksha-dev | LinkedIn: /in/pratiksha-dev",
        });
        break;
      case "bio":
        newLogs.push({
          type: "output",
          content: "✨ Pratiksha is a passionate Full-Stack Engineer crafting high-performance, aesthetically stunning web applications with cutting-edge micro-interactions and AI capabilities.",
        });
        break;
      case "clear":
        setLogs([{ type: "system", content: "Terminal output cleared." }]);
        setInput("");
        return;
      default:
        newLogs.push({
          type: "output",
          content: `Command not recognized: '${cmd}'. Type 'help' for available commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <>
      {/* Floating Trigger Badge */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/80 border border-purple-500/30 text-white shadow-2xl backdrop-blur-xl hover:border-purple-500/60 transition-all cursor-pointer group"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </div>
          <Terminal className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-mono font-medium tracking-wide">CLI Assistant</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
            21st
          </span>
        </motion.button>
      )}

      {/* Terminal Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-lg rounded-2xl border border-teal-500/30 glass-panel shadow-2xl backdrop-blur-2xl overflow-hidden font-mono text-xs text-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] ml-2">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>dev@portfolio-terminal:~</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLogs([{ type: "system", content: "Terminal output cleared." }])}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Clear log"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-64 overflow-y-auto space-y-2 select-text scrollbar-thin">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  {log.type === "system" && (
                    <span className="text-purple-400 font-semibold">{log.content}</span>
                  )}
                  {log.type === "input" && (
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span>❯</span>
                      <span>{log.content}</span>
                    </div>
                  )}
                  {log.type === "output" && (
                    <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] pl-4 border-l border-purple-500/30">
                      {log.content}
                    </pre>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2 bg-slate-900/40 border-t border-white/5 flex flex-wrap gap-1.5">
              {["skills", "projects", "experience", "contact", "help"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 transition-all cursor-pointer"
                >
                  ${cmd}
                </button>
              ))}
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-slate-900/80 border-t border-white/10">
              <span className="text-purple-400 font-bold">❯</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command ('help', 'skills')..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-slate-500 font-mono"
                autoFocus
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalAssistant;
