require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const userRouter = require("./routes/userRouter");
const historyRouter = require("./routes/historyRouter");
const { errorHandler } = require("./middleware/errorHandler");
app.use("/users", userRouter);
app.use("/history", historyRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
