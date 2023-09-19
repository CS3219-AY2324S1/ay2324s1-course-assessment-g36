const express = require('express');
// const {errorHandler} = require('../middleware/errorHandler');
const { Users } = require('../models');
const bcrypt = require("bcrypt");

// CREATE
const addUser = async (req, res) => {
    const {username, email, Password } = req.body;  
    // if (!username || !email || !Password) {

    // }
    bcrypt.hash(Password, 10).then((hash) => {
        const user = Users.create({
            username: username,
            email: email,
            Password: hash,
        })
        res.status(200).send(user);
    })

}

// READ
const getAllUsers = async (req, res) => {
    const userList = await Users.findAll();
    res.status(200).send(userList);
}

const getUserById = async (req, res) => {
    const id = req.params.userId
    const user = await Users.findByPk(id);
    res.status(200).send(user);
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
    getAllUsers,
    getUserById,
    updateUseremail,
    deleteUser
}