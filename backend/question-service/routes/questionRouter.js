const express = require('express');
const questionController = require("../controllers/questionController");
const questionRouter = express.Router();

questionRouter.post("/", questionController.addQuestion);

questionRouter.get("/", questionController.getAllQuestions);

questionRouter.get("/id/:questionId", questionController.getQuestionById);

questionRouter.get("/complexity/:complexity", questionController.getQuestionsByComplexity);

questionRouter.put("/id/:questionId", questionController.updateQuestion)

questionRouter.delete("/:questionTitle", questionController.deleteQuestion);

module.exports = questionRouter;