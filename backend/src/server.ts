import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import routes from "./routes";
import BlogController from "./controllers/BlogController";
import { openDb } from "./models";

dotenv.config();
const app: express.Express = express();
app.use(routes);
app.use(express.json());

openDb().then((db) => {
  const blogController = new BlogController(db);
});

const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
