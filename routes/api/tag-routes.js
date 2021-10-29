const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagResult = await Tag.findAll({
      include: [{model: Product, attributes: ['id','product_name']}]
    });
    res.status(200).json(tagResult);
  }
    catch (err){
      res.status(400).json(err)
    }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagResult = await Tag.findByPk(req.params.id, {
      include: [{model: Product, attributes: ['id','product_name']}]
    });
    res.status(200).json(tagResult);
  }
    catch (err) {
      res.status(400).json(err)
    }
});

router.post('/', (req, res) => {
  // create a new tag
try {
  const tagResult = await Tag.create({
    tag_name: req.body.tag_name
  });
  res.status(200).json(tagResult);
}
  catch (err) {
    res.status(400).json(Error)
  }

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagResult = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where : {
        id: req.params.id
      }
    });
    if (!tagResult) {
      res.status(404).json({
        message: 'No tag found'
      });
      return;
    }
    res.status(200).json(tagResult);
  }
    catch (err) {
      res.status(500).json(err)
    }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagResult = await Tag.destroy([{
      where: {
        id: req.params.id
      }
    }])
    if (!tagResult){
      res.status(404).json({
        message: 'No Tag found'
      });
      return;
    }
    res.status(200).json(tagResult);
  }
    catch(err) {
      res.status(500).json(err)
    }
});

module.exports = router;

