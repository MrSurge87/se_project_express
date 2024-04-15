const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");
const { errors } = require('celebrate');

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use("/", router);

// Celebrate Error Handler
app.use(errors());

// Centralized Error Handler
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
