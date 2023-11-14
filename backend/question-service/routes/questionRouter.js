const express = require("express");
const questionController = require("../controllers/questionController");
const questionRouter = express.Router();
const {authenticateAdmin} = require("../middleware/authenticateAdmin");

questionRouter.post(
  "/",
  authenticateAdmin,
  questionController.addQuestion,
);

questionRouter.get("/", questionController.getAllQuestions);

questionRouter.get("/id/:questionId", questionController.getQuestionById);

questionRouter.get(
  "/complexity/:complexity",
  questionController.getRandomIdByComplexity,
);

questionRouter.put("/id/:questionId", questionController.updateQuestion);

questionRouter.delete(
  "/:questionId",
  authenticateAdmin,
  questionController.deleteQuestion,
);

module.exports = questionRouter;
