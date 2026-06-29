CREATE TABLE director (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(200),
    nationality VARCHAR(100),
    age         INTEGER,
    active      BOOLEAN DEFAULT TRUE
);

CREATE TABLE movies (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(100),
    release_year DATE,
    gender       VARCHAR(50),
    duration     TIME,
    director_id  INTEGER REFERENCES director(id)
);
