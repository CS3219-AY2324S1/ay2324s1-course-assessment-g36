const mongoose = require("mongoose");
const { Complexity } = require("./enums");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
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
    enum: Object.values(Complexity),
  },
  link: String,
  description: String,
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

module.exports = Question;
