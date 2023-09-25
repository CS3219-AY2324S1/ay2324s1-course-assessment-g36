const Questions = require("../models/questionModel")
const {dummyQuestions} = require("../models/data")
const mongoose = require("mongoose")
const connectToDb = require("./db")

connectToDb();

const seedQuestions = async () => {
    try {
        await Questions.insertMany(dummyQuestions);
        console.log("Successfully added questions.")
    } catch (error) {
        console.log(error);
    }
}

seedQuestions().then(() => mongoose.connection.close());
