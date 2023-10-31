const express = require('express');
const historyController = require("../controllers/historyController");
const historyRouter = express.Router();

historyRouter.use(historyController.authenticate)

historyRouter.post("/", historyController.addHistory);

historyRouter.get("/", historyController.getHistoryByUser);

historyRouter.get("/:questionId", historyController.getHistoryByQuestion);

historyRouter.delete("/:attemptId", historyController.deleteHistory);

historyRouter.delete("/question/:questionId", historyController.deleteQuestionHistory);

module.exports = historyRouter;