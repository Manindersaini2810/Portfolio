import { Instagram, Linkedin, Github, Mail, Download } from 'lucide-react';

const stats = [
  { value: '8.71', label: 'CGPA', bordered: true },
  { value: '6+', label: 'PROJECTS', bordered: true },
  { value: '2028', label: 'GRADUATING', bordered: false },
];

const socials = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:captionmanindersingh@gmail.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section id="home" className="w-full">
      <div className="mx-auto flex max-w-[1440px] px-6 xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-10 xl:grid-cols-[1fr_480px]">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {/* Name + title */}
            <div className="flex flex-col gap-3">
              <p
                className="text-xl font-medium text-white/55"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Hi I am
              </p>
              <h2
                className="text-3xl font-bold text-white/90 sm:text-4xl"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Maninder Singh
              </h2>
              <h1
                className="text-[56px] font-bold italic leading-[1.05] text-[#fd6f00] sm:text-[72px]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Full-Stack
                <br />
                Developer
              </h1>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border text-white/50 transition-all hover:border-[#fd6f00] hover:text-[#fd6f00]"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-lg bg-[#fd6f00] px-9 py-3.5 text-lg font-bold text-white transition-opacity hover:opacity-90"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Hire Me
              </a>
              <a
                href="mailto:captionmanindersingh@gmail.com"
                className="flex items-center gap-2 rounded-lg border-2 bg-transparent px-9 py-3.5 text-lg font-bold text-white/80 transition-all hover:border-[#fd6f00] hover:text-[#fd6f00]"
                style={{ borderColor: 'rgba(149,149,149,0.55)', fontFamily: "'Lato', sans-serif" }}
              >
                <Download size={18} />
                Download CV
              </a>
            </div>

            {/* Stats */}
            <div
              className="inline-flex w-fit rounded-xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col gap-1.5 px-8 py-4 ${
                      stat.bordered ? 'border-r' : ''
                    }`}
                    style={stat.bordered ? { borderColor: 'rgba(255,255,255,0.1)' } : {}}
                  >
                    <span
                      className="text-2xl font-extrabold text-[#fd6f00]"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-xs font-bold uppercase tracking-widest text-white/45"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — circular avatar */}
          <figure className="flex justify-center xl:justify-end">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-[#fd6f00]/20 blur-3xl scale-110" />
              {/* Orange ring */}
              <div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  padding: '6px',
                  background: 'linear-gradient(135deg, #fd6f00 0%, #7a3500 50%, #fd6f00 100%)',
                  width: '420px',
                  height: '420px',
                }}
              >
                <div
                  className="overflow-hidden rounded-full"
                  style={{ width: '408px', height: '408px' }}
                >
                  <img
                    src="/images/maninder-avatar.png"
                    alt="Maninder Singh"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
