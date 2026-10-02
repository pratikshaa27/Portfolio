'use client';

import React, { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // Distance pull multiplier
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  strength = 0.35,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 18, mass: 0.5 }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
