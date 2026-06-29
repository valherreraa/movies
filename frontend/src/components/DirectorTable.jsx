function DirectorTable({ directors, editDirector, deleteDirector }) {
    return (
        <section className="card">
            <h3>Lista de Directores</h3>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Nacionalidad</th>
                        <th>Edad</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {directors.length === 0 ? (
                        <tr>
                            <td colSpan="5">No hay directores registrados.</td>
                        </tr>
                    ) : (
                        directors.map((director) => (
                            <tr key={director.id}>
                                <td>{director.name}</td>
                                <td>{director.nationality}</td>
                                <td>{director.age}</td>
                                <td>{director.active ? "Sí" : "No"}</td>
                                <td>
                                    <button onClick={() => editDirector(director)}>
                                        Editar
                                    </button>

                                    <button
                                        className="danger-button"
                                        onClick={() => deleteDirector(director.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default DirectorTable;