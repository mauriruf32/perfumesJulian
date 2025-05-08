import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useState, useEffect } from "react";

function FragranceNoteForm() {
  const { register, handleSubmit, reset } = useForm();
  const { createNote, getNotes } = useProducts();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  console.log(notes)

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

  const renderNotes = () => {
    if (!notes || notes.length === 0) {
      return <p className="text-gray-500">No hay notas registradas</p>;
    }

    const noteItems = [];
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      noteItems.push(
        <li key={note.note_id || note.id} className="flex items-center border-b border-gray-100 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
          <span className="text-gray-700">{note.note_name || note.name}</span>
        </li>
      );
    }
    return <ul className="space-y-2">{noteItems}</ul>;
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <div className="w-full md:w-1/2">
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Crear Nueva Nota</h2>
          
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
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2">
        <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Notas Existentes</h2>
          
          {notesLoading ? (
            <p className="text-gray-500">Cargando notas...</p>
          ) : (
            renderNotes()
          )}
        </div>
      </div>
    </div>
  );
}

export default FragranceNoteForm; 