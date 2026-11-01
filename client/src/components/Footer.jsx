import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Manindersaini2810', icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/maninder-saini-448bb4324',
    icon: Linkedin,
  },
  { label: 'Email', href: 'mailto:maninders.it.24@nitj.ac.in', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-7 text-center text-xs text-white/45">
      <nav className="mb-4 flex justify-center gap-5" aria-label="Social links">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className="rounded text-white/55 transition-colors hover:text-[#00ff41]"
          >
            <Icon size={17} />
          </a>
        ))}
      </nav>
      <p>Maninder Singh · BUILD.SECURE.SHIP · {new Date().getFullYear()}</p>
    </footer>
  );
}
