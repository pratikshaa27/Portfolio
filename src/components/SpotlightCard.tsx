import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  tilt?: boolean;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(20, 184, 166, 0.15)",
  borderColor = "rgba(45, 212, 191, 0.4)",
  tilt = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Framer motion tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], tilt ? ["7deg", "-7deg"] : ["0deg", "0deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], tilt ? ["-7deg", "7deg"] : ["0deg", "0deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    setPosition({ x: clientX, y: clientY });

    if (tilt) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = clientX / width - 0.5;
      const mouseY = clientY / height - 0.5;
      x.set(mouseX);
      y.set(mouseY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tilt) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`glass-panel relative overflow-hidden rounded-3xl transition-all duration-300 ${onClick ? "cursor-pointer" : ""
        } ${className}`}
    >
      {/* Specular Frosted Glass Highlights */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/35 dark:via-white/25 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-white/[0.12] via-white/[0.02] to-transparent rounded-t-3xl" />

      {/* Radial Spotlight Layer tracking cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.8 : 0,
          background: `radial-gradient(320px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Dynamic Interactive Border Glow Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 70%)`,
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content wrapper with perspective separation */}
      <div
        className="relative z-10"
        style={{
          transform: isHovered && tilt ? "translateZ(12px)" : "translateZ(0px)",
          transition: "transform 0.25s ease-out",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
