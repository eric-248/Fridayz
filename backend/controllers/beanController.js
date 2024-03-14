// controllers/beanController.js
const Bean = require('../models/bean');

const BeanController = {
  createBean: async (req, res) => {
    try {
      const { thought, time } = req.body;

      // Create a new bean
      const newBean = new Bean({
        thought,
        time
      });
      await newBean.save();

      res.status(201).json(newBean);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllBeans: async (req, res) => {
    try {
      const beans = await Bean.find();
      res.json(beans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get bean by ID
  getBeanById: async (req, res) => {
    try {
      const beanId = req.params.beanId;

      // Find the bean by ID
      const bean = await Bean.findById(beanId);
      if (!bean) {
        return res.status(404).json({ message: 'Bean not found' });
      }

      res.json(bean);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a bean
  updateBean: async (req, res) => {
    try {
      const beanId = req.params.beanId;
      const { thought, time } = req.body;

      // Find the bean by ID and update its properties
      const updatedBean = await Bean.findByIdAndUpdate(beanId, { thought, time }, { new: true });
      if (!updatedBean) {
        return res.status(404).json({ message: 'Bean not found' });
      }

      res.json(updatedBean);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a bean
  deleteBean: async (req, res) => {
    try {
      const beanId = req.params.beanId;

      // Find the bean by ID and delete it
      const deletedBean = await Bean.findByIdAndDelete(beanId);
      if (!deletedBean) {
        return res.status(404).json({ message: 'Bean not found' });
      }

      res.json({ message: 'Bean deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = BeanController;