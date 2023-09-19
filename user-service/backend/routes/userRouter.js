const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");


userRouter.post("/register", userController.addUser);

userRouter.post("/login", userController.loginUser);

userRouter.get("/", userController.getAllUsers)

userRouter.get("/:userId", userController.getUserById)

userRouter.put("/:userId", userController.updateUser);

userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;