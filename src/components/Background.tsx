/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulseDirection: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;

        // Soft pink, cherry-blossom rose, and pure white star colors matching our gorgeous plum palette
        const colors = ["rgba(236, 72, 153, ", "rgba(244, 63, 94, ", "rgba(255, 255, 255, "];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mX: number, mY: number) {
        // Star movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Soft pulse effect
        this.alpha += this.pulseDirection * 0.005;
        if (this.alpha > 0.8 || this.alpha < 0.1) {
          this.pulseDirection *= -1;
        }

        // Parallax offset based on mouse position
        const maxOffset = 15; // Max shift pixels
        const targetOffsetX = ((mX - width / 2) / (width / 2)) * maxOffset * (this.size * 0.5);
        const targetOffsetY = ((mY - height / 2) / (height / 2)) * maxOffset * (this.size * 0.5);

        // Smooth interpolate to offset position
        this.baseX += (targetOffsetX - (this.x - this.baseX)) * 0.05;
        this.baseY += (targetOffsetY - (this.y - this.baseY)) * 0.05;
      }

      draw(c: CanvasRenderingContext2D, isLight: boolean) {
        c.save();
        c.beginPath();
        c.arc(this.x + (this.baseX - this.x), this.y + (this.baseY - this.y), this.size, 0, Math.PI * 2);
        
        let fillColor = `${this.color}${this.alpha})`;
        if (isLight) {
          if (this.color.includes("236")) {
            fillColor = `rgba(236, 72, 153, ${this.alpha * 0.75})`;
          } else if (this.color.includes("244")) {
            fillColor = `rgba(244, 63, 94, ${this.alpha * 0.75})`;
          } else {
            fillColor = `rgba(251, 113, 133, ${this.alpha * 0.75})`;
          }
        }
        c.fillStyle = fillColor;
        // Add a tiny glow to larger particles
        if (this.size > 1.8) {
          c.shadowBlur = 8;
          c.shadowColor = isLight ? "#EC4899" : "#F43F5E";
        }
        c.fill();
        c.restore();
      }
    }

    // Initialize particles
    const particleCount = Math.min(100, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Interactive mouse circle easing
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;

    // Drawing loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates for smooth glow transition
      currentMouseX += (targetMousePos.current.x - currentMouseX) * 0.08;
      currentMouseY += (targetMousePos.current.y - currentMouseY) * 0.08;
      setMousePos({ x: currentMouseX, y: currentMouseY });

      // Detect theme mode
      const isLight = document.documentElement.classList.contains("light");

      // Draw subtle futuristic coordinates grid
      ctx.strokeStyle = isLight ? "rgba(15, 23, 42, 0.025)" : "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particle constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(currentMouseX, currentMouseY);
        p1.draw(ctx, isLight);

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isLight
              ? `rgba(139, 92, 246, ${alpha})`
              : `rgba(236, 72, 153, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Subtle cybernetic glowing accent arcs/lines (abstract tech)
      ctx.beginPath();
      ctx.arc(width * 0.1, height * 0.2, 300, 0, Math.PI * 0.5);
      ctx.strokeStyle = isLight ? "rgba(79, 70, 229, 0.03)" : "rgba(99, 102, 241, 0.02)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width * 0.9, height * 0.8, 400, Math.PI, Math.PI * 1.5);
      ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.03)" : "rgba(56, 189, 248, 0.02)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-bg overflow-hidden pointer-events-none">
      {/* Space background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Dynamic ambient background gradients for organic cosmic look */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EC4899] opacity-5 blur-[140px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#F43F5E] opacity-5 blur-[160px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "-4s" }} />

      {/* Cybernetic horizontal laser separator lines */}
      <div className="absolute inset-x-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-x-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}
