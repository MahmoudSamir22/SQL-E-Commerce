const express = require("express");
require('dotenv').config()
const app = express();
const mountRoutes = require("./routes/index");
const globalError = require('./middlewares/errorMiddleware')
const ApiError = require('./utils/apiError')
const port = process.env.PORT || 3000
const sequelize = require("./db/dbConnection");

sequelize
  .authenticate()
  .then((connection) => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error.message);
  });
app.get("/sync", async (req, res) => {
  await sequelize.sync({ force: true });
  res.send("synced");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mountRoutes(app);
app.get("/sync", async (req, res) => {
  await sequelize.sync({ Force: true});
  res.send("synced");
});
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
})
//Global error handling middleware
app.use(globalError);

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
