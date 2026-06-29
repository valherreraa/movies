import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";

import DirectorForm from "../components/DirectorForm";
import DirectorTable from "../components/DirectorTable";

import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";

const API = "http://localhost:8000";

function Home() {

    // DIRECTOR

    const [directors, setDirectors] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);

    // MOVIES

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch(`${API}/directors`).then(r => r.json()).then(setDirectors);
        fetch(`${API}/movies`).then(r => r.json()).then(setMovies);
    }, []);

    // DIRECTOR

    const saveDirector = async (director) => {

        if (selectedDirector) {
            const res = await fetch(`${API}/directors/${selectedDirector.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(director),
            });
            const updated = await res.json();
            setDirectors(directors.map(d => d.id === selectedDirector.id ? updated : d));
            setSelectedDirector(null);
            return;
        }

        const res = await fetch(`${API}/directors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(director),
        });
        const newDirector = await res.json();
        setDirectors([...directors, newDirector]);
    };

    const deleteDirector = async (id) => {

        if (!window.confirm("¿Eliminar este director?")) return;

        const res = await fetch(`${API}/directors/${id}`, { method: "DELETE" });

        if (!res.ok) {
            alert("No puedes eliminar un director que tiene películas registradas.");
            return;
        }

        setDirectors(directors.filter(d => d.id !== id));
    };

    // MOVIES

    const saveMovie = async (movie) => {

        if (selectedMovie) {
            const res = await fetch(`${API}/movies/${selectedMovie.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movie),
            });
            const updated = await res.json();
            setMovies(movies.map(m => m.id === selectedMovie.id ? updated : m));
            setSelectedMovie(null);
            return;
        }

        const res = await fetch(`${API}/movies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        });
        const newMovie = await res.json();
        setMovies([...movies, newMovie]);
    };

    const deleteMovie = async (id) => {

        if (!window.confirm("¿Eliminar esta película?")) return;

        await fetch(`${API}/movies/${id}`, { method: "DELETE" });

        setMovies(movies.filter(m => m.id !== id));
    };

    return (

        <>

            <Navbar />

            <main className="container">

                <DirectorForm
                    saveDirector={saveDirector}
                    selectedDirector={selectedDirector}
                    cancelEdit={() => setSelectedDirector(null)}
                />

                <DirectorTable
                    directors={directors}
                    editDirector={setSelectedDirector}
                    deleteDirector={deleteDirector}
                />

                <MovieForm
                    saveMovie={saveMovie}
                    selectedMovie={selectedMovie}
                    cancelEdit={() => setSelectedMovie(null)}
                    directors={directors}
                />

                <MovieTable
                    movies={movies}
                    directors={directors}
                    editMovie={setSelectedMovie}
                    deleteMovie={deleteMovie}
                />

            </main>

        </>

    );

}

export default Home;
