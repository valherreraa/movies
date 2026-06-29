function MovieTable({
    movies,
    directors,
    editMovie,
    deleteMovie,
}) {

    const getDirectorName = (directorId) => {

        const director = directors.find(
            (director) => director.id === directorId
        );

        return director ? director.name : "Sin director";

    };

    return (

        <section className="card">

            <h3>Lista de Películas</h3>

            <table>

                <thead>

                    <tr>

                        <th>Nombre</th>
                        <th>Año</th>
                        <th>Género</th>
                        <th>Duración</th>
                        <th>Director</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        movies.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="6">

                                        No hay películas registradas.

                                    </td>

                                </tr>

                            )

                            :

                            movies.map((movie) => (

                                <tr key={movie.id}>
                                    
                                    <td>{movie.name}</td>
                                    <td>{movie.releaseYear}</td>
                                    <td>{movie.gender}</td>
                                    <td>{movie.duration}</td>
                                    <td>{getDirectorName(movie.directorId)}</td>

                                    <td>

                                        <button
                                            onClick={() => editMovie(movie)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="danger-button"
                                            onClick={() => deleteMovie(movie.id)}
                                        >
                                            Eliminar
                                        </button>

                                    </td>

                                </tr>

                            ))
                    }

                </tbody>

            </table>

        </section>

    );

}

export default MovieTable;