import { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { IntroContext } from '../context/IntroContext.js';
import ScrambledText from './ScrambledText.jsx';

const resumeUrl = '/resume/Maninder_Singh_Resume.pdf';

const navItems = [
  { label: './home.exe', to: '/home.exe', end: true },
  { label: './projects.sys', to: '/projects.sys', end: false },
  { label: './certs.dat', to: '/certs.dat', end: false },
  { label: './contact.sh', to: '/contact.sh', end: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { phase } = useContext(IntroContext);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5 px-4 sm:px-6">
        <Link
          to="/home.exe"
          onClick={closeMenu}
          className="whitespace-nowrap text-sm font-bold text-[#00ff41] sm:text-base"
          aria-label="root at portfolio home"
        >
          &gt;_ root@portfolio<span className="cursor-blink">_</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              aria-label={item.label}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-xs transition-colors ${
                  isActive || (item.end && location.pathname === '/')
                    ? 'bg-[#00ff41] font-bold text-black'
                    : 'text-white/65 hover:bg-white/5 hover:text-[#00ff41]'
                }`
              }
            >
              <ScrambledText active={phase === 'decode'} duration={900}>
                {item.label}
              </ScrambledText>
            </NavLink>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-3 py-2 text-xs text-white/65 transition-colors hover:bg-white/5 hover:text-[#00ff41]"
          >
            ./resume.pdf
          </a>
        </nav>

        <button
          type="button"
          className="rounded p-2 text-[#00ff41] hover:bg-white/5 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#0a0a0a] px-4 py-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  aria-label={item.label}
                  className={({ isActive }) =>
                    `block rounded px-3 py-3 text-sm ${
                      isActive || (item.end && location.pathname === '/')
                        ? 'bg-[#00ff41] font-bold text-black'
                        : 'text-white/70 hover:bg-white/5 hover:text-[#00ff41]'
                    }`
                  }
                >
                  <ScrambledText active={phase === 'decode'} duration={900}>
                    {item.label}
                  </ScrambledText>
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="block rounded px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-[#00ff41]"
              >
                ./resume.pdf
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
