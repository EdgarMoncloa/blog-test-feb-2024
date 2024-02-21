import express, { Router } from "express";
import db from "./../models";

const MainRouter = Router();
MainRouter.get(
  "/feed-blogpost",
  (req: express.Request, res: express.Response) => {
    db.getBlogPosts().then((rows) => {
      res.send(JSON.stringify(rows));
    });
  }
);

const checkIfNotExistOrEmpty = (val: any) => {
  return val !== undefined && val !== "" && val !== null;
};

MainRouter.post("/feed-blogpost", async (req, res) => {
  const postData = req.body;
  if (
    checkIfNotExistOrEmpty(postData.title) &&
    checkIfNotExistOrEmpty(postData.author) &&
    checkIfNotExistOrEmpty(postData.post_date) &&
    checkIfNotExistOrEmpty(postData.content)
  ) {
    try {
      const lastID = await db.createBlogPost(
        postData.title,
        postData.author,
        postData.post_date,
        postData.content
      );
      res.status(200).json({
        lastID,
        title: postData.title,
        author: postData.author,
        post_date: postData.post_date,
        content: postData.content,
      });
    } catch (error) {
      res.status(400).json({ error: "can't insert" });
    }
  } else {
    res.status(400).json({ error: "empty values" });
  }
});

export default MainRouter;
