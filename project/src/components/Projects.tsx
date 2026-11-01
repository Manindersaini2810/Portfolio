import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const filters = ['All', 'Full-Stack', 'Machine Learning', 'MERN'];

const projects = [
  {
    title: 'Agri Sales Management System',
    category: 'Full-Stack',
    tags: ['Full-Stack', 'MERN'],
    description:
      'A full-stack agricultural sales platform using the MERN stack with responsive UIs for product listings, farmer interactions, and backend API integration.',
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    github: 'https://github.com',
  },
  {
    title: 'Land Cover Classification',
    category: 'Machine Learning',
    tags: ['Machine Learning'],
    description:
      'Transfer learning with ResNet50 on the LUCAS land-use dataset — improved validation accuracy from 32% to 80%+ using data augmentation and WeightedRandomSampler.',
    image:
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600',
    github: 'https://github.com',
  },
  {
    title: 'Diabetes Prediction',
    category: 'Machine Learning',
    tags: ['Machine Learning'],
    description:
      'Random Forest classifier for diabetes prediction using SimpleImputer for missing values, feature engineering, and evaluation via Precision, Recall, and F1-Score.',
    image:
      'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=600',
    github: 'https://github.com',
  },
  {
    title: 'MERN Blog Platform',
    category: 'Full-Stack',
    tags: ['Full-Stack', 'MERN'],
    description:
      'Full-stack blogging platform with user authentication, rich text editor, CRUD operations, and a responsive React frontend backed by Node.js + MongoDB.',
    image:
      'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=600',
    github: 'https://github.com',
  },
  {
    title: 'ML Data Pipeline',
    category: 'Machine Learning',
    tags: ['Machine Learning'],
    description:
      'Automated data preprocessing pipeline using Pandas, NumPy and Scikit-Learn — handling imputation, normalization, and feature selection for tabular datasets.',
    image:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
    github: 'https://github.com',
  },
  {
    title: 'E-Commerce REST API',
    category: 'Full-Stack',
    tags: ['Full-Stack', 'MERN'],
    description:
      'RESTful API for an e-commerce platform built with Express.js and MongoDB — featuring JWT authentication, product management, and order processing endpoints.',
    image:
      'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    github: 'https://github.com',
  },
];

export default function Projects() {
  const [active, setActive] = useState('All');

  const visible =
    active === 'All'
      ? projects
      : projects.filter((p) => p.tags.includes(active) || p.category === active);

  return (
    <section id="portfolio" className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-6 xl:px-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="text-lg font-semibold uppercase tracking-[0.2em] text-[#fd6f00]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            My Work
          </p>
          <h2
            className="text-4xl font-black text-white sm:text-5xl"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Portfolio
          </h2>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-3" aria-label="Portfolio filter">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-lg px-8 py-3 text-base font-bold tracking-wide transition-all ${
                active === f
                  ? 'bg-gradient-to-br from-[#fd6f00] to-[#e46400] text-white shadow-lg shadow-orange-900/30'
                  : 'text-white/60 hover:text-white/80'
              }`}
              style={
                active !== f
                  ? { backgroundColor: 'rgba(255,255,255,0.08)' }
                  : {}
              }
            >
              {f}
            </button>
          ))}
        </nav>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[28px] transition-all hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:text-[#fd6f00]"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:text-[#fd6f00]"
                    aria-label="Live preview"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <h3
                  className="text-base font-bold text-white/90"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {project.title}
                </h3>
                <span
                  className="rounded-full bg-[#fd6f00]/15 px-3 py-1 text-xs font-bold text-[#fd6f00]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {project.category}
                </span>
              </div>
              <p
                className="px-5 pb-5 pt-2 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Lato', sans-serif" }}
              >
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
