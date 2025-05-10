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
                
                if (response.data.success && response.data.data && response.data.data.fragrance_notes) {
                    // Ordenamos las notas por posición (1 a 8)
                    const sortedNotes = [...response.data.data.fragrance_notes]
                        .sort((a, b) => a.position - b.position);
                    setNotes(sortedNotes);
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

    // Función para obtener el color del borde según la posición (1-8)
    const getBorderColor = (position) => {
        const borderColors = [
            'border-l-4 border-red-500',    // Posición 1 - más intensa
            'border-l-4 border-orange-500',
            'border-l-4 border-amber-500',
            'border-l-4 border-yellow-500',
            'border-l-4 border-lime-500',
            'border-l-4 border-green-500',
            'border-l-4 border-teal-500',
            'border-l-4 border-blue-500'    // Posición 8 - menos intensa
        ];
        return borderColors[position - 1] || 'border-l-4 border-gray-500';
    };

    // Función para obtener el color del punto indicador
    const getDotColor = (position) => {
        const dotColors = [
            'bg-red-500',    // Posición 1
            'bg-orange-500',
            'bg-amber-500',
            'bg-yellow-500',
            'bg-lime-500',
            'bg-green-500',
            'bg-teal-500',
            'bg-blue-500'    // Posición 8
        ];
        return dotColors[position - 1] || 'bg-gray-500';
    };

    // Función para obtener el texto descriptivo de la posición
    const getPositionText = (position) => {
        if (position === 1) return 'Nota de Salida (Más intensa)';
        if (position === 8) return 'Nota de Fondo (Más sutil)';
        return `Nota de Corazón (${position})`;
    };

    if (loading) return <div className="text-gray-500">Cargando notas de fragancia...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Pirámide Olfativa
            </h3>
            
            {/* Leyenda de colores */}
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
                <div className="flex items-center mr-4">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                    <span>Más intensa (1)</span>
                </div>
                <div className="flex items-center mr-4">
                    <span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
                    <span>Media (4)</span>
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                    <span>Más sutil (8)</span>
                </div>
            </div>

            {notes.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {notes.map((note) => (
                        <li 
                            key={note.note_id}
                            className={`flex items-center px-2 py-2 rounded-md bg-white 
                                      shadow-sm hover:shadow-md transition-shadow
                                      ${getBorderColor(note.position)}`}
                        >
                            <span className={`w-3 h-3 rounded-full ${getDotColor(note.position)} mr-3`}></span>
                            <div className="flex-1">
                                <span className="font-medium text-gray-800 block">{note.note_name}</span>
                                <span className="text-xs text-gray-500 block mt-1">
                                    {getPositionText(note.position)}
                                </span>
                            </div>
                            {/* <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded-full">
                                {note.position}/8
                            </span> */}
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
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function FragranceNotes({ id }) {
//     const [notes, setNotes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchFragranceNotes = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(
//                     `http://localhost:4000/api/notes/product-notes/${id}`
//                 );
                
//                 console.log("Respuesta de la API:", response.data);
                
//                 // Verificamos que la respuesta tenga éxito y contenga datos
//                 if (response.data.success && response.data.data && response.data.data.fragrance_notes) {
//                     setNotes(response.data.data.fragrance_notes);
//                 } else {
//                     setNotes([]);
//                 }
//             } catch (err) {
//                 console.error("Error fetching fragrance notes:", err);
//                 setError(err.response?.data?.message || "Error al obtener las notas de fragancia");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) fetchFragranceNotes();
//     }, [id]);

//     if (loading) return <div className="text-gray-500">Cargando notas de fragancia...</div>;
//     if (error) return <div className="text-red-500">{error}</div>;

//     return (
//         <div className="mt-6 w-full">
//             <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
//                 Notas de Fragancia
//             </h3>
            
//             {notes.length > 0 ? (
//                 <ul className="grid grid-cols-2 gap-2">
//                     {notes.map((note) => (
//                         <li 
//                             key={note.note_id} 
//                             className="flex items-center text-gray-700 dark:text-gray-300"
//                         >
//                             <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
//                             {note.note_name} 
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-500 dark:text-gray-400">
//                     Este producto no tiene notas de fragancia registradas.
//                 </p>
//             )}
//         </div>
//     );
// }

// export default FragranceNotes;