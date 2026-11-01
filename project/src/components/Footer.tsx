import { Mail, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'About me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact me', href: '#contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:captionmanindersingh@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 py-12 xl:px-20">
        <div
          className="text-2xl font-bold text-[#fd6f00]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Maninder<span>.</span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-base font-medium transition-colors hover:text-[#fd6f00]"
                  style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Lato', sans-serif" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

        <div className="flex flex-wrap items-center justify-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:text-[#fd6f00]"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.5)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#fd6f00';
                (e.currentTarget as HTMLElement).style.color = '#fd6f00';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:gap-8">
          <a
            href="mailto:captionmanindersingh@gmail.com"
            className="flex items-center gap-2 transition-colors hover:text-[#fd6f00]"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Lato', sans-serif" }}
          >
            <Mail size={14} />
            captionmanindersingh@gmail.com
          </a>
          <a
            href="tel:+919877945982"
            className="flex items-center gap-2 transition-colors hover:text-[#fd6f00]"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Lato', sans-serif" }}
          >
            <Phone size={14} />
            +91 987 794 5982
          </a>
        </div>

        <p
          className="text-xs"
          style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Lato', sans-serif" }}
        >
          Designed by Maninder Singh &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
