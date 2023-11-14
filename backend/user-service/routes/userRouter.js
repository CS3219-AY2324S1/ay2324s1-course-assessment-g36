const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const { authenticateAdmin, authenticateProfile } = require("../middleware/authenticate")

userRouter.param("userId", authenticateProfile);

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginUser);

userRouter.get(
  "/",
  authenticateAdmin,
  userController.getAllUsers,
);

userRouter.get("/:userId", userController.getUserById);

userRouter.put("/:userId", userController.updateUser);

userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
