import express, { Router } from "express";

const MainRouter = Router();
MainRouter.get("/blog", (req: express.Request, res: express.Response) => {
  res.send("TestBlog");
});

export default MainRouter;
