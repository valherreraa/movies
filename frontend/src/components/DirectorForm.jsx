import { useEffect, useState } from "react";

function DirectorForm({ saveDirector, selectedDirector, cancelEdit }) {
    const [form, setForm] = useState({
        name: "",
        nationality: "",
        age: "",
        active: true,
    });

    useEffect(() => {
        if (selectedDirector) {
            setForm({
                name: selectedDirector.name,
                nationality: selectedDirector.nationality,
                age: selectedDirector.age,
                active: selectedDirector.active,
            });
        }
    }, [selectedDirector]);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        saveDirector(form);

        setForm({
            name: "",
            nationality: "",
            age: "",
            active: true,
        });
    };

    const handleCancel = () => {
        setForm({
            name: "",
            nationality: "",
            age: "",
            active: true,
        });

        cancelEdit();
    };

    return (
        <section className="card">
            <h3>{selectedDirector ? "Editar Director" : "Nuevo Director"}</h3>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />

                <input
                    name="nationality"
                    value={form.nationality}
                    onChange={handleChange}
                    placeholder="Nacionalidad"
                    required
                />

                <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Edad"
                    required
                />

                <label>
                    <input
                        type="checkbox"
                        name="active"
                        checked={form.active}
                        onChange={handleChange}
                    />
                    Activo
                </label>

                <div className="button-group">
                    <button type="submit">
                        {selectedDirector ? "Actualizar" : "Guardar"}
                    </button>

                    {selectedDirector && (
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

export default DirectorForm;