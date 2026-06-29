import { useEffect, useState } from "react";

function MovieForm({ saveMovie, selectedMovie, cancelEdit, directors }) {
    const [form, setForm] = useState({
        name: "",
        releaseYear: "",
        gender: "",
        duration: "",
        directorId: "",
    });

    useEffect(() => {
        if (selectedMovie) {
            setForm({
                name: selectedMovie.name,
                releaseYear: selectedMovie.releaseYear,
                gender: selectedMovie.gender,
                duration: selectedMovie.duration,
                directorId: selectedMovie.directorId,
            });
        }
    }, [selectedMovie]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        saveMovie({
            ...form,
            releaseYear: Number(form.releaseYear),
            directorId: Number(form.directorId),
        });

        setForm({
            name: "",
            releaseYear: "",
            gender: "",
            duration: "",
            directorId: "",
        });
    };

    const handleCancel = () => {
        setForm({
            name: "",
            releaseYear: "",
            gender: "",
            duration: "",
            directorId: "",
        });

        cancelEdit();
    };

    return (
        <section className="card">
            <h3>{selectedMovie ? "Editar Película" : "Nueva Película"}</h3>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />

                <input
                    type="number"
                    name="releaseYear"
                    value={form.releaseYear}
                    onChange={handleChange}
                    placeholder="Año de estreno"
                    required
                />

                <input
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    placeholder="Género"
                    required
                />

                <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Duración, ejemplo: 02:30:00"
                    required
                />

                <select
                    name="directorId"
                    value={form.directorId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un director</option>

                    {directors.map((director) => (
                        <option key={director.id} value={director.id}>
                            {director.name}
                        </option>
                    ))}
                </select>

                <div className="button-group">
                    <button type="submit">
                        {selectedMovie ? "Actualizar" : "Guardar"}
                    </button>

                    {selectedMovie && (
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}

export default MovieForm;