import { Database, Statement } from "sqlite";

type Task = {
  title: string;
  author: string;
  postDate: Date;
  content: string;
};
class blogController {
  constructor(private db: Database) {}

  async createPost(task: Task): Promise<Task> {
    const { title, author, postDate, content } = task;
    const sql =
      "INSERT INTO blogPost (title, author,postDate, content) VALUES (?, ?, ?, ?)";

    const result = await this.db.run(sql, [title, author, postDate, content]);
    if (result.lastID) {
      const createdTask = await this.getPostById(result.lastID);
      return createdTask!;
    } else {
      throw new Error("Failed to create post");
    }
  }

  async getPostById(id: number): Promise<Task | undefined> {
    const sql = "SELECT * FROM blogPost WHERE id = ?";
    const row = await this.db.get(sql, [id]);
    return row as Task | undefined;
  }
}

export default blogController;
