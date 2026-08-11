import { useEffect, useState } from 'react';

// Fires when a section crosses the vertical midline of the viewport, so the
// "active" nav link tracks whichever section is roughly centered rather than
// waiting for the whole section to enter/leave.
const OBSERVER_OPTIONS = {
  rootMargin: '-45% 0px -50% 0px',
  threshold: 0,
};

/**
 * Tracks which of the given section ids is currently active in the viewport
 * via IntersectionObserver, for driving nav "active link" highlighting.
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, OBSERVER_OPTIONS);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeId;
}
