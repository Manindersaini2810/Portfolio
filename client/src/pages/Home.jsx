import { useContext, useState } from 'react';
import { ArrowDownToLine, ArrowRight, Award, FolderGit2, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { IntroContext } from '../context/IntroContext.js';
import HeroPortrait from '../components/HeroPortrait.jsx';
import ScrambledText from '../components/ScrambledText.jsx';
import TerminalWindow from '../components/TerminalWindow.jsx';
import TypewriterCursor from '../components/TypewriterCursor.jsx';
import { COMMAND_TO_OUTPUT_MS, LINE_PAUSE_MS } from '../config/animation.js';
import { useTypewriter } from '../hooks/useTypewriter.js';

const resumeUrl = '/resume/Maninder_Singh_Resume.pdf';
const transcript = [
  ['whoami', 'Maninder Singh, Full-Stack Developer | Cloud Security & ML Enthusiast'],
  [
    'cat about.txt',
    'Third-year B.Tech IT student at NIT Jalandhar; builds full-stack apps, REST APIs and cloud security labs; 400+ DSA problems solved.',
  ],
  ['ls -la portfolio/', 'projects/    certs/    resume/'],
  ['echo "BUILD.SECURE.SHIP"', 'BUILD.SECURE.SHIP'],
];
const achievements = [
  '400+ LeetCode problems solved with a 1600+ contest rating',
  'Core Member of Cybernauts Society',
  'Qualified for the Amazon ML Summer School 2026 selection test',
  'Built an AI-based Sign Language Translation System at Hack Helix 2026',
];
const quickLinks = [
  {
    to: '/projects.sys',
    command: './projects.sys',
    description: 'Inspect shipped projects and source code.',
    icon: FolderGit2,
  },
  {
    to: '/certs.dat',
    command: './certs.dat',
    description: 'Browse certifications and credentials.',
    icon: Award,
  },
];
const transcriptLines = transcript.flatMap(([command, output], index) => [
  { text: `$ ${command}`, pauseAfterMs: COMMAND_TO_OUTPUT_MS },
  {
    text: output,
    pauseAfterMs: index === transcript.length - 1 ? 0 : LINE_PAUSE_MS,
  },
]);
const promptCommands =
  'Commands: help, whoami, about, projects, certs, resume, contact, skills, github';

function CommandHistoryEntry({ entry }) {
  const lines = [
    { text: `$ ${entry.input}`, pauseAfterMs: COMMAND_TO_OUTPUT_MS },
    { text: entry.output, pauseAfterMs: 0 },
  ];
  const typing = useTypewriter(lines);

  return (
    <div>
      <p className="text-[#00ff41]">
        {typing.visibleLines[0]}
        {typing.currentLineIndex === 0 && typing.isTyping && <TypewriterCursor />}
      </p>
      <p className="whitespace-pre-wrap pl-3 text-white/75">
        {typing.visibleLines[1]}
        {typing.currentLineIndex === 1 && typing.isTyping && <TypewriterCursor />}
      </p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { phase, hasDecoded } = useContext(IntroContext);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isIntroFinished = phase === 'done' || phase === 'skipped';
  const transcriptTyping = useTypewriter(transcriptLines, isIntroFinished);

  const executeCommand = (event) => {
    event.preventDefault();
    const input = command.trim();
    if (!input) return;
    setHistoryIndex(-1);
    setCommand('');

    const knownCommands = ['help', 'whoami', 'about', 'projects', 'certs', 'resume', 'contact', 'skills', 'github'];
    const action = input.toLowerCase();
    if (action === 'clear') {
      setHistory([]);
      return;
    }

    if (!knownCommands.includes(action)) {
      setHistory((items) => [...items, { input, output: `command not found: ${input}. Type "help".` }]);
      return;
    }

    const responses = {
      help: promptCommands,
      whoami: 'Maninder Singh — Full-Stack Developer | Cloud Security & ML Enthusiast',
      about:
        'Third-year B.Tech IT student at NIT Jalandhar. I build full-stack apps, REST APIs and cloud security labs; 400+ DSA problems solved.',
      skills: 'React · Node.js · Express · MongoDB · Azure · Microsoft Sentinel · Python · PyTorch',
    };

    if (action === 'projects') {
      setHistory((items) => [...items, { input, output: 'Opening ./projects.sys ...' }]);
      navigate('/projects.sys');
    } else if (action === 'certs') {
      setHistory((items) => [...items, { input, output: 'Opening ./certs.dat ...' }]);
      navigate('/certs.dat');
    } else if (action === 'contact') {
      setHistory((items) => [...items, { input, output: 'Opening ./contact.sh ...' }]);
      navigate('/contact.sh');
    } else if (action === 'resume') {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
      setHistory((items) => [...items, { input, output: 'Opening ./resume.pdf in a new tab.' }]);
    } else if (action === 'github') {
      window.open('https://github.com/Manindersaini2810', '_blank', 'noopener,noreferrer');
      setHistory((items) => [...items, { input, output: 'Opening github.com/Manindersaini2810 ...' }]);
    } else {
      setHistory((items) => [...items, { input, output: responses[action] }]);
    }
  };

  const handleHistory = (event) => {
    if (event.key === 'ArrowUp' && history.length > 0) {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setCommand(history[history.length - 1 - nextIndex].input);
    } else if (event.key === 'ArrowDown' && historyIndex >= 0) {
      event.preventDefault();
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setCommand(nextIndex < 0 ? '' : history[history.length - 1 - nextIndex].input);
    }
  };

  return (
    <div className="page-enter mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <section className="grid items-center gap-8 lg:grid-cols-[320px_1fr]" aria-label="Introduction">
        <HeroPortrait reveal={phase === 'decode' || (phase === 'done' && hasDecoded)} />

        <div className="min-w-0">
          <p className="mb-3 text-xs text-[#00ff41]">NIT Jalandhar · India</p>
          <h1
            aria-label="MANINDER SINGH — Full-Stack Developer | Cloud Security & ML Enthusiast"
            className="mb-5 text-2xl font-bold leading-tight text-white sm:text-3xl"
          >
            <ScrambledText active={phase === 'decode'}>
              MANINDER SINGH
            </ScrambledText>
            <span className="mt-2 block text-sm font-medium leading-7 text-[#00ff41] sm:text-base">
              <ScrambledText active={phase === 'decode'}>
                Full-Stack Developer | Cloud Security &amp; ML Enthusiast
              </ScrambledText>
            </span>
          </h1>

          <TerminalWindow title="terminal.app">
            <div className="space-y-4 text-[11px] leading-5 sm:text-xs">
              <div className="sr-only">
                {transcript.map(([cmd, output]) => (
                  <p key={cmd}>
                    ${cmd} {output}
                  </p>
                ))}
              </div>
              <div aria-hidden="true">
                {transcriptLines.map((line, index) => {
                  const text = transcriptTyping.visibleLines[index];
                  const current = transcriptTyping.currentLineIndex === index;
                  if (!text && !current) return null;

                  return (
                    <p
                      className={
                        index % 2 === 0
                          ? 'text-[#00ff41]'
                          : 'mb-3 whitespace-pre-wrap pl-3 text-white/75'
                      }
                      key={`${index}-${line.text}`}
                    >
                      {text}
                      {current && transcriptTyping.isTyping && <TypewriterCursor />}
                    </p>
                  );
                })}
              </div>

              {transcriptTyping.isComplete && (
                <div className="border-t border-white/10 pt-3">
                  <div className="mb-3 space-y-3" aria-live="polite">
                    {history.map((entry, index) => (
                      <CommandHistoryEntry
                        key={`${entry.input}-${index}`}
                        entry={entry}
                      />
                    ))}
                  </div>
                  <form onSubmit={executeCommand} className="flex items-center gap-2">
                    <label htmlFor="terminal-command" className="shrink-0 text-[#00ff41]">
                      $ _
                    </label>
                    <input
                      id="terminal-command"
                      value={command}
                      onChange={(event) => setCommand(event.target.value)}
                      onKeyDown={handleHistory}
                      className="min-w-0 flex-1 border-0 bg-transparent text-xs text-white outline-none placeholder:text-white/25"
                      aria-label="Enter a portfolio terminal command"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <button
                      type="submit"
                      className="rounded border border-[#00ff41]/50 px-2 py-1 text-[10px] text-[#00ff41] hover:bg-[#00ff41] hover:text-black"
                    >
                      RUN
                    </button>
                  </form>
                  <p className="mt-2 text-[10px] text-white/35">
                    Type <kbd className="text-[#9cffac]">help</kbd> to list commands. Use ↑ / ↓ for history.
                  </p>
                </div>
              )}
            </div>
          </TerminalWindow>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/projects.sys')}
              className="inline-flex items-center gap-2 rounded border border-[#00ff41]/60 bg-[#00ff41] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#7aff91]"
            >
              <FolderGit2 size={15} aria-hidden="true" />
              ./projects.sys
            </button>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#00ff41]/50 px-4 py-2.5 text-xs text-[#00ff41] transition hover:bg-[#00ff41] hover:text-black"
            >
              <ArrowDownToLine size={15} aria-hidden="true" />
              ./resume.pdf
            </a>
          </div>
          <a
            href={resumeUrl}
            download
            className="mt-3 inline-block text-[10px] text-white/45 underline decoration-white/20 underline-offset-4 hover:text-[#00ff41]"
          >
            Download resume
          </a>
        </div>
      </section>

      <section aria-labelledby="quick-links-heading">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[#00ff41]">~/</span>
          <h2 id="quick-links-heading" className="text-sm font-bold text-white">
            quick_access
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map(({ to, command: label, description, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="terminal-card group flex min-h-32 flex-col justify-between rounded-lg p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#00ff41]">{label}</span>
                <Icon size={18} className="text-[#00ff41]" aria-hidden="true" />
              </div>
              <div className="flex items-end justify-between gap-3">
                <p className="text-xs leading-5 text-white/55">{description}</p>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-[#00ff41]"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-card group flex min-h-32 flex-col justify-between rounded-lg p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#00ff41]">./resume.pdf</span>
              <ArrowDownToLine size={18} className="text-[#00ff41]" aria-hidden="true" />
            </div>
            <p className="text-xs leading-5 text-white/55">Open or download my resume.</p>
          </a>
        </div>
      </section>

      <TerminalWindow title="achievements.log" className="max-w-4xl">
        <ul className="space-y-4 text-xs leading-6 text-white/75 sm:text-sm">
          {achievements.map((achievement) => (
            <li key={achievement} className="flex gap-3">
              <ShieldCheck
                size={17}
                className="mt-1 shrink-0 text-[#00ff41]"
                aria-hidden="true"
              />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </TerminalWindow>
    </div>
  );
}
