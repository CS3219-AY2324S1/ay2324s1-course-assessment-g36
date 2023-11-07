const express = require('express');
const questionController = require("../controllers/questionController");
const questionRouter = express.Router();

questionRouter.post("/", questionController.authenticateAdmin, questionController.addQuestion);

questionRouter.get("/", questionController.getAllQuestions);

questionRouter.get("/id/:questionId", questionController.getQuestionById);

questionRouter.get("/complexity/:complexity", questionController.getRandomIdByComplexity);

questionRouter.put("/id/:questionId", questionController.updateQuestion)

questionRouter.delete("/:questionId", questionController.authenticateAdmin, questionController.deleteQuestion);

module.exports = questionRouter;