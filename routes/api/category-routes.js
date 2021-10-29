const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryResults = await Category.findAll({
      include: [{model:Product}]
    });
    res.status(200).json(categoryResults);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryResults = await Category.findByPk(req.params.id,{
      include: [{model:Product}]
    });
    if (!categoryResults){
      res.status(404).json({message:'No category found'})
      return;
    }
    res.status(200).json(categoryResults);
  }
    catch (err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const categoryResults = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryResults);
  } 
    catch (err){
      res.status(400).json(err)
    }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    const categoryResults = await Category.update({
      category_name: req.body.category_name
    },
   { 
     where: {
      id: req.params.id
      }
    });
    if (!categoryResults) {
      res.status(404).json({
        message: 'No category found'
      });
      return;
    }
    res.status(200).json(categoryResults);
  }
    catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryResults = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryResults) {
      res.status(404).json({
        message:'No category found'
      });
      return;
    }
    res.status(200).json(categoryResults);
  }
    catch (err) {
      res.status(500).json(err)
    }
});


module.exports = router;
