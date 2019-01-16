-- Table Definition ----------------------------------------------

CREATE TABLE hello (
    id SERIAL PRIMARY KEY,
    content text NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX hello_pkey ON hello(id int4_ops);

-- Data ----------------------------------------------------------

INSERT INTO "public"."hello"("id","content")
VALUES
(1,E'Hello Postgres!'),
(2,E'Hello again!');