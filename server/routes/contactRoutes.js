import { Router } from 'express';
import { body } from 'express-validator';
import { createContactMessage } from '../controllers/contactController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post(
  '/',
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters.'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Enter a valid email address.')
      .isLength({ max: 254 })
      .withMessage('Email must be 254 characters or fewer.')
      .normalizeEmail(),
    body('message')
      .trim()
      .isLength({ min: 10, max: 5000 })
      .withMessage('Message must be between 10 and 5000 characters.'),
  ],
  asyncHandler(createContactMessage),
);

export default router;
