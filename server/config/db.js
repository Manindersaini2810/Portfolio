import mongoose from 'mongoose';

export async function connectDatabase() {
  const { MONGODB_URI } = process.env;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is required to connect to MongoDB.');
  }

  mongoose.set('strictQuery', true);
  mongoose.set('bufferCommands', false);
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  console.info('Connected to MongoDB.');
}
