import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { useTheme } from '../../../context/ThemeContext';

interface AnimationContextType {
  createParticles: (containerId: string) => void;
  removeParticles: (containerId: string) => void;
  mousePosition: { x: number; y: number };
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const { actualTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createParticles = (containerId: string) => {
    // Remove any existing particles container with this ID
    removeParticles(containerId);

    // Create new particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fixed inset-0 overflow-hidden pointer-events-none z-0';
    particlesContainer.id = containerId;

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = `floating-particle ${
        actualTheme === 'dark' ? 'floating-particle-dark' : 'floating-particle-light'
      }`;

      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random animation
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particle.style.animationDuration = `${2 + Math.random() * 3}s`;

      particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
  };

  const removeParticles = (containerId: string) => {
    const particlesContainer = document.getElementById(containerId);
    if (particlesContainer) {
      particlesContainer.remove();
    }
  };

  const value = {
    createParticles,
    removeParticles,
    mousePosition,
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
