const { Model, DataTypes } = require("sequelize");
const db = require("../db/dbConnection");

const Category = require("./categoryModel");
const SubCategory = require("./subCategoryModel");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize: db,
    modelName: "product",
  }
);

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

SubCategory.hasMany(Product, { foreignKey: "subcategory_id" });
Product.belongsTo(SubCategory, { foreignKey: "subcategory_id" });

module.exports = Product;
