require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

connectToDb();

const questionRouter = require("./routes/questionRouter");
const {errorHandler} = require('./middleware/errorHandler');
app.use("/questions", questionRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Question Server running on port ${PORT}`);
});
