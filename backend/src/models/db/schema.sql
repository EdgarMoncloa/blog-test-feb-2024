--
-- File generated with SQLiteStudio v3.2.1 on mar. feb. 20 10:45:25 2024
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;
-- Table: blogPost
CREATE TABLE blogPost (
  id INTEGER PRIMARY KEY NOT NULL,
  title STRING NOT NULL,
  author STRING NOT NULL,
  post_date DATE NOT NULL,
  content TEXT NOT NULL
);
COMMIT TRANSACTION;
INSERT INTO blogPost (title, author, post_date, content)
VALUES (
    "test title",
    "test author",
    "01/01/2024",
    "test content"
  );
PRAGMA foreign_keys = on;