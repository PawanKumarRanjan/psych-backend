import CareerDomain from '../models/CareerDomain.js';

/**
 * Get all career domains sorted by order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllCareerDomains = async (req, res, next) => {
  try {
    const domains = await CareerDomain.find({}).sort({ order: 1 }).lean();

    if (!domains || domains.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No career domains found',
      });
    }

    res.status(200).json({
      success: true,
      count: domains.length,
      data: domains,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single career domain by name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getCareerDomainByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const domain = await CareerDomain.findOne({ name: name.toLowerCase() }).lean();

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: `Career domain '${name}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: domain,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single career domain by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getCareerDomainById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const domain = await CareerDomain.findById(id).lean();

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: 'Career domain not found',
      });
    }

    res.status(200).json({
      success: true,
      data: domain,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new career domain (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createCareerDomain = async (req, res, next) => {
  try {
    const { name, displayName, icon, color, description, careers, order } = req.body;

    // Validate required fields
    if (!name || !displayName || !icon || !color || !description || !careers) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, displayName, icon, color, description, careers',
      });
    }

    const domain = new CareerDomain({
      name: name.toLowerCase(),
      displayName,
      icon,
      color,
      description,
      careers,
      order: order || 0,
    });

    await domain.save();

    res.status(201).json({
      success: true,
      message: 'Career domain created successfully',
      data: domain,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A career domain with this name already exists',
      });
    }
    next(error);
  }
};

/**
 * Update a career domain (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateCareerDomain = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, displayName, icon, color, description, careers, order } = req.body;

    const domain = await CareerDomain.findByIdAndUpdate(
      id,
      {
        name: name ? name.toLowerCase() : undefined,
        displayName,
        icon,
        color,
        description,
        careers,
        order,
      },
      { new: true, runValidators: true }
    );

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: 'Career domain not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Career domain updated successfully',
      data: domain,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a career domain (Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteCareerDomain = async (req, res, next) => {
  try {
    const { id } = req.params;

    const domain = await CareerDomain.findByIdAndDelete(id);

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: 'Career domain not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Career domain deleted successfully',
      data: domain,
    });
  } catch (error) {
    next(error);
  }
};
