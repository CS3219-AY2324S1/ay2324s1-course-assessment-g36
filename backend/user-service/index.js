const express = require("express");
const app = express();
const cors = require("cors");
const {run} = require('./utils/consumer')

app.use(express.json());
app.use(cors());

run().catch(console.error)

const db = require("./models");

// Routers
const userRouter = require("./routes/userRouter");
const historyRouter = require("./routes/historyRouter")
const {errorHandler} = require("./middleware/errorHandler");
app.use("/users", userRouter);
app.use("/history", historyRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
try {
  db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
} catch (err) {
  console.log(err);
}
