import { useScrambleText } from '../hooks/useScrambleText.js';

export default function ScrambledText({ children, active, className = '' }) {
  const value = String(children);
  const { characters, resolvedCount, flashIndex } = useScrambleText(value, active);

  return (
    <span className={className} aria-hidden="true">
      {characters.map((character, index) => (
        <span
          key={index}
          className={index === flashIndex ? 'scramble-flash' : undefined}
        >
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
      {resolvedCount === 0 && value.length === 0 ? value : null}
    </span>
  );
}
