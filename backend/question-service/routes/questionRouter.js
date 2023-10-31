const express = require('express');
const questionController = require("../controllers/questionController");
const questionRouter = express.Router();

questionRouter.post("/", questionController.addQuestion, questionController.authenticateAdmin);

questionRouter.get("/", questionController.getAllQuestions, questionController.authenticate);

questionRouter.get("/id/:questionId", questionController.getQuestionById);

questionRouter.get("/complexity/:complexity", questionController.getRandomIdByComplexity);

questionRouter.put("/id/:questionId", questionController.updateQuestion)

questionRouter.delete("/:questionId", questionController.deleteQuestion);

module.exports = questionRouter;