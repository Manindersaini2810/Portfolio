import { useEffect, useRef } from 'react';
import { RAIN_SPEED_PX_PER_SEC } from '../config/animation.js';

const characters = '01MANINDERSIGHBCDEF';
const rowHeight = 17;

const randomCharacter = () =>
  characters[Math.floor(Math.random() * characters.length)];

function makeColumn(x, height, initial = false) {
  const speed = RAIN_SPEED_PX_PER_SEC * (0.72 + Math.random() * 0.56);
  const trailLength = Math.floor(10 + Math.random() * 16);

  return {
    x,
    y: initial ? -Math.random() * height : -speed * Math.random() * 1.5,
    speed,
    trailLength,
    glyphs: Array.from({ length: trailLength }, randomCharacter),
    glyphTimer: 0,
    glyphInterval: 150 + Math.random() * 100,
  };
}

function createColumns(width, height) {
  const columns = [];
  let x = 0;
  const mobile = width < 600;

  while (x < width) {
    if (Math.random() > (mobile ? 0.55 : 0.4)) {
      columns.push(makeColumn(x, height, true));
    }
    x += 22 + Math.random() * 6;
  }

  return columns;
}

function resizeCanvas(canvas, context) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  return { width, height, columns: createColumns(width, height) };
}

export default function MatrixRain({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return undefined;

    let dimensions = resizeCanvas(canvas, context);
    let frame = null;
    let previousTimestamp = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const draw = (deltaSeconds = 0) => {
      const { width, height, columns } = dimensions;
      context.clearRect(0, 0, width, height);
      context.font = '12px "JetBrains Mono", monospace';
      context.textBaseline = 'top';

      columns.forEach((column) => {
        column.y += column.speed * deltaSeconds;
        column.glyphTimer += deltaSeconds * 1000;

        if (column.glyphTimer >= column.glyphInterval) {
          column.glyphTimer = 0;
          column.glyphs = Array.from(
            { length: column.trailLength },
            randomCharacter,
          );
          column.glyphInterval = 150 + Math.random() * 100;
        }

        column.glyphs.forEach((glyph, index) => {
          const y = column.y - index * rowHeight;
          if (y < -rowHeight || y > height) return;
          context.globalAlpha = index === 0
            ? 0.95
            : Math.max(0.08, 0.7 * (1 - index / column.trailLength));
          context.fillStyle = '#00ff41';
          context.fillText(glyph, column.x, y);
        });

        if (column.y - column.trailLength * rowHeight > height) {
          const nextColumn = makeColumn(column.x, height);
          Object.assign(column, nextColumn);
        }
      });

      context.globalAlpha = 1;
      const vignette = context.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.18,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.76,
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.68)');
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const animate = (timestamp) => {
      const deltaSeconds = previousTimestamp
        ? Math.min((timestamp - previousTimestamp) / 1000, 0.1)
        : 0;
      previousTimestamp = timestamp;
      draw(deltaSeconds);
      if (!reducedMotion.matches && !document.hidden) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      if (frame !== null || document.hidden) return;
      previousTimestamp = 0;
      if (reducedMotion.matches) {
        draw();
        return;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      previousTimestamp = 0;
    };

    const handleResize = () => {
      dimensions = resizeCanvas(canvas, context);
      if (reducedMotion.matches || document.hidden) {
        draw();
      }
    };
    const handleVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    };
    const handleMotionChange = () => {
      stopAnimation();
      startAnimation();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotion.addEventListener('change', handleMotionChange);
    startAnimation();

    return () => {
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity: 0.3, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
