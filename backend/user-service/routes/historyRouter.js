const express = require("express");
const historyController = require("../controllers/historyController");
const historyRouter = express.Router();
const {authenticateHistory} = require("../middleware/authenticate")

historyRouter.use(authenticateHistory);

historyRouter.post("/", historyController.addHistory);

historyRouter.get("/", historyController.getHistoryByUser);

historyRouter.get("/:questionId", historyController.getHistoryByQuestion);

historyRouter.delete("/:attemptId", historyController.deleteHistory);

historyRouter.delete(
  "/question/:questionId",
  historyController.deleteQuestionHistory,
);

module.exports = historyRouter;
