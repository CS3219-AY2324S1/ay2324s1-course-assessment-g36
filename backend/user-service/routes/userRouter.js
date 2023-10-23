const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();


userRouter.post("/register", userController.addUser);

userRouter.post("/login", userController.loginUser);

userRouter.get("/", userController.getAllUsers)

userRouter.get("/:userId", userController.getUserById)

userRouter.put("/:userId", userController.updateUser);

userRouter.delete("/:attemptId", userController.deleteUser);

module.exports = userRouter;