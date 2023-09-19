const express = require('express');
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

// CREATE
const addUser = async (req, res, next) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
    
        // CHECK FOR MISSING FIELDS
        if (!username || !email || !password || !firstName || !lastName) {
            res.status(400).send("Missing field");
            return;
        }

        // CHECK FOR DUPLICATE USERS
        const count = await Users.count({
            where: {
              [Op.or]: [
                { email: email },
                { username: username },
              ],
            },
          });

        if (count !== 0) {
            res.status(400).send("User already exists");
            return;
        }
    
        const hash = await bcrypt.hash(password, 10);
    
        const user = await Users.create({
            username: username,
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName
        });
    
        res.status(201).send(user);
    } catch (err) {
        next(err);
    }
  };  


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // CHECK FOR MISSING FIELDS
        if (!username || !password) {
            res.status(400).send("Missing field");
            return;
        }

        const user = await Users.findOne({ where: { username: username } });
    
        if (!user) {
            res.status(404).send("User does not exist");
            return;
        } else {
            bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    res.status(401).send("Wrong password. Please try again!");
                    return;
                } else {
                    res.status(200).send(user)
                }
            });
        }
    } catch (err) {
        next(err);
    }

}

// READ
const getAllUsers = async (req, res, next) => {
    try {
        const userList = await Users.findAll();
        res.status(200).send(userList);
    } catch (err) {
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).send("User does not exist");
            return;
        }
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
}

// UPDATE
// TODO: update password
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await Users.findByPk(id);
        if (!user) {
            res.status(404).send("User does not exist");
            return;
        }

        const { username, firstName, lastName, summary, education, work, github, website } = req.body;

        if (username && typeof username == 'string') {
            const existingUser = await Users.findOne({ where: { username: username }});
    
            if (existingUser && existingUser.userId != id) {
                res.status(400).send("Username already taken");
                return;
            }
            user.username = username;
        }

        if (firstName && typeof firstName == 'string') {
            user.firstName = firstName;
        }

        if (lastName && typeof lastName == 'string') {
            user.lastName = lastName;
        }

        if (summary && typeof summary == 'string') {
            user.summary = summary;
        }

        if (summary && typeof summary == 'string') {
            user.summary = summary;
        }

        if (education && typeof education == 'string') {
            user.education = education;
        }

        if (work && typeof work == 'string') {
            user.work = work;
        }

        if (github && typeof github == 'string') {
            user.github = github;
        }

        if (github && typeof github == 'string') {
            user.github = github;
        }

        if (website && typeof website == 'string') {
            user.website = website;
        }

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }

}

// DELETE
const deleteUser = async (req, res, next) => {
    const id = req.params.userId;
    await Users.destroy({
        where: {
            userId: id,
        }
    })
    res.status(200).send("User deleted")
};

module.exports = {
    addUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}