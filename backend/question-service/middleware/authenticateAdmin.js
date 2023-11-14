const jwt = require("jsonwebtoken");

const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    if (!user.isAdmin) {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
  next();
};

module.exports = {
  authenticateAdmin,
};
