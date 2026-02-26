import mongoose from 'mongoose';

const careerDomainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Career domain name is required'],
      trim: true,
      unique: true,
      enum: ['analytical', 'creative', 'social', 'leadership'],
      lowercase: true,
    },
    displayName: {
      type: String,
      required: [true, 'Display name is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Icon emoji is required'],
    },
    color: {
      type: String,
      required: [true, 'Color gradient is required'],
      description: 'Tailwind gradient class like "from-blue-500 to-indigo-600"',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [20, 'Description must be at least 20 characters long'],
    },
    careers: {
      type: [String],
      required: [true, 'At least one career recommendation is required'],
      validate: [
        (arr) => arr.length >= 1 && arr.length <= 10,
        'Must have between 1 and 10 career recommendations',
      ],
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

// Index for quick retrieval by name
careerDomainSchema.index({ name: 1 });
careerDomainSchema.index({ order: 1 });

const CareerDomain = mongoose.model('CareerDomain', careerDomainSchema);

export default CareerDomain;
