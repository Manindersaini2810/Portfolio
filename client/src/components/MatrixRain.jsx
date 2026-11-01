import { useEffect, useRef } from 'react';

const symbols = '01010101010101ABCDEF';

function resizeCanvas(canvas, context) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const cellSize = width < 600 ? 23 : 18;

  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  return {
    width,
    height,
    cellSize,
    drops: Array.from(
      { length: Math.ceil(width / cellSize) },
      () => Math.random() * (height / cellSize),
    ),
  };
}

export default function MatrixRain({
  className = '',
  opacity = 0.1,
  speed = 1,
  slow = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return undefined;

    let dimensions = resizeCanvas(canvas, context);
    let frame = 0;
    let previousFrame = 0;
    let frameCount = 0;

    const handleResize = () => {
      dimensions = resizeCanvas(canvas, context);
      context.clearRect(0, 0, dimensions.width, dimensions.height);
    };

    const draw = (timestamp) => {
      frame = requestAnimationFrame(draw);
      if (timestamp - previousFrame < 16) return;
      previousFrame = timestamp;

      const { width, height, cellSize, drops } = dimensions;
      context.fillStyle = 'rgba(0, 0, 0, 0.12)';
      context.fillRect(0, 0, width, height);
      frameCount += 1;
      const activeSpeed = speed * (slow ? 0.35 : 1);

      drops.forEach((drop, column) => {
        if (frameCount % Math.max(1, Math.round(3 / activeSpeed)) !== 0) return;
        const glyph = symbols[Math.floor(Math.random() * symbols.length)];
        const x = column * cellSize;
        const y = drop * cellSize;
        const isLead = Math.random() > 0.84;
        context.fillStyle = isLead ? '#c2ffd0' : '#00ff41';
        context.globalAlpha = isLead ? 0.9 : 0.6;
        context.font = `${cellSize}px "JetBrains Mono", monospace`;
        context.fillText(glyph, x, y);

        if (y > height && Math.random() > 0.975) {
          dimensions.drops[column] = 0;
        } else {
          dimensions.drops[column] += activeSpeed * 0.28;
        }
      });
      context.globalAlpha = 1;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [slow, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
