import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'About me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact me', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (label: string, href: string) => {
    setActive(label);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: 'rgba(15,15,15,0.92)', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 xl:px-20">
        {/* Logo */}
        <button
          onClick={() => handleNav('Home', '#home')}
          className="text-2xl font-bold text-[#fd6f00] transition-opacity hover:opacity-80"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.5px' }}
        >
          Maninder<span style={{ color: '#fd6f00' }}>.</span>
        </button>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-[48px]">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNav(item.label, item.href)}
                  className={`text-base tracking-wide transition-colors hover:text-[#fd6f00] ${
                    active === item.label
                      ? 'font-bold text-[#fd6f00]'
                      : 'font-medium text-white/70'
                  }`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => handleNav('Contact me', '#contact')}
          className="hidden rounded-lg bg-[#fd6f00] px-7 py-2.5 text-base font-bold text-white transition-opacity hover:opacity-90 lg:block"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Hire Me
        </button>

        <button
          className="text-white/70 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="border-t px-6 py-4 lg:hidden"
          style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: '#0f0f0f' }}
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNav(item.label, item.href)}
                  className={`text-base tracking-wide transition-colors hover:text-[#fd6f00] ${
                    active === item.label ? 'font-bold text-[#fd6f00]' : 'font-medium text-white/70'
                  }`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNav('Contact me', '#contact')}
                className="w-full rounded-lg bg-[#fd6f00] px-8 py-2.5 text-base font-bold text-white"
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
