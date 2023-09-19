const express = require('express');
// const {errorHandler} = require('../middleware/errorHandler');
const { Users } = require('../models');
const bcrypt = require("bcrypt");

// CREATE
const addUser = async (req, res) => {
    const {Username, Email, Password } = req.body;  
    // if (!Username || !Email || !Password) {

    // }
    bcrypt.hash(Password, 10).then((hash) => {
        const user = Users.create({
            Username: Username,
            Email: Email,
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
    const id = req.params.UserId
    const user = await Users.findByPk(id);
    res.status(200).send(user);
}

// UPDATE
const updateUserEmail = async (req, res) => {
    const { UserId } = req.params;
    const { email } = req.body;
    const user = await Users.update({ Email: email }, { where: { UserId: UserId} });
    res.status(200).send(user);
}

// DELETE
const deleteUser = async (req, res) => {
    const id = req.params.UserId;
    const user = await Users.destroy({
        where: {
            UserId: id,
        }
    })
    res.status(200).send("User deleted")
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUserEmail,
    deleteUser
}