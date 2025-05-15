import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useState, useEffect } from "react";

function FragranceNoteForm() {
  const { register, handleSubmit, reset } = useForm();
  const { createNote, getNotes, deleteNote } = useProducts();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setNotesLoading(true);
        const notesData = await getNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setNotesLoading(false);
      }
    };
    
    fetchNotes();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await createNote(data);
      reset();
      const updatedNotes = await getNotes();
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  });

  const handleDeleteNote = async (noteId) => {
    try {
      setDeletingId(noteId);
      await deleteNote(noteId);
      // Actualizar la lista de notas después de eliminar
      const updatedNotes = await getNotes();
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const renderNotes = () => {
    if (!notes || notes.length === 0) {
      return <p className="text-gray-500">No hay notas registradas</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {notes.map((note) => (
          <div 
            key={note.note_id || note.id} 
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                <span className="text-gray-700 font-medium">{note.note_name || note.name}</span>
              </div>
              <button
                onClick={() => handleDeleteNote(note.note_id || note.id)}
                disabled={deletingId === (note.note_id || note.id)}
                className="text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                title="Eliminar nota"
              >
                {deletingId === (note.note_id || note.id) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Formulario en la parte superior */}
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Crear Nueva Nota</h2>
        
        <form onSubmit={onSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de la Nota
            </label>
            <input 
              type="text"
              placeholder="Nombre"
              {...register("name", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : 'Guardar'}
            </button>
          </div>
        </form>

        {/* Sección de notas existentes debajo del formulario */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Notas Existentes</h2>
          
          {notesLoading ? (
            <div className="flex justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            renderNotes()
          )}
        </div>
      </div>
    </div>
  );
}

export default FragranceNoteForm;

// import { useForm } from "react-hook-form";
// import { useProducts } from "../context/ProductsContext";
// import { useState, useEffect } from "react";

// function FragranceNoteForm() {
//   const { register, handleSubmit, reset } = useForm();
//   const { createNote, getNotes, deleteNote } = useProducts();
//   const [loading, setLoading] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [notesLoading, setNotesLoading] = useState(true);
//   console.log(notes)

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         setNotesLoading(true);
//         const notesData = await getNotes();
//         setNotes(notesData);
//       } catch (error) {
//         console.error("Error fetching notes:", error);
//       } finally {
//         setNotesLoading(false);
//       }
//     };
    
//     fetchNotes();
//   }, []);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setLoading(true);
//       await createNote(data);
//       reset();
//       const updatedNotes = await getNotes();
//       setNotes(updatedNotes);
//     } catch (error) {
//       console.error("Error creating note:", error);
//     } finally {
//       setLoading(false);
//     }
//   });

//   const renderNotes = () => {
//     if (!notes || notes.length === 0) {
//       return <p className="text-gray-500">No hay notas registradas</p>;
//     }

//     const noteItems = [];
//     for (let i = 0; i < notes.length; i++) {
//       const note = notes[i];
//       noteItems.push(
//         <li key={note.note_id || note.id} className="flex items-center border-b border-gray-100 py-2">
//           <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
//           <span className="text-gray-700">{note.note_name || note.name}</span>
//         </li>
//       );
//     }
//     return <ul className="space-y-2">{noteItems}</ul>;
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-8 p-6">
//       <div className="w-full md:w-1/2">
//         <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
//           <h2 className="text-xl font-bold mb-4 text-gray-800">Crear Nueva Nota</h2>
          
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
//               Nombre de la Nota
//             </label>
//             <input 
//               type="text"
//               placeholder="Nombre"
//               {...register("name", { required: true })}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
//               disabled={loading}
//             >
//               {loading ? 'Guardando...' : 'Guardar'}
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="w-full md:w-1/2">
//         <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8">
//           <h2 className="text-xl font-bold mb-4 text-gray-800">Notas Existentes</h2>
          
//           {notesLoading ? (
//             <p className="text-gray-500">Cargando notas...</p>
//           ) : (
//             renderNotes()
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FragranceNoteForm; 