import express from "express";
import jwt from "jsonwebtoken";
import { getCodeExplanation, getCodeGeneration } from "./openai.js";

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
      res.header("Content-Type", "text/plain");

      // Stream content to user.
      const stream = await getCodeExplanation(code, language);
      for await (const chunk of stream) {
        res.write(chunk.choices[0]?.delta.content || "");
      }
      res.end();
    } catch (err) {
      next(err);
    }
  },
);

apiRouter.post(
  "/generate",

  async (req, res, next) => {
    try {
      const { description, language } = req.body;
      res.header("Content-Type", "text/plain");

      // Stream content to user.
      const stream = await getCodeGeneration(language, description);
      for await (const chunk of stream) {
        res.write(chunk.choices[0]?.delta.content || "");
      }
      res.end();
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
