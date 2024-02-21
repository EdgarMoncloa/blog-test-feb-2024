import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import routes from "./routes";
import BlogController from "./controllers/BlogController";
import db from "./models";
var cors = require("cors");

dotenv.config();
const app: express.Express = express();

app.use(express.json());
app.use(cors());
app.use(routes);

db.openDb();


const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
