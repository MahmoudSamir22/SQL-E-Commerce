const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const Category = require("../models/categoryModel");

exports.addCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return next(
      new ApiError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(category);
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const [rowsUpdated, [updatedCategory]] = await Category.update(req.body, {
    where: { id: req.params.id },
    returning: true
  });
  if (!updatedCategory) {
    return next(
      new ApiError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(updatedCategory);
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.destroy({ where: { id: req.params.id } });
  if (!category) {
    return next(
      new ApiError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(204).send();
});
