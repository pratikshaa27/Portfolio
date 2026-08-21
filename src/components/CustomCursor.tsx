/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"default" | "hover" | "text" | "click" | "project">("default");
  const [isVisible, setIsVisible] = useState(false);

  // High performance motion values
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Smooth physics
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Subtle soft aura spring
  const auraSpringConfig = { damping: 32, stiffness: 180, mass: 0.6 };
  const auraXSpring = useSpring(cursorX, auraSpringConfig);
  const auraYSpring = useSpring(cursorY, auraSpringConfig);

  useEffect(() => {
    // Hide default cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setHoverState("click");
    const handleMouseUp = () => setHoverState("default");

    // Dynamic hover states on various elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // 1. Project hover states
      if (target.closest("[data-cursor='project']")) {
        setHoverState("project");
        return;
      }

      // 2. Button / link / interactive states
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer") ||
        target.closest("[aria-label]")
      ) {
        setHoverState("hover");
        return;
      }

      // 3. Text / input editing states
      if (
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("p") ||
        target.closest("h1") ||
        target.closest("h2") ||
        target.closest("h3") ||
        target.closest("h4") ||
        target.closest("strong") ||
        target.closest("span:not(.cursor-pointer)")
      ) {
        setHoverState("text");
        return;
      }

      setHoverState("default");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Micro-small teal cursor styles
  const getCursorStyle = () => {
    switch (hoverState) {
      case "click":
        return {
          width: 8,
          height: 8,
          backgroundColor: "rgba(20, 184, 166, 0.8)",
          borderColor: "#14B8A6",
          borderWidth: "1px",
        };
      case "hover":
        return {
          width: 20,
          height: 20,
          backgroundColor: "rgba(20, 184, 166, 0.08)",
          borderColor: "#14B8A6",
          borderWidth: "1px",
        };
      case "text":
        return {
          width: 2,
          height: 14,
          borderRadius: "1px",
          backgroundColor: "#14B8A6",
          borderColor: "transparent",
          borderWidth: "0px",
        };
      case "project":
        return {
          width: 24,
          height: 24,
          backgroundColor: "rgba(20, 184, 166, 0.1)",
          borderColor: "#14B8A6",
          borderWidth: "1px",
        };
      case "default":
      default:
        return {
          width: 12,
          height: 12,
          backgroundColor: "transparent",
          borderColor: "rgba(45, 212, 191, 0.5)",
          borderWidth: "1px",
        };
    }
  };

  const cursorStyle = getCursorStyle();

  return (
    <>
      {/* Outer Ring Follower */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorStyle.width,
          height: cursorStyle.height,
          borderColor: cursorStyle.borderColor,
          borderWidth: cursorStyle.borderWidth,
          backgroundColor: cursorStyle.backgroundColor,
          borderRadius: cursorStyle.borderRadius,
        }}
        animate={{
          scale: hoverState === "click" ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* Inner Teal Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-teal-400 rounded-full pointer-events-none z-[10000] hidden md:block shadow-[0_0_8px_#2dd4bf]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: hoverState === "text" || hoverState === "project" ? 0 : 1,
          scale: hoverState === "click" ? 1.3 : 1,
        }}
      />

      {/* Interactive indicator for projects */}
      {hoverState === "project" && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10001] hidden md:flex items-center justify-center font-mono text-[8px] font-bold text-white tracking-widest uppercase"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            width: 64,
            height: 64,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          VIEW
        </motion.div>
      )}
    </>
  );
}
