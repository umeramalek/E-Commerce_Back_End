// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const seedProducts = require('../seeds/product-seeds');
const seedTags = require('../seeds/tag-seeds');

// Products belongsTo Category
Product.belongsTo(Category,{
  onDelete:'CASCADE',
  foreignKey: 'category_id'
})
// Categories have many Products
Category.hasMany(Product,{
  onDelete:'CASCADE',
  foreignKey: 'category_id'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { 
  through: {
    model: ProductTag,
    unique: false
  },
  foreignKey:'product_id'});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { 
  through: {
    model: ProductTag,
    unique: false
  },
  foreignKey:'tag_id'});



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
