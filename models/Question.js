import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
      minlength: [10, 'Question must be at least 10 characters long'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['analytical', 'creative', 'social', 'leadership'],
      lowercase: true,
    },
    order: {
      type: Number,
      required: [true, 'Question order is required'],
      min: 1,
      max: 20,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for quick sorting by order
questionSchema.index({ order: 1 });
questionSchema.index({ category: 1 });

const Question = mongoose.model('Question', questionSchema);

export default Question;
