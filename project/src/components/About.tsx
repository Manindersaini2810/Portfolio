import { Download } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 xl:px-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            className="text-5xl font-bold text-white sm:text-6xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            About Me
          </h2>
          <p
            className="max-w-lg text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Lato', sans-serif" }}
          >
            Full-stack development, machine learning, and a curiosity for how things work.
          </p>
        </div>

        {/* Body */}
        <div className="grid w-full grid-cols-1 items-center gap-14 xl:grid-cols-[1fr_420px]">
          {/* Text + CTA */}
          <div className="flex flex-col gap-7">
            <p
              className="text-base leading-[1.9] sm:text-lg"
              style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Lato', sans-serif" }}
            >
              I'm Maninder Singh, a B.Tech Information Technology student at{' '}
              <strong className="font-bold text-white">NIT Jalandhar</strong> with a CGPA of 8.71.
              I work at the intersection of full-stack web development and machine learning —
              building MERN applications, training deep learning models, and shipping projects
              end-to-end.
            </p>
            <p
              className="text-base leading-[1.9] sm:text-lg"
              style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Lato', sans-serif" }}
            >
              I started coding to understand how things work, and stayed because building things
              feels right. Off-screen, I played district-level Under-17 cricket — discipline I
              bring into every long debugging session.
            </p>
            <a
              href="mailto:captionmanindersingh@gmail.com"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#fd6f00] px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Download size={18} />
              Download CV
            </a>
          </div>

          {/* Circular avatar */}
          <div className="flex justify-center xl:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#fd6f00]/15 blur-3xl scale-110" />
              <div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  padding: '5px',
                  background: 'linear-gradient(135deg, #fd6f00 0%, #7a3500 50%, #fd6f00 100%)',
                  width: '360px',
                  height: '360px',
                }}
              >
                <div
                  className="overflow-hidden rounded-full"
                  style={{ width: '350px', height: '350px' }}
                >
                  <img
                    src="/images/maninder-avatar.png"
                    alt="Maninder Singh"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
