const express = require("express");
const app = express();
const cors = require("cors");
// const kafka = require('kafka-node')

app.use(express.json());
app.use(cors());

const db = require("./models");

// const client = new kafka.KafkaClient({kafkahost: process.env.KAFKA_BOOTSTRAP_SERVERS})
// const consumer = new kafka.Consumer(client, [{topic: process.env.KAFKA_TOPIC}], {
//   autoCommit: false
// })

// consumer.on('message', async (msg) => {
//   console.log(msg);
// })

// consumer.on('error', (err) => {
//   console.log(err)
// })

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
