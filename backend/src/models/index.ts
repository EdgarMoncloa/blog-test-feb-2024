import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
// const sqlite3 = require("sqlite3").verbose();

// export async function openDb() {
//   const dbPath = path.resolve(__dirname, "db/db.sqlite");
//   const db = new sqlite3.Database(dbPath);

//   if (!fs.existsSync(dbPath)) {
//     const schemaPath = path.resolve(__dirname, "db/schema.sql");
//     db.serialize(() => {
//       const lines = fs
//         .readFileSync(schemaPath, "utf8")
//         .split("\n")
//         .filter((x: any) => x);
//       for (var i = 0; i < lines.length; i++) {
//         if (lines[i].indexOf("sqlite_sequence") > -1) {
//           continue;
//         }
//         db.run(lines[i]);
//       }
//     });
//   }
//   return open({
//     filename: dbPath,
//     driver: sqlite3.Database,
//   });
// }

class db {
  db: sqlite3.Database | null;
  constructor() {
    this.db = null;
  }

  openDb = () => {
    const dbPath = path.resolve(__dirname, "db/db.sqlite");
    this.db = new sqlite3.Database(dbPath);

    if (!fs.existsSync(dbPath)) {
      const schemaPath = path.resolve(__dirname, "db/schema.sql");
      this.db.serialize(() => {
        const lines = fs
          .readFileSync(schemaPath, "utf8")
          .split("\n")
          .filter((x: any) => x);
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].indexOf("sqlite_sequence") > -1) {
            continue;
          }
          if (this.db !== null) this.db.run(lines[i]);
        }
      });
    }
    return open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  };
}

const dbInstance = new db();
await dbInstance.openDb();

export default new db