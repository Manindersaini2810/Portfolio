import { useEffect, useState } from 'react';
import {
  SCRAMBLE_REVEAL_DELAY_MS,
  SCRAMBLE_STEP_MS,
} from '../config/animation.js';

const glyphs = '01ABCDEF';
const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

export function useScrambleText(value, active) {
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

    if (value.length === 0) {
      setCharacters([]);
      setResolvedCount(0);
      setFlashIndex(-1);
      setRunning(false);
      return undefined;
    }

    let timer;
    let cancelled = false;
    let previousResolvedCount = 0;
    setCharacters(Array.from({ length: value.length }, randomGlyph));
    setResolvedCount(0);
    setFlashIndex(-1);
    setRunning(true);

    const revealNextCharacter = () => {
      if (cancelled) return;
      const nextCount = previousResolvedCount + 1;
      const nextCharacters = Array.from({ length: value.length }, (_, index) =>
        index < nextCount ? value[index] : randomGlyph(),
      );
      setCharacters(nextCharacters);
      setResolvedCount(nextCount);
      setFlashIndex(nextCount === value.length ? -1 : nextCount - 1);
      previousResolvedCount = nextCount;

      if (nextCount === value.length) {
        setRunning(false);
        return;
      }

      timer = window.setTimeout(revealNextCharacter, SCRAMBLE_STEP_MS);
    };

    timer = window.setTimeout(revealNextCharacter, SCRAMBLE_REVEAL_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [active, value]);

  return { characters, resolvedCount, flashIndex, running };
}
