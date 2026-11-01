import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { connectDatabase } from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : false);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'connect-src': ["'self'", 'https:'],
      },
    },
  }),
);
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      const error = new Error('Origin is not allowed by CORS.');
      error.status = 403;
      return callback(error);
    },
  }),
);
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'degraded',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use(
  '/api/contact',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Too many messages were sent. Please try again later.' },
  }),
);
app.use('/api', apiRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'API route not found.' });
});

app.use((error, _req, res, _next) => {
  const status = Number(error.status || error.statusCode) || 500;
  if (status >= 500) console.error('Request failed:', error);
  res.status(status).json({
    message: status >= 500 ? 'An unexpected server error occurred.' : error.message,
  });
});

app.listen(port, () => {
  console.info(`Portfolio API listening on port ${port}.`);
});

connectDatabase().catch((error) => {
  console.error('MongoDB connection failed; API is running in degraded mode:', error.message);
});
