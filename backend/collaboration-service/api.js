import express from "express";
import jwt from "jsonwebtoken";
import { getCodeExplanation } from "./openai.js";

const { JSON_WEB_TOKEN_SECRET } = process.env;

const apiRouter = express();

// Ensure that all requests are authenticated.
apiRouter.use((req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    const user = jwt.verify(token, JSON_WEB_TOKEN_SECRET);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

apiRouter.post(
  "/explain",

  async (req, res, next) => {
    try {
      const { code, language } = req.body;
      const response = await getCodeExplanation(code, language);
      res.status(201).json({ response });
    } catch (err) {
      next(err);
    }
  },
);

apiRouter.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ error: err.message });
});

export { apiRouter };
