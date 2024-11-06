import { cn } from "../../utils/cn";
import { useEffect, useState } from "react";

export const SparklesCore = (props: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const {
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 1.2,
    className,
    particleColor = "#fff",
  } = props;
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000 * particleDensity);
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random(),
    }));
    setParticles(newParticles);
  }, [maxSize, minSize, particleDensity]);

  return (
    <div className={cn("fixed inset-0 w-full h-full", className)} style={{ background }}>
      {particles.map((particle, idx) => (
        <div
          key={idx}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particleColor,
            opacity: particle.opacity,
            animation: "sparkle 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
};