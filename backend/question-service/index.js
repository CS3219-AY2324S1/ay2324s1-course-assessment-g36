const express = require("express")
const cors = require("cors");
const connectToDb = require("./config/db")
const kafka = require('kafka-node')

const app = express();

app.use(express.json());
app.use(cors());

// const client = new kafka.KafkaClient({kafkahost: process.env.KAFKA_BOOTSTRAP_SERVERS})
// const producer = new kafka.Producer(client)
// producer.on('ready', () => {
//     // app.post('/', async (req, res) => {
//     //     producer.send([{topic: process.env.KAFKA_TOPIC,
//     //         messages: JSON.stringify(req, body)}], async (err, data) => {
//     //             if (err) console.log(err)
//     //             else res.send("hi")
//     //         }
//     //     )
//     // })
//     console.log("producer ready")
// })

connectToDb();

const questionRouter = require("./routes/questionRouter")
app.use("/questions", questionRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Question Server running on port ${PORT}`);
})