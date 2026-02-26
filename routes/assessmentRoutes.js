import express from 'express';
import {
  submitAssessment,
  getAssessmentById,
  getAssessmentsByEmail,
} from '../controllers/assessmentController.js';

const router = express.Router();

/**
 * POST /api/assessments
 * Submit a new assessment with validation
 */
router.post('/', submitAssessment);

/**
 * GET /api/assessments/:id
 * Get a specific assessment by ID
 */
router.get('/:id', getAssessmentById);

/**
 * GET /api/assessments/email/:email
 * Get all assessments for a specific email
 */
router.get('/email/:email', getAssessmentsByEmail);

export default router;
