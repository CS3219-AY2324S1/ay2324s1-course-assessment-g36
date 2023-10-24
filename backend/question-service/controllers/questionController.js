const Questions = require("../models/questionModel");

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

        if (! ['Easy', 'Medium', 'Hard'].includes(complexity)) {
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

const getQuestionsByComplexity = async (req, res, next) => {
    try {
        const complexity = req.params.complexity;

        if (! ['Easy', 'Medium', 'Hard'].includes(complexity)) {
                res.status(400).json({error: "Invalid complexity"});
                return;                
        }

        const questionList = await Questions.find({complexity: complexity});

        res.status(200).json({res: questionList});

    } catch (err) {
        next(err);
    }
}

const getQuestionsByCategory = async (req, res, next) => {
    try {
        const categories = req.query.category;
        const complexity = req.params.complexity;

        if (! ['Easy', 'Medium', 'Hard'].includes(complexity)) {
            res.status(400).json({error: "Invalid complexity"});
            return;                
        }

        // at least 1 matching category
        const questionList = await Questions.find({ 
            complexity: complexity,
            categories: {
                $elemMatch: { 
                    $in: categories 
                }
            }
        });

        if (questionList.length == 0) {
            // no matching categories -> return only matching complexity
            const altQuestionList = await Questions.find({ complexity: complexity});

            res.status(200).json({res: altQuestionList});
            return;
        } else {
            res.status(200).json({res: questionList});
        }

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
        const title = req.params.questionTitle;
        const question = await Questions.findOne({title: title});

        if (!question) {
            res.status(404).json({error: "Question does not exist"});
            return;
        }

        await Questions.deleteOne({title : title});
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addQuestion,
    getAllQuestions,
    getQuestionById,
    getQuestionsByComplexity,
    getQuestionsByCategory,
    updateQuestion,
    deleteQuestion
}