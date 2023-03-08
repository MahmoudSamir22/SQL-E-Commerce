const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");

exports.addSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.create(req.body);
  res.status(201).json(subCategory);
});

exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const subCategories = await SubCategory.findAll({
    include: [
      {
        model: Category,
        as: "category", // optional alias for the included model
        attributes: ["id", "name", "image"]
      },
    ],
  });
  res.status(200).json(subCategories);
});

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findByPk(req.params.id);
  if (!subCategory) {
    return next(
      new ApiError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(subCategory);
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const [rowsUpdated, [updatedSubCategory]] = await SubCategory.update(
    req.body,
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  if (!updatedSubCategory) {
    return next(
      new ApiError(`No SubCategory with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(updatedSubCategory);
});

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.destroy({
    where: { id: req.params.id },
  });
  if (!subCategory) {
    return next(
      new ApiError(`No SubCategory with this id: ${req.params.id}`, 404)
    );
  }
  res.status(204).send();
});
