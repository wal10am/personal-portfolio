import { useEffect, useState } from 'react';

const INITIAL_OFFSET = { x: 0, y: 0 };

/**
 * Tracks mouse position and returns a small { x, y } pixel offset (scaled
 * by `strength`) for a subtle parallax effect on the hero section.
 * Respects prefers-reduced-motion: if the user has requested reduced
 * motion, no mousemove listener is attached and the offset stays at
 * { x: 0, y: 0 } for the lifetime of the component.
 */
export function useParallax(strength = 20) {
  const [offset, setOffset] = useState(INITIAL_OFFSET);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setOffset(INITIAL_OFFSET);
      return undefined;
    }

    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return offset;
}
