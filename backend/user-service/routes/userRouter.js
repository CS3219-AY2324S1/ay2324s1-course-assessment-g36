const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.param("userId", userController.authenticateProfile);

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginUser);

userRouter.get(
  "/",
  userController.authenticateAdmin,
  userController.getAllUsers,
);

userRouter.get("/:userId", userController.getUserById);

userRouter.put("/:userId", userController.updateUser);

userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
