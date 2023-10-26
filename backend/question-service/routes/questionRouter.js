const express = require('express');
const questionController = require('../controllers/questionController');
const questionRouter = express.Router();

questionRouter.post('/', questionController.addQuestion);

questionRouter.get('/', questionController.getAllQuestions);

questionRouter.get('/:questionId', questionController.getQuestionById);

questionRouter.put('/:questionId', questionController.updateQuestion);

questionRouter.delete('/:questionTitle', questionController.deleteQuestion);

module.exports = questionRouter;
