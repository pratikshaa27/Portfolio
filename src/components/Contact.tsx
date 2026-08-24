/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Send, Terminal, Phone, Copy, Check, Sparkles } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { SectionHeader } from "./ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("khandbahalepratiksha2727@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Background ambient glowing orb */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-gradient-to-tr from-teal-500/10 via-cyan-500/5 to-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <SectionHeader
        number="07 / CONTACT"
        titlePrefix="Get In"
        highlightedText="Touch"
        emoji="✨"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch mt-12">
        {/* LEFT: Glass Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -35, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <SpotlightCard
            spotlightColor="rgba(20, 184, 166, 0.12)"
            borderColor="rgba(45, 212, 191, 0.35)"
            className="p-8 md:p-10 flex flex-col justify-between h-full text-left relative overflow-hidden group/card border border-white/10 hover:border-teal-400/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          >
            {/* Subtle watermark background */}
            <div className="absolute right-[-20px] bottom-[-20px] text-white/5 font-mono text-9xl font-bold select-none pointer-events-none">
              @
            </div>

            <div>
              <span className="text-xs font-mono text-teal-300/90 tracking-widest uppercase block font-semibold mb-1">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
                Contact Information
                <Sparkles className="w-4 h-4 text-teal-400" />
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-sans">
                Whether you want to discuss an intelligent full-stack system, inquire about my studies in AI and Data Science, or simply say hello — feel free to drop a message. I'm always open to collaborative opportunities.
              </p>

              {/* Info Items Rows */}
              <div className="space-y-6">
                {/* Mail */}
                <div className="flex items-center gap-4 group/item">
                  <motion.button
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    onClick={handleCopyEmail}
                    className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center hover:border-teal-400/50 hover:bg-teal-500/20 transition-colors cursor-pointer shadow-[0_0_10px_rgba(45,212,191,0.1)]"
                    title="Click to copy email"
                  >
                    <Mail className="w-5 h-5 text-teal-300" />
                  </motion.button>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-white/40 block uppercase font-semibold">
                      EMAIL
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href="mailto:khandbahalepratiksha2727@gmail.com"
                        className="text-sm font-semibold text-white/90 group-hover/item:text-teal-300 transition-colors truncate"
                      >
                        khandbahalepratiksha2727@gmail.com
                      </a>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCopyEmail}
                        className="p-1.5 text-white/40 hover:text-teal-300 transition-colors rounded-lg hover:bg-white/5 cursor-pointer flex items-center justify-center"
                        title="Copy email address"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </motion.button>
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -5 }}
                            className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group/item">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover/item:border-teal-400/40 transition-colors shadow-[0_0_10px_rgba(45,212,191,0.1)]"
                  >
                    <Phone className="w-5 h-5 text-teal-300" />
                  </motion.div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 block uppercase font-semibold">
                      PHONE
                    </span>
                    <a
                      href="tel:+919970123811"
                      className="text-sm font-semibold text-white/90 group-hover/item:text-teal-300 transition-colors"
                    >
                      +91 9970123811
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group/item">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover/item:border-teal-400/40 transition-colors shadow-[0_0_10px_rgba(45,212,191,0.1)]"
                  >
                    <MapPin className="w-5 h-5 text-teal-300" />
                  </motion.div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 block uppercase font-semibold">
                      LOCATION
                    </span>
                    <span className="text-sm font-semibold text-white/90">
                      Nashik, Maharashtra, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons row */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase block mb-3 font-semibold">
                CONNECT WITH ME
              </span>
              <div className="flex items-center gap-4">
                <motion.a
                  whileHover={{ y: -5, scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  href="https://www.linkedin.com/in/pratiksha-khandbahale-005b39256/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-[#0A66C2] border border-[#0A66C2] flex items-center justify-center shadow-lg hover:bg-[#084e96] transition-all group/social cursor-pointer"
                  aria-label="Connect on LinkedIn"
                >
                  <svg className="w-5 h-5 group-hover/social:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path fill="#FFFFFF" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ y: -5, scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  href="https://github.com/pratikshaa27"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-[#181717] border border-slate-700 flex items-center justify-center shadow-lg hover:bg-black transition-all group/social cursor-pointer"
                  aria-label="Connect on GitHub"
                >
                  <svg className="w-5 h-5 group-hover/social:-rotate-12 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path fill="#FFFFFF" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* RIGHT: High-End Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 35, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-7"
        >
          <SpotlightCard
            spotlightColor="rgba(20, 184, 166, 0.12)"
            borderColor="rgba(45, 212, 191, 0.35)"
            className="p-8 md:p-10 flex flex-col justify-between h-full border border-white/10 hover:border-teal-400/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute right-0 top-0 w-[180px] h-[180px] bg-gradient-to-bl from-teal-500/10 to-transparent blur-3xl pointer-events-none" />

            {/* Form Header HUD */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-8 text-left">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest font-semibold">
                  SEND A MESSAGE
                </span>
              </div>
              <span className="text-[10px] font-mono text-teal-300 font-bold bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5 shadow-[0_0_8px_rgba(45,212,191,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                ACTIVE
              </span>
            </div>

            {/* Contact Form Element */}
            <form
              action="https://formsubmit.co/khandbahalepratiksha2727@gmail.com"
              method="POST"
              className="space-y-6 flex-1 flex flex-col justify-between text-left"
            >
              {/* FormSubmit Configuration Fields */}
              <input type="hidden" name="_subject" value="New Portfolio Message!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="space-y-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-xs font-mono text-white/70 uppercase tracking-wider font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 focus:border-teal-400/60 focus:shadow-[0_0_20px_rgba(45,212,191,0.15)] rounded-2xl px-5 py-4 text-sm font-medium text-white placeholder-white/25 outline-none transition-all focus:bg-white/10"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-xs font-mono text-white/70 uppercase tracking-wider font-semibold">
                    Your Return Email
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 focus:border-teal-400/60 focus:shadow-[0_0_20px_rgba(45,212,191,0.15)] rounded-2xl px-5 py-4 text-sm font-medium text-white placeholder-white/25 outline-none transition-all focus:bg-white/10"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-message" className="text-xs font-mono text-white/70 uppercase tracking-wider font-semibold">
                    Your Message
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    required
                    rows={4}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 focus:border-teal-400/60 focus:shadow-[0_0_20px_rgba(45,212,191,0.15)] rounded-2xl px-5 py-4 text-sm font-medium text-white placeholder-white/25 outline-none transition-all resize-none focus:bg-white/10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  type="submit"
                  className="w-full relative py-4 px-8 rounded-full overflow-hidden text-sm font-bold tracking-wider text-white bg-slate-900 border border-teal-500/30 hover:border-teal-400/60 shadow-[0_8px_25px_rgba(20,184,166,0.25)] transition-all duration-300 cursor-pointer group/btn"
                >
                  {/* Gradient animation background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 opacity-80 group-hover/btn:opacity-100 transition-opacity" />

                  {/* Shimmer sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                    <span>SEND MESSAGE</span>
                  </div>
                </motion.button>
              </div>
            </form>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
