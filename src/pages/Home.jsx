import { useState } from "react";

import Navbar from "../components/Navbar";

import DirectorForm from "../components/DirectorForm";
import DirectorTable from "../components/DirectorTable";

import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";

function Home() {

    // DIRECTOR

    const [directors, setDirectors] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);

    // MOVIES

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // DIRECTOR

    const saveDirector = (director) => {

        if (selectedDirector) {

            const updated = directors.map((item) =>
                item.id === selectedDirector.id
                    ? { ...director, id: selectedDirector.id }
                    : item
            );

            setDirectors(updated);
            setSelectedDirector(null);
            return;
        }

        setDirectors([
            ...directors,
            {
                id: Date.now(),
                ...director,
            },
        ]);
    };

    const deleteDirector = (id) => {

        if (!window.confirm("¿Eliminar este director?"))
            return;

        const hasMovies = movies.some(movie => movie.directorId === id);

        if (hasMovies) {

            alert("No puedes eliminar un director que tiene películas registradas.");

            return;
        }

        setDirectors(
            directors.filter((director) => director.id !== id)
        );
    };

    // MOVIES

    const saveMovie = (movie) => {

        if (selectedMovie) {

            const updated = movies.map((item) =>
                item.id === selectedMovie.id
                    ? { ...movie, id: selectedMovie.id }
                    : item
            );

            setMovies(updated);

            setSelectedMovie(null);

            return;
        }

        setMovies([
            ...movies,
            {
                id: Date.now(),
                ...movie,
            },
        ]);
    };

    const deleteMovie = (id) => {

        if (!window.confirm("¿Eliminar esta película?"))
            return;

        setMovies(
            movies.filter((movie) => movie.id !== id)
        );

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