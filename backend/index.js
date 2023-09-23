const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express")
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
const URI = process.env.MONGODB_URI;
mongoose.connect(URI);

const questionRouter = require("./routes/questionRouter")
app.use("/questions", questionRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Question Server running on port ${PORT}`);
})
