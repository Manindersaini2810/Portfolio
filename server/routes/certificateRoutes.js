import { Router } from 'express';
import { listCertificates } from '../controllers/certificateController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(listCertificates));

export default router;
