import { useScrollProgress } from '../hooks/useScrollProgress';

const TRACK_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '3px',
  zIndex: 'var(--z-scroll-progress)',
  background: 'transparent',
  pointerEvents: 'none',
};

const FILL_BASE_STYLE = {
  height: '100%',
  background: 'var(--gradient-accent)',
  transformOrigin: 'left',
  willChange: 'width',
};

function ScrollProgress() {
  const progress = useScrollProgress();
  const clamped = Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0;

  return (
    <div
      className="scroll-progress"
      style={TRACK_STYLE}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
    >
      <div
        className="scroll-progress__fill"
        style={{ ...FILL_BASE_STYLE, width: `${clamped}%` }}
      />
    </div>
  );
}

export default ScrollProgress;
