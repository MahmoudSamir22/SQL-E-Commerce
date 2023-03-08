const { DataTypes, Model } = require("sequelize");
const db = require("../db/dbConnection");
const Category = require('./categoryModel')

class SubCategory extends Model {}

SubCategory.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    }
  },
  {
    sequelize: db,
    modelName: "sub_category",
  }
);

Category.hasMany(SubCategory, { foreignKey: 'category_id'});
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = SubCategory