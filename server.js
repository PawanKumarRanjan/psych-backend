import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import careerDomainRoutes from './routes/careerDomainRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/assessments', assessmentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/career-domains', careerDomainRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// Export the app for Vercel
export default app;