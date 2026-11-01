import { useEffect, useRef, useState } from 'react';
import { ScanLine } from 'lucide-react';

const corners = ['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'];

export default function HeroPortrait({ reveal }) {
  const frameRef = useRef(null);
  const [imageMissing, setImageMissing] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const glitchTimer = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(glitchTimer.current);
    },
    [],
  );

  const handlePointerMove = (event) => {
    if (!frameRef.current || event.pointerType === 'touch') return;
    const bounds = frameRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    frameRef.current.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${y * -9}deg)`;
  };

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'touch') return;
    setGlitching(true);
    window.clearTimeout(glitchTimer.current);
    glitchTimer.current = window.setTimeout(() => setGlitching(false), 300);
  };

  const resetTilt = () => {
    if (frameRef.current) frameRef.current.style.transform = '';
  };

  return (
    <figure className="flex flex-col items-center">
      <div
        ref={frameRef}
        className={`portrait-frame ${reveal ? 'portrait-frame--reveal' : ''} ${
          glitching ? 'portrait-frame--glitch' : ''
        }`}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={resetTilt}
        onBlur={resetTilt}
      >
        {imageMissing ? (
          <div className="portrait-placeholder" role="img" aria-label="Profile photo unavailable">
            <ScanLine size={38} aria-hidden="true" />
            <span>[ profile.jpg not found ]</span>
          </div>
        ) : (
          <img
            src="/images/hero/profile.png"
            alt="Portrait of Maninder Singh"
            width="280"
            height="280"
            loading="eager"
            className="portrait-image"
            onError={() => setImageMissing(true)}
          />
        )}
        {!imageMissing && (
          <>
            <img
              src="/images/hero/profile.png"
              alt=""
              aria-hidden="true"
              className="portrait-glitch portrait-glitch--red"
            />
            <img
              src="/images/hero/profile.png"
              alt=""
              aria-hidden="true"
              className="portrait-glitch portrait-glitch--blue"
            />
          </>
        )}
        <div className="portrait-scanlines" aria-hidden="true" />
        {corners.map((corner) => (
          <span key={corner} className={`portrait-corner ${corner}`} aria-hidden="true" />
        ))}
      </div>
      <figcaption className="mt-4 text-center text-[10px] tracking-wide text-[#9cffac] sm:text-xs">
        ID: maninder_singh // status: online
      </figcaption>
    </figure>
  );
}
