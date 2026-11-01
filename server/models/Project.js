import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tags: { type: [String], required: true, default: [] },
    image: { type: String, required: true, trim: true },
    githubUrl: { type: String, required: true, trim: true },
    liveUrl: { type: String, trim: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

projectSchema.index({ order: 1, createdAt: 1 });

export default mongoose.model('Project', projectSchema);
