const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const userRouter = require("./routes/userRouter");
// const {errorHandler} = require("./middleware/errorHandler");
app.use("/users", userRouter);
// app.use(errorHandler);

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});