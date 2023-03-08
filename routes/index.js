const authRouter = require('./authRoute')
const categoryRouter = require('./categoryRoute')
const subCategoryRouter = require('./subCategoryRoute')

const mountRoutes = (app) => {
 app.use('/api/v1/auth', authRouter)
 app.use('/api/v1/category', categoryRouter)
 app.use('/api/v1/subCategory', subCategoryRouter)
}

module.exports = mountRoutes