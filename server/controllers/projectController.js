import Project from '../models/Project.js';

export async function listProjects(_req, res) {
  const projects = await Project.find().sort({ order: 1, createdAt: 1 }).select('-__v').lean();
  res.json(projects);
}
