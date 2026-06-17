import { Code2, Layout, Server, Database, Brain, Wrench } from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: 'Languages',
    description:
      'Python, C, C++, JavaScript — the toolbox I reach for across web, ML and systems work.',
  },
  {
    icon: Layout,
    title: 'Frontend',
    description:
      'React.js, HTML, CSS, Tailwind. I build clean, responsive interfaces with attention to detail.',
  },
  {
    icon: Server,
    title: 'Backend',
    description:
      'Node.js, Express.js and REST APIs. Designing endpoints that are simple, predictable and fast.',
  },
  {
    icon: Database,
    title: 'Database',
    description:
      'MongoDB and MySQL — schema design, queries and integrating data layers with the application.',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    description:
      'PyTorch, Scikit-Learn, NumPy, Pandas. Trained CNNs, classifiers and worked with transfer learning.',
  },
  {
    icon: Wrench,
    title: 'Tools',
    description:
      'Git, GitHub, Linux, VS Code, Kaggle. The everyday workflow that ships projects end-to-end.',
  },
];

export default function Services() {
  return (
    <section id="skills" className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 xl:px-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            className="text-5xl font-bold text-white sm:text-6xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            My Skills
          </h2>
          <p
            className="max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Lato', sans-serif" }}
          >
            Languages, frameworks and tools I use to build full-stack web apps and ML projects.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col gap-5 rounded-2xl p-7 transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Icon box */}
              <div
                className="flex h-[56px] w-[56px] items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(253,111,0,0.15)' }}
              >
                <Icon size={26} className="text-[#fd6f00]" />
              </div>

              <h3
                className="text-lg font-bold text-[#fd6f00]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Lato', sans-serif" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
