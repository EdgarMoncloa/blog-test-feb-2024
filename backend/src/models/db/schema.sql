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
INSERT INTO blogPost (title, author, post_date, content)
VALUES (
    "Sobre mí.",
    "Edgar Moncloa",
    "20/02/2024",
    "Me encanta crear cosas, aprendo rápido y me gusta enseñar."
  );
INSERT INTO blogPost (title, author, post_date, content)
VALUES (
    "Sobre el front-end",
    "Edgar M.",
    "20/02/2024",
    "Esto fue lo que más tiempo llevó, si bien pensé utilizar redux para manejar el estado y tal sentí que no era necesario por la baja complejidad de la app. Lo mismo para alguna libreria como MUI, aun así styled-components agiliza bastante el trabajo cuando se habla de agregar estilos en react."
  );
INSERT INTO blogPost (title, author, post_date, content)
VALUES (
    "Sobre el back-end",
    "Edgar Moncloa",
    "20/02/2024",
    "Igual que el front se simplificaron varias cosas utilizando sqlite3 para no complicar la instalación. De este lado la aplicación es mucho menos complejo así que la organización por folders con una jerarquía debajo de routes o demás no me pareció muy buena idea. Y aunque no se agregó esto, aún se siente que todo el código pudo estar bien organizado sin los folders para el modelo, las rutas y los controladores."
  );
COMMIT TRANSACTION;
PRAGMA foreign_keys = on;