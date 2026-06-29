import { useState } from "react";

import Navbar from "../components/Navbar";
import DirectorForm from "../components/DirectorForm";
import DirectorTable from "../components/DirectorTable";

function Home() {
    const [directors, setDirectors] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);

    const saveDirector = (director) => {
        if (selectedDirector) {
            const updatedDirectors = directors.map((item) =>
                item.id === selectedDirector.id
                    ? { ...director, id: selectedDirector.id }
                    : item
            );

            setDirectors(updatedDirectors);
            setSelectedDirector(null);
            return;
        }

        const newDirector = {
            id: Date.now(),
            ...director,
        };

        setDirectors([...directors, newDirector]);
    };

    const deleteDirector = (id) => {
        const confirmDelete = window.confirm("¿Deseas eliminar este director?");

        if (!confirmDelete) return;

        setDirectors(directors.filter((director) => director.id !== id));
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
            </main>
        </>
    );
}

export default Home;