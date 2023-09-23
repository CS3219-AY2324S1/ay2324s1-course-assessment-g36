import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema ({
    id: Number,
    title: String,
    categories: [String],
    complexity: String,
    link: String,
    description: String,
})

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema)

export default Question;