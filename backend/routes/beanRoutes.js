// routes/beanRoutes.js
const express = require('express');
const router = express.Router();
const BeanController = require('../controllers/beanController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateBean } = require('../middleware/validationMiddleware');

// Create a new bean (requires authentication)
router.post('/', authenticate, validateBean, BeanController.createBean);

// Get all beans
router.get('/', BeanController.getAllBeans);

// Get bean by ID
router.get('/:beanId', BeanController.getBeanById);

// Update a bean (requires authentication)
router.put('/:beanId', authenticate, validateBean, BeanController.updateBean);

// Delete a bean (requires authentication)
router.delete('/:beanId', authenticate, BeanController.deleteBean);

module.exports = router;
