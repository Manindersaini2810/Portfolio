import { useEffect, useRef, useState } from 'react';
import MatrixRain from './MatrixRain.jsx';

export default function IntroOverlay({ onDecode, onFinish, onSkip }) {
  const [stage, setStage] = useState('boot');
  const [typed, setTyped] = useState('');
  const timers = useRef([]);
  const finished = useRef(false);

  useEffect(() => {
    const messages = ['> initializing system...', '> decrypting profile...'];
    const speed = 24;

    const typeMessage = (message, delay) => {
      timers.current.push(
        window.setTimeout(() => {
          let index = 0;
          const interval = window.setInterval(() => {
            index += 1;
            setTyped(message.slice(0, index));
            if (index >= message.length) window.clearInterval(interval);
          }, speed);
          timers.current.push(interval);
        }, delay),
      );
    };

    typeMessage(messages[0], 120);
    typeMessage(messages[1], 800);
    timers.current.push(
      window.setTimeout(() => {
        setStage('decode');
        onDecode();
      }, 1600),
      window.setTimeout(() => {
        if (finished.current) return;
        finished.current = true;
        onFinish();
      }, 3200),
    );

    const skip = () => {
      if (finished.current) return;
      finished.current = true;
      timers.current.forEach((timer) => {
        window.clearTimeout(timer);
        window.clearInterval(timer);
      });
      onSkip();
    };

    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('touchstart', skip, { passive: true });

    return () => {
      timers.current.forEach((timer) => {
        window.clearTimeout(timer);
        window.clearInterval(timer);
      });
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('touchstart', skip);
    };
  }, [onDecode, onFinish]);

  return (
    <div
      className={`intro-overlay ${stage === 'decode' ? 'intro-overlay--decode' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Portfolio system startup"
    >
      <MatrixRain
        className="intro-rain"
        opacity={stage === 'boot' ? 0.95 : 0.48}
        speed={1}
        slow={stage === 'decode'}
      />
      <div className="intro-terminal">
        <p>{typed}<span className="cursor-blink">_</span></p>
      </div>
      <p className="intro-skip-hint">press any key to skip</p>
    </div>
  );
}
