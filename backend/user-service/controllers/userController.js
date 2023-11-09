const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const authenticateAdmin = async (req, res, next) => {
  if (["/login", "/register"].includes(req.path)) {
    next();
    return;
  }

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET).isAdmin) {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(401);
  }
  next();
};

const authenticateProfile = async (req, res, next, value) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

    const requestType = req.method;

    if (
      `${user.userId}` !== value &&
      !(user.isAdmin && requestType !== "PUT")
    ) {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(401);
  }
  next();
};

const addUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: "Missing field" });
      return;
    }

    const count = await Users.count({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });

    if (count !== 0) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username: username,
      email: email,
      password: hash,
    });

    res.status(201).json({ res: user });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Missing field" });
      return;
    }

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ error: "Wrong password. Please try again!" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JSON_WEB_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({ res: token });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const userList = await Users.findAll();
    res.status(200).json({ res: userList });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await Users.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }
    res.status(200).json({ res: user });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await Users.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }

    const {
      username,
      password,
      firstName,
      lastName,
      summary,
      education,
      work,
      github,
      website,
    } = req.body;

    if (username && typeof username == "string") {
      const existingUser = await Users.findOne({
        where: { username: username },
      });

      if (existingUser && existingUser.userId != id) {
        res.status(400).json({ error: "Username already taken" });
        return;
      }
      user.username = username;
    }

    if (password && typeof password == "string") {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
    }

    if (firstName && typeof firstName == "string") {
      user.firstName = firstName;
    }

    if (lastName && typeof lastName == "string") {
      user.lastName = lastName;
    }

    if (summary && typeof summary == "string") {
      user.summary = summary;
    }

    if (education && typeof education == "string") {
      user.education = education;
    }

    if (work && typeof work == "string") {
      user.work = work;
    }

    if (github && typeof github == "string") {
      user.github = github;
    }

    if (website && typeof website == "string") {
      user.website = website;
    }

    await user.save();
    res.status(200).json({ res: user });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await Users.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }
    await Users.destroy({ where: { userId: id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticateAdmin,
  authenticateProfile,
  addUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
