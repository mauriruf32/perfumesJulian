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
                    // Ordenamos las notas por posición (de 1 a 8)
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

    // Función para obtener el color basado en tipo de nota y posición (1 = más intenso)
    const getNoteColor = (noteName, position) => {
        // Normalizamos el nombre para hacer coincidencias más fáciles
        const normalizedNote = noteName.toLowerCase();
        
        // Definimos paletas de colores por categoría de nota (de más a menos intenso)
        const colorPalettes = {
            floral: ['bg-pink-600', 'bg-pink-500', 'bg-pink-400', 'bg-pink-300', 'bg-pink-200', 'bg-pink-100', 'bg-pink-50', 'bg-pink-50'],
            citrus: ['bg-amber-600', 'bg-amber-500', 'bg-amber-400', 'bg-amber-300', 'bg-amber-200', 'bg-amber-100', 'bg-amber-50', 'bg-amber-50'],
            woody: ['bg-orange-600', 'bg-orange-500', 'bg-orange-400', 'bg-orange-300', 'bg-orange-200', 'bg-orange-100', 'bg-orange-50', 'bg-orange-50'],
            fresh: ['bg-cyan-600', 'bg-cyan-500', 'bg-cyan-400', 'bg-cyan-300', 'bg-cyan-200', 'bg-cyan-100', 'bg-cyan-50', 'bg-cyan-50'],
            oriental: ['bg-purple-600', 'bg-purple-500', 'bg-purple-400', 'bg-purple-300', 'bg-purple-200', 'bg-purple-100', 'bg-purple-50', 'bg-purple-50'],
            default: ['bg-gray-600', 'bg-gray-500', 'bg-gray-400', 'bg-gray-300', 'bg-gray-200', 'bg-gray-100', 'bg-gray-50', 'bg-gray-50']
        };

        // Detectamos el tipo de nota
        let palette = colorPalettes.default;
        
        if (/rosa|jazmín|lavanda|flor|floral|neroli|ylang|magnolia|gardenia/i.test(normalizedNote)) {
            palette = colorPalettes.floral;
        } else if (/limón|naranja|bergamota|mandarina|cítrico|pomelo|lima/i.test(normalizedNote)) {
            palette = colorPalettes.citrus;
        } else if (/madera|sándalo|cedro|pachulí|vetiver|roble|ébano|caoba/i.test(normalizedNote)) {
            palette = colorPalettes.woody;
        } else if (/marino|ozono|fresco|verde|menta|eucalipto|oceánico|lluvia/i.test(normalizedNote)) {
            palette = colorPalettes.fresh;
        } else if (/ámbar|vainilla|especias|canela|clavo|resina|bálsamo|incienso/i.test(normalizedNote)) {
            palette = colorPalettes.oriental;
        }

        // Aseguramos que la posición esté en el rango 1-8
        const adjustedPosition = Math.max(0, Math.min(7, position - 1));
        return palette[adjustedPosition];
    };

    // Función para obtener el color del texto según el fondo (siempre legible)
    const getTextColor = (bgColor) => {
        const lightBackgrounds = ['bg-pink-50', 'bg-amber-50', 'bg-orange-50', 'bg-cyan-50', 'bg-purple-50', 'bg-gray-50',
                                'bg-pink-100', 'bg-amber-100', 'bg-orange-100', 'bg-cyan-100', 'bg-purple-100', 'bg-gray-100',
                                'bg-pink-200', 'bg-amber-200', 'bg-orange-200', 'bg-cyan-200', 'bg-purple-200', 'bg-gray-200'];
        
        return lightBackgrounds.includes(bgColor) ? 'text-gray-800' : 'text-white';
    };

    if (loading) return <div className="text-gray-500">Cargando notas de fragancia...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mt-6 w-full">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Pirámide Olfativa
            </h3>
            
            <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Notas más intensas</span>
                    <span>Notas más sutiles</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-amber-600 to-amber-100 h-2 rounded-full" 
                        style={{ width: '100%' }}
                    ></div>
                </div>
            </div>

            {notes.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {notes.map((note) => {
                        const bgColor = getNoteColor(note.note_name, note.position);
                        const textColor = getTextColor(bgColor);
                        
                        return (
                            <li 
                                key={note.note_id}
                                className={`flex items-center px-3 py-2 rounded-md 
                                          transition-all hover:shadow-md ${bgColor} ${textColor}`}
                            >
                                <span className={`w-3 h-3 rounded-full ${textColor === 'text-white' ? 'bg-white' : 'bg-gray-800'} opacity-70 mr-2`}></span>
                                <span className="font-medium">
                                    {note.note_name}
                                </span>
                                <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full 
                                              ${textColor === 'text-white' ? 'bg-white bg-opacity-20' : 'bg-black bg-opacity-10'}`}>
                                    {note.position === 1 ? 'Nota de Salida' : 
                                     note.position === 8 ? 'Nota de Fondo' : 
                                     `Nota de Corazón ${note.position}`}
                                </span>
                            </li>
                        );
                    })}
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