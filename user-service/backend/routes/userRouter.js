const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");


// CREATE
userRouter.post("/register", userController.addUser);

userRouter.post("/login", userController.loginUser);

// READ
userRouter.get("/", userController.getAllUsers)

userRouter.get("/:userId", userController.getUserById)

// UPDATE
userRouter.put("/:userId", userController.updateUseremail);

// DELETE
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;