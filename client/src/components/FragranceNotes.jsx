import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FragranceNotes({ id }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFragranceNotes = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:4000/api/notes/product-notes/${id}`
                );
                
                console.log("Respuesta de la API:", response.data);
                
                // Verificamos que la respuesta tenga éxito y contenga datos
                if (response.data.success && response.data.data && response.data.data.fragrance_notes) {
                    setNotes(response.data.data.fragrance_notes);
                } else {
                    setNotes([]);
                }
            } catch (err) {
                console.error("Error fetching fragrance notes:", err);
                setError(err.response?.data?.message || "Error al obtener las notas de fragancia");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchFragranceNotes();
    }, [id]);

    if (loading) return <div className="text-gray-500">Cargando notas de fragancia...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Notas de Fragancia
            </h3>
            
            {notes.length > 0 ? (
                <ul className="grid grid-cols-2 gap-2">
                    {notes.map((note) => (
                        <li 
                            key={note.note_id} 
                            className="flex items-center text-gray-700 dark:text-gray-300"
                        >
                            <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                            {note.note_name} ({note.position})
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    Este producto no tiene notas de fragancia registradas.
                </p>
            )}
        </div>
    );
}

export default FragranceNotes;