import express from 'express';
import {
  getAllQuestions,
  getQuestionsByCategory,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get all questions
router.get('/', getAllQuestions);

// Get questions by category
router.get('/category/:category', getQuestionsByCategory);

// Get a single question by ID
router.get('/:id', getQuestionById);

/**
 * Admin Routes
 */

// Create a new question
router.post('/', createQuestion);

// Update a question
router.put('/:id', updateQuestion);

// Delete a question
router.delete('/:id', deleteQuestion);

export default router;
