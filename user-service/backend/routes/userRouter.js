const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");


// CREATE
userRouter.post("/register", userController.addUser);

// userRouter.post("/login", async (req, res) => {
//     const { email, Password } = req.body;
//     const user = await Users.findOne({ where: { email: email } });

//     if (!user) {
//         res.json({ error: "User doesn't exist" });
//     } else {
//         bcrypt.compare(Password, user.Password).then((match) => {
//             if (!match) {
//                 res.json({ error: "Incorrect password!" });
//             } else {
//                 res.json("yay logged in");
//             }
//         });
//     }
// });

// READ
userRouter.get("/", userController.getAllUsers)

userRouter.get("/:userId", userController.getUserById)

// UPDATE
userRouter.put("/:userId", userController.updateUseremail);

// DELETE
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;