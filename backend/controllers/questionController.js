const mongoose = require("mongoose")
const Question = require("../models/questionModel");
const ObjectId = mongoose.Types.ObjectId;

const addQuestion = async(req, res, next) => {
    try {
        const { id, title, description, link, categories, complexity } = req.body;

        if (!id || !title || ! description || !link || !categories || !complexity) {
            res.status(400).send("Missing field");
            return;
        }

        const existingQuestion = await Question.findOne({
            $or: [
              { id: id }, 
              { title: title },
            ],
          });

        if (existingQuestion) {
            res.status(400).send("Question already exists")
            return;
        }

        const question = await Question.create({
            id: id,
            title: title,
            description: description,
            link: link,
            categories: categories,
            complexity: complexity
        })

        res.status(201).send(question);
    } catch (err) {
        next(err);
    }
}

const getAllQuestions = async(req, res, next) => {
    try {
        const questionList = await Question.find();
        res.status(200).send(questionList);
    } catch (err) {
        next(err);
    }
}

const getQuestionById = async(req, res, next) => {
    try {
        const questionId = req.params.questionId;
        const questionList = await Question.findOne({ id: questionId});
        res.status(200).send(questionList);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addQuestion,
    getAllQuestions,
    getQuestionById,
    // updateQuestion,
    // deleteQuestion
}