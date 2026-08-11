import { useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = {
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px',
};

/**
 * Returns a ref to attach to an element and a `visible` boolean that flips
 * to true once the element scrolls into view, for driving fade/slide-in
 * reveal animations. Respects prefers-reduced-motion: when the user has
 * requested reduced motion, `visible` is set to true immediately and no
 * IntersectionObserver is created, so content simply renders in its final
 * state with no animation.
 */
export function useScrollReveal(options = DEFAULT_OPTIONS) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}
