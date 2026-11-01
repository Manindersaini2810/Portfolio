export default function TerminalWindow({
  title,
  children,
  className = '',
}) {
  return (
    <section className={`terminal-card overflow-hidden rounded-xl ${className}`}>
      <header className="flex items-center gap-2 border-b border-white/10 bg-[#151515] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" aria-hidden="true" />
        <span className="ml-3 text-xs text-white/55">{title}</span>
      </header>
      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}
