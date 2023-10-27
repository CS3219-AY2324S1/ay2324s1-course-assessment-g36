const express = require('express');
const questionController = require('../controllers/questionController');
const questionRouter = express.Router();

questionRouter.post('/', questionController.addQuestion, questionController.authenticateAdmin);

questionRouter.get('/', questionController.getAllQuestions, questionController.authenticate);

questionRouter.get(
    '/:questionId',
    questionController.getQuestionById,
    questionController.authenticate
);

questionRouter.put(
    '/:questionId',
    questionController.updateQuestion,
    questionController.authenticateAdmin
);

questionRouter.delete(
    '/:questionTitle',
    questionController.deleteQuestion,
    questionController.authenticateAdmin
);

module.exports = questionRouter;
