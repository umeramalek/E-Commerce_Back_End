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
Category.hasMany(Product)
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: 'ProductTag',foreignKey:'product_id'});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: 'ProductTag',foreignKey:'tag_id'})




module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
