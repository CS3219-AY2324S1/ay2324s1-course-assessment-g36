const { Complexity } = require("../models/enums");
const Questions = require("../models/questionModel");
require('dotenv').config({path: "../.env"});

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    } catch {
        return res.sendStatus(401);
    }
    next();
};

const authenticateAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const { user } = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        if (!user.isAdmin) {
            return res.sendStatus(401);
        }
    } catch {
        return res.sendStatus(401);
    }
    next();
};


const addQuestion = async(req, res, next) => {
    try {
        const { id, title, description, link, categories, complexity } = req.body;

        if (!id || !title || ! description || !link || !categories || !complexity) {
            res.status(400).json({error: "Missing field"});
            return;
        }

        const existingQuestion = await Questions.findOne({
            $or: [
              { id: id }, 
              { title: title },
            ],
          });

        if (existingQuestion) {
            res.status(400).json({ error: "Question already exists"});
            return;
        }

        if (!Object.values(Complexity).includes(complexity)) {
                res.status(400).json({error: "Invalid complexity"});
                return;                
        }

        const question = await Questions.create({
            id: id,
            title: title,
            description: description,
            link: link,
            categories: categories,
            complexity: complexity
        })

        res.status(201).json({ res: question});
    } catch (err) {
        next(err);
    }
}

const getAllQuestions = async(req, res, next) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json({ res: questionList});
    } catch (err) {
        next(err);
    }
}

const getQuestionById = async(req, res, next) => {
    try {
        const id = req.params.questionId;
        const question = await Questions.findOne({ id: id});
        if (!question) {
            res.status(404).json({error: "Question does not exist"});
            return;
        }
        res.status(200).json({res: question});
    } catch (err) {
        next(err);
    }
}

const getRandomIdByComplexity = async (req, res, next) => {
    try {
        const complexity = req.params.complexity;

        if (!Object.values(Complexity).includes(complexity)) {
            res.status(400).json({error: "Invalid complexity"});
            return;                
        }

        const matchedId = await Questions.aggregate([
            { $match: {complexity: complexity} },
            { $sample: { size: 1 } },
            { $project: { _id: 0, id: 1 } }
        ]);

        res.status(200).json({res: matchedId[0]});

    } catch (err) {
        next(err);
    }
}

const updateQuestion = async(req, res, next) => {
    try {
        const id = req.params.questionId;
        const question = await Questions.findOne({id: id});

        if (!question) {
            res.status(404).json({error: "Question does not exist"});
            return;
        }

        const { title, description, link, categories, complexity } = req.body;

        if (title && typeof title == 'string') {
            const existingQuestion = await Questions.findOne({ title: title });
    
            if (existingQuestion && existingQuestion.id != id) {
                res.status(400).json({ error: "Question already exists"});
                return;
            }
            question.title = title;
        }

        if (description && typeof description == 'string') {
            question.description = description;
        }

        if (link && typeof link == 'string') {
            question.link = link;
        }

        if (categories && Array.isArray(categories) && categories.every((item) => typeof item === 'string')) {
            question.categories = categories;
        }

        if (complexity && typeof complexity == 'string') {
            question.complexity = complexity;
        }
        
        await question.save();
        res.status(200).json({res: question});
    } catch (err) {
        next(err);
    }
}

const deleteQuestion = async (req, res, next) => {
    try {
        const id = req.params.questionId;
        const question = await Questions.findOne({id: id});

        if (!question) {
            res.status(404).json({error: "Question does not exist"});
            return;
        }

        await Questions.deleteOne({id : id});
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    authenticate,
    authenticateAdmin,
    addQuestion,
    getAllQuestions,
    getQuestionById,
    getRandomIdByComplexity,
    updateQuestion,
    deleteQuestion
}