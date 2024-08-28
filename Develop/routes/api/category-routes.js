const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData= await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!CategoryData) {
      res.status(404).jsob({ message:'Category not found'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id,}
    });
    }
  });


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destory({
      where: { id: req.params.id}
    });
    if (!deleted) {
      return res.status(404).json({message: 'Category not found'});
    }
    res.status(204).json({ message: 'Category deleted successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message});
  }
});

module.exports = router;
