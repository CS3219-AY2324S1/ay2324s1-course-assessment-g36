const express = require('express');
const questionController = require("../controllers/questionController");
const questionRouter = express.Router();

questionRouter.post("/", questionController.addQuestion);

questionRouter.get("/", questionController.getAllQuestions);

questionRouter.get("/id/:questionId", questionController.getQuestionById);

// match by complexity only
questionRouter.get("/complexity/:complexity", questionController.getRandomQuestionByComplexity);

// match by complexity and categories
questionRouter.get("/:complexity/categories", questionController.getQuestionsByCategory);

questionRouter.put("/id/:questionId", questionController.updateQuestion)

questionRouter.delete("/:questionTitle", questionController.deleteQuestion);

module.exports = questionRouter;