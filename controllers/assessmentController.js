import Assessment from '../models/Assessment.js';
import calculateAssessmentScore from '../utils/scoringEngine.js';

/**
 * POST /api/assessments
 * Submit a new assessment
 * Validates input, calculates scores, and saves to database
 */
export const submitAssessment = async (req, res, next) => {
  try {
    const { name, email, answers } = req.body;

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required and must be at least 2 characters',
      });
    }

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required',
      });
    }

    if (!Array.isArray(answers) || answers.length !== 20) {
      return res.status(400).json({
        success: false,
        message: 'Answers must be an array of 20 elements',
      });
    }

    if (!answers.every(answer => Number.isInteger(answer) && answer >= 1 && answer <= 5)) {
      return res.status(400).json({
        success: false,
        message: 'Each answer must be an integer between 1 and 5',
      });
    }

    // Calculate assessment scores
    const { categoryScores, dominantCategory, recommendedCareers } =
      calculateAssessmentScore(answers);

    // Create assessment document
    const assessment = new Assessment({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      answers,
      categoryScores,
      dominantCategory,
      recommendedCareers,
    });

    // Save to database
    await assessment.save();

    // Return result
    res.status(201).json({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        id: assessment._id,
        name: assessment.name,
        email: assessment.email,
        categoryScores: assessment.categoryScores,
        dominantCategory: assessment.dominantCategory,
        recommendedCareers: assessment.recommendedCareers,
        createdAt: assessment.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/assessments/:id
 * Get assessment by ID
 */
export const getAssessmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid assessment ID',
      });
    }

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found',
      });
    }

    res.json({
      success: true,
      data: {
        id: assessment._id,
        name: assessment.name,
        email: assessment.email,
        categoryScores: assessment.categoryScores,
        dominantCategory: assessment.dominantCategory,
        recommendedCareers: assessment.recommendedCareers,
        createdAt: assessment.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/assessments/email/:email
 * Get all assessments by email
 */
export const getAssessmentsByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required',
      });
    }

    const assessments = await Assessment.find({
      email: email.trim().toLowerCase(),
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: assessments.length,
      data: assessments.map(assessment => ({
        id: assessment._id,
        name: assessment.name,
        email: assessment.email,
        categoryScores: assessment.categoryScores,
        dominantCategory: assessment.dominantCategory,
        recommendedCareers: assessment.recommendedCareers,
        createdAt: assessment.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};
