const { DataTypes, Model } = require("sequelize");
const db = require("../db/dbConnection");

class Category extends Model {}

Category.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    }
  },
  {
    sequelize: db,
    modelName: "category",
  }
);

module.exports = Category