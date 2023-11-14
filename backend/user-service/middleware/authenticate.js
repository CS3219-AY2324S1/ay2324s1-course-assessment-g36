const jwt = require("jsonwebtoken");

const getUserFromToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const user = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
  return user;
};

const authenticateHistory = (req, res, next) => {
  try {
    req.user = getUserFromToken(req);
  } catch {
    return res.sendStatus(401);
  }
  next();
};

const authenticateAdmin = (req, res, next) => {
  if (["/login", "/register"].includes(req.path)) {
    next();
    return;
  }

  try {
    const user = getUserFromToken(req);
    if (!user.isAdmin) {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(401);
  }
  next();
};

const authenticateProfile = (req, res, next, value) => {
  try {
    const user = getUserFromToken(req);
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

module.exports = {
  authenticateHistory,
  authenticateAdmin,
  authenticateProfile,
};
