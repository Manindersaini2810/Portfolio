import Certificate from '../models/Certificate.js';

export async function listCertificates(_req, res) {
  const certificates = await Certificate.find()
    .sort({ order: 1, createdAt: 1 })
    .select('-__v')
    .lean();
  res.json(certificates);
}
