import { useEffect, useRef, useState } from 'react';

const RESET_STYLE = { transform: 'none' };

/**
 * Returns a ref + mouse handlers that produce a subtle 3D tilt transform
 * for project cards as the pointer moves across them. Disabled entirely
 * (no transform is ever computed) on touch devices and when the user has
 * requested prefers-reduced-motion, so `style` simply stays at its
 * `transform: none` reset value.
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);
  const [style, setStyle] = useState(RESET_STYLE);
  const enabledRef = useRef(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    enabledRef.current = !prefersReducedMotion && !isTouchDevice;

    if (!enabledRef.current) {
      setStyle(RESET_STYLE);
    }
  }, []);

  const onMouseMove = (event) => {
    if (!enabledRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * maxTilt;
    const rotateY = (px - 0.5) * maxTilt;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const onMouseLeave = () => {
    if (!enabledRef.current) return;
    setStyle(RESET_STYLE);
  };

  return { ref, style, onMouseMove, onMouseLeave };
}
