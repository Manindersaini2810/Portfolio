import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { sendContactMessage } from '../api';
import TerminalWindow from '../components/TerminalWindow';

const links = [
  { label: 'GitHub', href: 'https://github.com/Manindersaini2810', icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/maninder-saini-448bb4324',
    icon: Linkedin,
  },
  { label: 'NITJ email', href: 'mailto:maninders.it.24@nitj.ac.in', icon: Mail },
  { label: 'Personal email', href: 'mailto:captionmanindersingh@gmail.com', icon: Mail },
];

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const updateForm = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'The message could not be sent. Please try again.',
      );
    }
  };

  const statusLine = {
    idle: 'contact_form: initialized',
    sending: 'contact_form: sending...',
    success: 'message_sent: success',
    error: 'message_sent: error',
  }[status];

  return (
    <div className="page-enter mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 border border-[#00ff41]/40 bg-[#111] px-5 py-5 shadow-[0_0_18px_rgba(0,255,65,0.07)]">
        <p className="text-xs text-[#00ff41]">~/portfolio/contact.sh</p>
        <h1 className="mt-2 text-2xl font-bold text-white">CONTACT.INTERFACE</h1>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <TerminalWindow title="message.send()">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-xs text-[#9cffac]">
                --name
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={updateForm}
                minLength={2}
                maxLength={100}
                required
                className="w-full rounded border border-white/15 bg-black/40 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00ff41] focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-xs text-[#9cffac]">
                --email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={updateForm}
                maxLength={254}
                required
                className="w-full rounded border border-white/15 bg-black/40 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00ff41] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-xs text-[#9cffac]">
                --message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={updateForm}
                minLength={10}
                maxLength={5000}
                rows={6}
                required
                className="w-full resize-y rounded border border-white/15 bg-black/40 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00ff41] focus:outline-none"
                placeholder="What would you like to build?"
              />
            </div>
            {status === 'error' && (
              <p role="alert" className="text-xs text-red-300">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded bg-[#00ff41] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#7aff91] disabled:cursor-wait disabled:opacity-60"
            >
              <Send size={16} aria-hidden="true" />
              {status === 'sending' ? 'Sending...' : 'Execute Send'}
            </button>
          </form>
        </TerminalWindow>

        <div className="space-y-5">
          <TerminalWindow title="terminal.log">
            <div className="space-y-3 text-xs" aria-live="polite">
              <p className="text-white/65">
                <span className="text-[#00ff41]">$ </span>system_status: online
              </p>
              <p className="text-white/65">
                <span className="text-[#00ff41]">$ </span>{statusLine}
              </p>
              {status === 'error' && (
                <p className="break-words text-red-300">
                  <span className="text-red-400">$ </span>{errorMessage}
                </p>
              )}
            </div>
          </TerminalWindow>

          <TerminalWindow title="connection.links">
            <ul className="space-y-4">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-xs text-white/65 transition-colors hover:text-[#00ff41]"
                  >
                    <Icon size={16} className="shrink-0 text-[#00ff41]" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 text-xs text-white/65">
                <MapPin size={16} className="shrink-0 text-[#00ff41]" aria-hidden="true" />
                India
              </li>
            </ul>
          </TerminalWindow>
        </div>
      </div>
    </div>
  );
}
