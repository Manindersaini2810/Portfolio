import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import Certificate from '../models/Certificate.js';
import Project from '../models/Project.js';

const projects = [
  {
    title: 'Threat Radar Azure - Cloud Honeypot & SIEM Lab',
    description:
      'Deployed an intentionally exposed Windows VM honeypot on Azure, built a log pipeline (Azure Monitor Agent -> Log Analytics -> Microsoft Sentinel) and captured 34,000+ failed logon events; analysed with KQL, enriched with a GeoIP watchlist and built a Sentinel Workbook attack map.',
    tags: ['Azure', 'Microsoft Sentinel', 'Log Analytics', 'KQL'],
    image: '/images/projects/Threat-Radar-Azure.png',
    githubUrl: 'https://github.com/Manindersaini2810/threat-radar-azure',
    order: 1,
  },
  {
    title: 'NoWay - Commercial Real Estate Platform',
    description:
      'Full-stack portal with multi-attribute filters and Mapbox geo-search, plus an XGBoost valuation microservice (FastAPI) and role-based access control (Buyer/Broker/Admin).',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'FastAPI', 'XGBoost', 'Mapbox'],
    image: '/images/projects/Noway.png',
    githubUrl: 'https://github.com/Manindersaini2810/NoWay',
    order: 2,
  },
  {
    title: 'LogiFleet - Fleet & Logistics Management System',
    description:
      'Team project (frontend): responsive dashboards with Recharts, JWT auth via Axios interceptors, role-guarded UI and CSV export.',
    tags: ['React', 'Tailwind CSS', 'Recharts', 'PostgreSQL', 'Prisma'],
    image: '/images/projects/LogiFleet.png',
    githubUrl: 'https://github.com/Manindersaini2810/LogiFleet',
    order: 3,
  },
  {
    title: 'LUCAS Land Cover Classification',
    description:
      'Fine-tuned ResNet50 with transfer learning and data augmentation to classify European LUCAS land-cover images, evaluated with precision, recall, confusion matrix and macro F1.',
    tags: ['PyTorch', 'ResNet50', 'Torchvision', 'Scikit-Learn'],
    image: '/images/projects/Lucas-LandCover-classification.png',
    githubUrl: 'https://github.com/Manindersaini2810/Lucas-Landcover-Classification',
    order: 4,
  },
];

const certificates = [
  {
    title: 'NPTEL Online Certification: Demystifying Networking',
    issuer: 'NPTEL Online Certification · IIT Bombay',
    achievement: 'Elite certification',
    image: '/images/certificates/nptel.png',
    originalUrl: '/images/certificates/nptelcertification.pdf',
    order: 1,
  },
];

try {
  await connectDatabase();
  await Project.deleteMany({});
  await Certificate.deleteMany({});
  const [projectDocs, certificateDocs] = await Promise.all([
    Project.insertMany(projects),
    Certificate.insertMany(certificates),
  ]);
  console.info(`Seeded ${projectDocs.length} projects and ${certificateDocs.length} certificates.`);
} catch (error) {
  console.error('Portfolio seed failed:', error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
