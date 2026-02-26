import Question from '../models/Question.js';

/**
 * Get all questions sorted by order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({}).sort({ order: 1 }).lean();

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No questions found',
      });
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get questions by category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getQuestionsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const validCategories = ['analytical', 'creative', 'social', 'leadership'];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be one of: analytical, creative, social, leadership',
      });
    }

    const questions = await Question.find({ category: category.toLowerCase() })
      .sort({ order: 1 })
      .lean();

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No questions found for category: ${category}`,
      });
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single question by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id).lean();

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new question (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createQuestion = async (req, res, next) => {
  try {
    const { text, category, order, description } = req.body;

    // Validate required fields
    if (!text || !category || !order) {
      return res.status(400).json({
        success: false,
        message: 'Text, category, and order are required',
      });
    }

    const question = new Question({
      text,
      category: category.toLowerCase(),
      order,
      description,
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      data: question,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A question with this order number already exists',
      });
    }
    next(error);
  }
};

/**
 * Update a question (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, category, order, description } = req.body;

    const question = await Question.findByIdAndUpdate(
      id,
      {
        text,
        category: category ? category.toLowerCase() : undefined,
        order,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a question (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
      data: question,
    });
  } catch (error) {
    next(error);
  }
};
