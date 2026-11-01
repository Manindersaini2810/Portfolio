import { Router } from 'express';
import certificateRoutes from './certificateRoutes.js';
import contactRoutes from './contactRoutes.js';
import projectRoutes from './projectRoutes.js';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/certificates', certificateRoutes);
router.use('/contact', contactRoutes);

export default router;
