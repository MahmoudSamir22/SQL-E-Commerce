const asyncHandler = require('express-async-handler')

const ApiError = require('../utils/apiError')
const Product = require('../models/productModel')


exports.addProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json(product)
})



