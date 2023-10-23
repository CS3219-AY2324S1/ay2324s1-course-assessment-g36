const express = require('express');
const historyController = require("../controllers/historyController");
const historyRouter = express.Router();


historyRouter.post("/:userId", historyController.addHistory);

historyRouter.get("/:userId", historyController.getHistoryByUser);

historyRouter.get("/:userId/:questionId", historyController.getHistoryByQuestion);

// for debugging purposes only
historyRouter.get("/", historyController.getAllHistory);

module.exports = historyRouter;