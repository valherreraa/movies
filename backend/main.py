from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import psycopg2.extras

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Conexión a la base de datos 
def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="moviesdb",
        user="postgres",
        password="1234"
    )



#  DIRECTORS

@app.get("/directors")
def get_directors():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("SELECT * FROM director")
    directors = cursor.fetchall()
    conn.close()
    return directors


@app.post("/directors")
def create_director(director: dict):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(
        "INSERT INTO director (name, nationality, age, active) VALUES (%s, %s, %s, %s) RETURNING *",
        (director["name"], director["nationality"], director["age"], director["active"])
    )
    new_director = cursor.fetchone()
    conn.commit()
    conn.close()
    return new_director


@app.put("/directors/{director_id}")
def update_director(director_id: int, director: dict):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(
        "UPDATE director SET name=%s, nationality=%s, age=%s, active=%s WHERE id=%s RETURNING *",
        (director["name"], director["nationality"], director["age"], director["active"], director_id)
    )
    updated = cursor.fetchone()
    conn.commit()
    conn.close()
    if not updated:
        raise HTTPException(status_code=404, detail="Director no encontrado")
    return updated


@app.delete("/directors/{director_id}")
def delete_director(director_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM movies WHERE director_id = %s", (director_id,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="El director tiene películas registradas")
    cursor.execute("DELETE FROM director WHERE id = %s", (director_id,))
    conn.commit()
    conn.close()
    return {"message": "Director eliminado"}



#  MOVIES

@app.get("/movies")
def get_movies():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("SELECT * FROM movies")
    movies = cursor.fetchall()
    conn.close()
    return movies


@app.post("/movies")
def create_movie(movie: dict):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(
        "INSERT INTO movies (name, release_year, gender, duration, director_id) VALUES (%s, %s, %s, %s, %s) RETURNING *",
        (movie["name"], movie["releaseYear"], movie["gender"], movie["duration"], movie["directorId"])
    )
    new_movie = cursor.fetchone()
    conn.commit()
    conn.close()
    return new_movie


@app.put("/movies/{movie_id}")
def update_movie(movie_id: int, movie: dict):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(
        "UPDATE movies SET name=%s, release_year=%s, gender=%s, duration=%s, director_id=%s WHERE id=%s RETURNING *",
        (movie["name"], movie["releaseYear"], movie["gender"], movie["duration"], movie["directorId"], movie_id)
    )
    updated = cursor.fetchone()
    conn.commit()
    conn.close()
    if not updated:
        raise HTTPException(status_code=404, detail="Película no encontrada")
    return updated


@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM movies WHERE id = %s", (movie_id,))
    conn.commit()
    conn.close()
    return {"message": "Película eliminada"}
