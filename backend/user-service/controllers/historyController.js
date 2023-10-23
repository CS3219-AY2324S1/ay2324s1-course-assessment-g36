const { Users, Histories } = require('../models');
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

const addHistory = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const { questionId, attempt } = req.body;
    
        if (!userId || !questionId || !attempt) {
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
            });
        
            res.status(201).json({ res: history});
        } else {
            existingHistory.attempt = attempt;

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

        const attemptList = await Histories.findAll({
            where: {userId}
        })

        if (!attemptList) {
            res.status(404).json({error: "History does not exist"});
            return;
        }

        res.status(200).json({res: attemptList});
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

        const attempt = await Histories.findOne({
            where: {userId, questionId}
        })

        if (!attempt) {
            res.status(404).json({error: "History does not exist"});
            return;
        }

        res.status(200).json({res: attempt});
    } catch (err) {
        next(err);
    }
}

const getAllHistory = async (req, res, next) => {
    try {
        const attemptList = await Histories.findAll();
        res.status(200).json({ res: attemptList});
    } catch (err) {
        next(err);
    }
}

const deleteHistory = async (req, res, next) => {
    try {
        const id = req.params.attemptId;

        const attempt = await Histories.findByPk(id)

        if (!attempt) {
            res.status(404).json({error: "History does not exist"});
            return;
        }

        await Histories.destroy({where: {attemptId: id}});
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
    deleteHistory
}