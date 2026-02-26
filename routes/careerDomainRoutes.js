import express from 'express';
import {
  getAllCareerDomains,
  getCareerDomainByName,
  getCareerDomainById,
  createCareerDomain,
  updateCareerDomain,
  deleteCareerDomain,
} from '../controllers/careerDomainController.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get all career domains
router.get('/', getAllCareerDomains);

// Get a single career domain by name
router.get('/name/:name', getCareerDomainByName);

// Get a single career domain by ID
router.get('/:id', getCareerDomainById);

/**
 * Admin Routes
 */

// Create a new career domain
router.post('/', createCareerDomain);

// Update a career domain
router.put('/:id', updateCareerDomain);

// Delete a career domain
router.delete('/:id', deleteCareerDomain);

export default router;
