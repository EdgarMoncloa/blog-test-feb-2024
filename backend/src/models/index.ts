import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

class Database {
  db: sqlite3.Database | null;
  constructor() {
    this.db = null;
  }

  // get

  openDb = () => {
    const dbPath = path.resolve(__dirname, "db/db.sqlite3");

    if (fs.existsSync(dbPath)) {
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.log("[server]: Database connection error ", err.message);
        }
        console.log("[server]: Database conected.");
      });
    } else {
      this.db = new sqlite3.Database(
        dbPath,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
          if (err) {
            console.log("[server]: Database connection error ", err.message);
          }
          console.log("[server]: Database created.");
        }
      );
      this.db.serialize(() => {
        this.db?.run(`CREATE TABLE blogPost (
          id INTEGER PRIMARY KEY NOT NULL,
          title STRING NOT NULL,
          author STRING NOT NULL,
          post_date DATE NOT NULL,
          content TEXT NOT NULL
        );`);
        this.db?.run(`INSERT INTO blogPost (title, author, post_date, content)
        VALUES (
            "test title",
            "test author",
            "01/01/2024",
            "test content"
          );`);
      });
    }
  };
  closeDb = () => {
    if (this.db === null) return;
    this.db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("[server]: Closed the database connection.");
    });
  };
  getBlogPosts = async () => {
    return new Promise((res, rej) => {
      this.db?.all("SELECT * FROM blogPost", (err, rows) => {
        if (err) {
          console.log(`[server]: error in sql query: ${err}`);
          rej(err);
        }
        res(rows);
      });
    });
  };
  createBlogPost = async (
    title: string,
    author: string,
    post_date: string,
    content: string
  ) => {
    return new Promise((res, rej) => {
      if (this.db === null) return rej("no database started");
      this.db.run(
        `INSERT INTO blogpost(title, author, post_date, content) VALUES(?,?,?,?)`,
        [title, author, post_date, content],
        function (err) {
          if (err) {
            console.log(`[server]: db error`, err.message);
            rej("Error inserting post");
            return;
          }
          res(this.lastID);
        }
      );
    });
  };
}

const db = new Database();

export default db;
