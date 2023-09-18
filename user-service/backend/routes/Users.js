const express = require('express');
const router = express.Router();
const { Users } = require('../models');


router.get("/", async (req, res) => {
    const userList = await Users.findAll();
    res.json(userList);
})

router.post("/", async (req, res) => {
    const user = req.body;  
    await Users.create(user);
    res.json(user);
})

module.exports = router;