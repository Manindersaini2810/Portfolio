import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    achievement: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    originalUrl: { type: String, required: true, trim: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

certificateSchema.index({ order: 1, createdAt: 1 });

export default mongoose.model('Certificate', certificateSchema);
