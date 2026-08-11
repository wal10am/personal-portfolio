import { useEffect, useState } from 'react';

/**
 * Returns how far down the page has been scrolled, as a 0-100 percentage,
 * updated on scroll/resize via a rAF-throttled listener.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    const updateProgress = () => {
      frame = null;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    const handleScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}
