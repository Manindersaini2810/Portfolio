import { useEffect, useRef, useState } from 'react';
import MatrixRain from './MatrixRain.jsx';
import TypewriterCursor from './TypewriterCursor.jsx';
import { BOOT_SEQUENCE_TOTAL_MS } from '../config/animation.js';
import { useTypewriter } from '../hooks/useTypewriter.js';

export default function IntroOverlay({ onDecode, onFinish, onSkip }) {
  const [stage, setStage] = useState('boot');
  const finished = useRef(false);
  const bootTyping = useTypewriter('> SYSTEM READY', stage === 'boot');

  useEffect(() => {
    if (stage !== 'boot' || !bootTyping.isComplete) return;
    setStage('decode');
    onDecode();
  }, [bootTyping.isComplete, onDecode, stage]);

  useEffect(() => {
    const finishTimer = window.setTimeout(() => {
      if (finished.current) return;
      finished.current = true;
      onFinish();
    }, BOOT_SEQUENCE_TOTAL_MS);
    const skip = () => {
      if (finished.current) return;
      finished.current = true;
      window.clearTimeout(finishTimer);
      onSkip();
    };

    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('touchstart', skip, { passive: true });

    return () => {
      window.clearTimeout(finishTimer);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('touchstart', skip);
    };
  }, [onFinish, onSkip]);

  return (
    <div
      className={`intro-overlay ${stage === 'decode' ? 'intro-overlay--decode' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Portfolio system startup"
    >
      <MatrixRain className="intro-rain" />
      <div className="intro-terminal">
        <p>
          {bootTyping.visibleLines[0]}
          {bootTyping.isTyping && <TypewriterCursor />}
        </p>
      </div>
      <p className="intro-skip-hint">press any key to skip</p>
    </div>
  );
}
