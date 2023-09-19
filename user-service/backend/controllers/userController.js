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
    
        await Users.create({
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
const getAllUsers = async (req, res) => {
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
const updateUseremail = async (req, res) => {
    const { userId } = req.params;
    const { email } = req.body;
    const user = await Users.update({ email: email }, { where: { userId: userId} });
    res.status(200).send(user);
}

// DELETE
const deleteUser = async (req, res) => {
    const id = req.params.userId;
    const user = await Users.destroy({
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
    updateUseremail,
    deleteUser
}