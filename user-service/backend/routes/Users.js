const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");


// CREATE
router.post("/register", async (req, res) => {
    const {Username, Email, Password } = req.body;  
    bcrypt.hash(Password, 10).then((hash) => {
        Users.create({
            Username: Username,
            Email: Email,
            Password: hash,
        })
        res.json("SUCCESS")
    })
})

router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    const user = await Users.findOne({ where: { Email: Email } });

    if (!user) {
        res.json({ error: "User doesn't exist" });
    } else {
        bcrypt.compare(Password, user.Password).then((match) => {
            if (!match) {
                res.json({ error: "Incorrect password!" });
            } else {
                res.json("yay logged in");
            }
        });
    }
});

// READ
router.get("/", async (req, res) => {
    const userList = await Users.findAll();
    res.json(userList);
})

router.get("/:UserId", async (req, res)=> {
    const id = req.params.UserId
    const user = await Users.findByPk(id);
    res.json(user);
})

// UPDATE
router.put("/:UserId", async (req, res) => {
    const { UserId } = req.params;
    const { Email } = req.body;
    const user = await Users.update({ Email: Email }, { where: { UserId: UserId } });
    res.json(user);
});


// DELETE
router.delete("/:UserId", async (req, res) => {
    const id = req.params.UserId;
    const user = await Users.destroy({
        where: {
            UserId: id,
        }
    })
    res.json(user);
})

module.exports = router;