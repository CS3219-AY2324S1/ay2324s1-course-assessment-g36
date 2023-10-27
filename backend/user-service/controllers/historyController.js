const { Users, Histories } = require('../models');
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

const addHistory = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const { questionId, attempt, language } = req.body;
    
        if (!userId || !questionId || !attempt || !language) {
            res.status(400).json({error: "Missing field"});
            return;
        }

        const existingUser = await Users.findByPk(userId);

        if (!existingUser) {
            res.status(404).json({error: "User does not exist"});
            return;
        }

        const existingHistory = await Histories.findOne({
            where: {userId, questionId}
        })
        
        if (!existingHistory) {
            const history = await Histories.create({
                userId: userId,
                questionId: questionId,
                attempt: attempt,
                language: language
            });
        
            res.status(201).json({ res: history});
        } else {
            existingHistory.attempt = attempt;
            existingHistory.language = language;

            await existingHistory.save();
            res.status(200).json({ res: existingHistory});
        }

    } catch (err) {
        next(err);
    }
  };  

const getHistoryByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId

        const existingUser = await Users.findByPk(userId);

        if (!existingUser) {
            res.status(404).json({error: "User does not exist"});
            return;
        }

        const historyList = await Histories.findAll({
            where: {userId}
        })

        if (!historyList) {
            res.status(404).json({error: "History does not exist"});
            return;
        }

        res.status(200).json({res: historyList});
    } catch (err) {
        next(err);
    }
}

const getHistoryByQuestion = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const questionId = req.params.questionId

        const existingUser = await Users.findByPk(userId);

        if (!existingUser) {
            res.status(404).json({error: "User does not exist"});
            return;
        }

        const history = await Histories.findOne({
            where: {userId, questionId}
        })

        if (!history) {
            res.status(404).json({error: "History does not exist"});
            return;
        }

        res.status(200).json({res: history});
    } catch (err) {
        next(err);
    }
}

const getAllHistory = async (req, res, next) => {
    try {
        const historyList = await Histories.findAll();
        res.status(200).json({ res: historyList});
    } catch (err) {
        next(err);
    }
}

const deleteHistory = async (req, res, next) => {
    try {
        const id = req.params.attemptId;

        const history = await Histories.findByPk(id)

        if (!history) {
            res.status(404).json({error: "History does not exist"});
            return;
        }

        await Histories.destroy({where: {attemptId: id}});
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }

};

const deleteQuestionHistory = async (req, res, next) => {
    try {
        const id = req.params.questionId;

        await Histories.destroy({where: {questionId: id}});
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addHistory,
    getHistoryByUser,
    getHistoryByQuestion,
    getAllHistory,
    deleteHistory,
    deleteQuestionHistory
}