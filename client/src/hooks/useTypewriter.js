import { useEffect, useState } from 'react';
import {
  LINE_PAUSE_MS,
  TYPE_SPEED_JITTER_MS,
  TYPE_SPEED_MS,
} from '../config/animation.js';

function normalizeLines(lines) {
  const source = Array.isArray(lines) ? lines : [lines];
  return source.map((line) => {
    if (typeof line === 'string') {
      return { text: line, pauseAfterMs: LINE_PAUSE_MS };
    }

    return {
      text: String(line.text ?? ''),
      pauseAfterMs: line.pauseAfterMs ?? LINE_PAUSE_MS,
    };
  });
}

export function useTypewriter(lines, active = true) {
  const normalizedLines = normalizeLines(lines);
  const sequenceKey = JSON.stringify(normalizedLines);
  const [progress, setProgress] = useState({
    sequenceKey: '',
    lineIndex: 0,
    typed: '',
    isTyping: false,
    isComplete: false,
  });

  useEffect(() => {
    let timer;
    let cancelled = false;
    const reset = {
      sequenceKey,
      lineIndex: 0,
      typed: '',
      isTyping: false,
      isComplete: false,
    };

    if (!active) {
      setProgress(reset);
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress({
        ...reset,
        lineIndex: normalizedLines.length,
        isComplete: true,
      });
      return undefined;
    }

    setProgress({ ...reset, isTyping: normalizedLines.length > 0 });

    const finish = () => {
      setProgress({
        sequenceKey,
        lineIndex: normalizedLines.length,
        typed: '',
        isTyping: false,
        isComplete: true,
      });
    };

    const typeLine = (lineIndex, characterIndex) => {
      if (cancelled) return;
      const line = normalizedLines[lineIndex];
      if (!line) {
        finish();
        return;
      }

      if (characterIndex >= line.text.length) {
        if (lineIndex === normalizedLines.length - 1) {
          finish();
          return;
        }

        setProgress({
          sequenceKey,
          lineIndex,
          typed: line.text,
          isTyping: false,
          isComplete: false,
        });
        timer = window.setTimeout(() => {
          if (cancelled) return;
          const nextLineIndex = lineIndex + 1;
          setProgress({
            sequenceKey,
            lineIndex: nextLineIndex,
            typed: '',
            isTyping: true,
            isComplete: false,
          });
          typeLine(nextLineIndex, 0);
        }, line.pauseAfterMs);
        return;
      }

      const jitter = Math.round(
        (Math.random() * 2 - 1) * TYPE_SPEED_JITTER_MS,
      );
      timer = window.setTimeout(() => {
        if (cancelled) return;
        const nextCharacterIndex = characterIndex + 1;
        setProgress({
          sequenceKey,
          lineIndex,
          typed: line.text.slice(0, nextCharacterIndex),
          isTyping: nextCharacterIndex < line.text.length,
          isComplete: false,
        });
        typeLine(lineIndex, nextCharacterIndex);
      }, Math.max(0, TYPE_SPEED_MS + jitter));
    };

    if (normalizedLines.length === 0) {
      finish();
    } else {
      typeLine(0, 0);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [active, sequenceKey]);

  const currentProgress = progress.sequenceKey === sequenceKey
    ? progress
    : {
        lineIndex: 0,
        typed: '',
        isTyping: active,
        isComplete: false,
      };

  const visibleLines = normalizedLines.map((line, index) => {
    if (index < currentProgress.lineIndex) return line.text;
    if (index === currentProgress.lineIndex) return currentProgress.typed;
    return '';
  });

  return {
    visibleLines,
    currentLineIndex: currentProgress.lineIndex,
    isTyping: currentProgress.isTyping,
    isComplete: currentProgress.isComplete,
  };
}
