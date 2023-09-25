const express = require("express")
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// MONGODB
const connectToMongoDb = require("./question-service/config/db")
connectToMongoDb();

const questionRouter = require("./question-service/routes/questionRouter")
app.use("/questions", questionRouter)

// MYSQL
const userDb = require("./user-service/models");

const userRouter = require("./user-service/routes/userRouter");
const {errorHandler} = require("./user-service/middleware/errorHandler");
app.use("/users", userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

userDb.sequelize.sync();

// listen to port
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
})


