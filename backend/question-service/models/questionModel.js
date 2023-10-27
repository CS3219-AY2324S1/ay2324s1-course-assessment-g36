const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    id: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        unique: true,
    },
    categories: [String],
    complexity: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
    },
    link: String,
    description: String,
})

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema)

module.exports = Question;