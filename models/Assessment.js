import mongoose from 'mongoose';

/**
 * Assessment Schema
 * Stores user assessment data with scores and career recommendations
 */
const assessmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    answers: {
      type: [Number],
      required: [true, 'Answers are required'],
      validate: {
        validator: function (value) {
          return (
            value.length === 20 &&
            value.every(answer => answer >= 1 && answer <= 5)
          );
        },
        message: 'Answers must be an array of 20 numbers between 1 and 5',
      },
    },
    categoryScores: {
      analytical: {
        type: Number,
        required: true,
      },
      creative: {
        type: Number,
        required: true,
      },
      social: {
        type: Number,
        required: true,
      },
      leadership: {
        type: Number,
        required: true,
      },
    },
    dominantCategory: {
      type: String,
      required: true,
      enum: ['analytical', 'creative', 'social', 'leadership'],
    },
    recommendedCareers: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export model
const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;
