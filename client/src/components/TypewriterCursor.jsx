import { CURSOR_BLINK_MS } from '../config/animation.js';

export default function TypewriterCursor() {
  return (
    <span
      className="typewriter-cursor"
      style={{ animationDuration: `${CURSOR_BLINK_MS}ms` }}
      aria-hidden="true"
    >
      █
    </span>
  );
}
