/**
 * Question mapping to categories
 * Each question ID maps to its respective category
 */
const questionCategoryMap = {
  // Analytical: Q1, Q5, Q9, Q13, Q17 (indices 0, 4, 8, 12, 16)
  analytical: [0, 4, 8, 12, 16],
  // Creative: Q2, Q6, Q10, Q14, Q18 (indices 1, 5, 9, 13, 17)
  creative: [1, 5, 9, 13, 17],
  // Social: Q3, Q7, Q11, Q15, Q19 (indices 2, 6, 10, 14, 18)
  social: [2, 6, 10, 14, 18],
  // Leadership: Q4, Q8, Q12, Q16, Q20 (indices 3, 7, 11, 15, 19)
  leadership: [3, 7, 11, 15, 19],
};

/**
 * Career recommendations for each dominant category
 */
const careerRecommendations = {
  analytical: ['Software Engineer', 'Data Scientist', 'Research Analyst'],
  creative: ['UI/UX Designer', 'Content Creator', 'Graphic Designer'],
  social: ['Psychologist', 'HR Manager', 'Teacher'],
  leadership: ['Business Manager', 'Entrepreneur', 'Project Manager'],
};

/**
 * Calculate scores for each category
 * @param {Array<number>} answers - Array of 20 answer scores (1-5 scale)
 * @returns {Object} Object containing category scores
 */
const calculateCategoryScores = (answers) => {
  const scores = {
    analytical: 0,
    creative: 0,
    social: 0,
    leadership: 0,
  };

  // Sum up scores for each category
  Object.keys(questionCategoryMap).forEach(category => {
    const indices = questionCategoryMap[category];
    scores[category] = indices.reduce((sum, index) => sum + answers[index], 0);
  });

  return scores;
};

/**
 * Determine dominant category based on highest score
 * @param {Object} scores - Object containing category scores
 * @returns {string} Name of dominant category
 */
const determineDominantCategory = (scores) => {
  let dominantCategory = 'analytical';
  let maxScore = scores.analytical;

  Object.keys(scores).forEach(category => {
    if (scores[category] > maxScore) {
      maxScore = scores[category];
      dominantCategory = category;
    }
  });

  return dominantCategory;
};

/**
 * Get recommended careers based on dominant category
 * @param {string} dominantCategory - The dominant category
 * @returns {Array<string>} Array of 3 career recommendations
 */
const getRecommendedCareers = (dominantCategory) => {
  return careerRecommendations[dominantCategory] || [];
};

/**
 * Main scoring engine function
 * Orchestrates the entire scoring process
 * @param {Array<number>} answers - Array of 20 answer scores (1-5 scale)
 * @returns {Object} Object containing category scores, dominant category, and recommended careers
 */
const calculateAssessmentScore = (answers) => {
  // Validate answers
  if (!Array.isArray(answers) || answers.length !== 20) {
    throw new Error('Answers must be an array of 20 elements');
  }

  if (!answers.every(answer => answer >= 1 && answer <= 5)) {
    throw new Error('Each answer must be between 1 and 5');
  }

  // Calculate scores
  const categoryScores = calculateCategoryScores(answers);
  const dominantCategory = determineDominantCategory(categoryScores);
  const recommendedCareers = getRecommendedCareers(dominantCategory);

  return {
    categoryScores,
    dominantCategory,
    recommendedCareers,
  };
};

export default calculateAssessmentScore;
