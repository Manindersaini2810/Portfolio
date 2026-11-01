import { useEffect, useState } from 'react';

const glyphs = '01ABCDEF';
const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

export function useScrambleText(value, active, duration = 1450) {
  const [characters, setCharacters] = useState(() => value.split(''));
  const [resolvedCount, setResolvedCount] = useState(value.length);
  const [flashIndex, setFlashIndex] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!active) {
      setCharacters(value.split(''));
      setResolvedCount(value.length);
      setFlashIndex(-1);
      setRunning(false);
      return undefined;
    }

    let frame = 0;
    let previousResolvedCount = 0;
    let lastUpdate = 0;
    const startedAt = performance.now();
    setCharacters(Array.from({ length: value.length }, randomGlyph));
    setResolvedCount(0);
    setFlashIndex(-1);
    setRunning(true);

    const animate = (now) => {
      if (now - lastUpdate >= 28) {
        lastUpdate = now;
        const progress = Math.min((now - startedAt) / duration, 1);
        const nextCount = Math.floor(progress * value.length);
        const nextCharacters = Array.from({ length: value.length }, (_, index) =>
          index < nextCount ? value[index] : randomGlyph(),
        );
        if (progress === 1) nextCharacters.splice(0, value.length, ...value);

        setCharacters(nextCharacters);
        setResolvedCount(nextCount);
        setFlashIndex(nextCount > previousResolvedCount ? nextCount - 1 : -1);
        previousResolvedCount = nextCount;
        if (progress === 1) {
          setRunning(false);
          return;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, value]);

  return { characters, resolvedCount, flashIndex, running };
}
