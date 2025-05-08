import { useState, useEffect } from 'react';
import { useProducts } from "../context/ProductsContext";
import axios from '../api/axios'; // Importamos la instancia configurada de axios

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedProductId, setExpandedProductId] = useState(null);
    const [notes, setNotes] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState({});
    const { deleteProduct, getNotes } = useProducts();

    // Función para asignar notas a productos
    const assignNoteToProduct = async (productId, noteId, position) => {
        try {
            const res = await axios.post('/notes/product-notes', {
                product_id: productId,
                note_id: noteId,
                position: position + 1 // Ajustamos a 1-8 como espera el backend
            });
            return res.data;
        } catch (error) {
            console.error("Detalles del error:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([getProducts(), fetchAllNotes()]);
            } catch (err) {
                setError("Error al cargar datos iniciales");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get('/products');
            setProducts(res.data);
            setError(null);
        } catch (err) {
            setError("Error al cargar los productos");
            throw err;
        }
    };

    const fetchAllNotes = async () => {
        try {
            const notesData = await getNotes();
            setNotes(notesData);
        } catch (err) {
            console.error("Error al cargar las notas:", err);
            throw err;
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await deleteProduct(id);
                await getProducts();
            } catch (err) {
                console.error("Error al eliminar el producto:", err);
                alert("Error al eliminar el producto");
            }
        }
    };

    const toggleAssignNotes = (productId) => {
        setExpandedProductId(expandedProductId === productId ? null : productId);
        if (expandedProductId !== productId) {
            setSelectedNotes({});
        }
    };

    const handleNoteSelection = (position, noteId) => {
        setSelectedNotes(prev => ({
            ...prev,
            [position]: noteId
        }));
    };

    const handleAssignNotes = async (productId) => {
        try {
            const assignments = Object.entries(selectedNotes)
                .filter(([_, noteId]) => noteId)
                .map(([position, noteId]) => (
                    assignNoteToProduct(productId, noteId, parseInt(position))));

            await Promise.all(assignments);
            
            alert("Notas asignadas correctamente");
            setExpandedProductId(null);
            setSelectedNotes({});
            await fetchAllNotes(); // Actualizar las notas si es necesario
        } catch (err) {
            let errorMessage = "Error al asignar notas";
            
            if (err.response) {
                if (err.response.status === 401) {
                    errorMessage = "Sesión expirada. Por favor inicie sesión nuevamente.";
                } else if (err.response.data?.error) {
                    errorMessage = err.response.data.error;
                }
            }
            
            alert(errorMessage);
            console.error("Error completo:", err);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
                <button onClick={() => window.location.reload()} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Reintentar</title>
                        <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"/>
                    </svg>
                </button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No hay productos registrados</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Recargar
                </button>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Nombre</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Descripción</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map((product) => (
                        <>
                            <tr key={`product-${product.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{product.name}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{product.description}</td>
                                <td className="py-3 px-4 space-x-2">
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Eliminar
                                    </button>
                                    <button 
                                        onClick={() => toggleAssignNotes(product.id)}
                                        className="inline-block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                    >
                                        {expandedProductId === product.id ? 'Ocultar' : 'Asignar Notas'}
                                    </button>
                                </td>
                            </tr>
                            
                            {expandedProductId === product.id && (
                                <tr key={`notes-${product.id}`}>
                                    <td colSpan="3" className="px-4 py-3 bg-gray-50 dark:bg-gray-700">
                                        <div className="space-y-4">
                                            <h3 className="font-medium text-gray-800 dark:text-gray-200">
                                                Asignar notas de fragancia a {product.name}
                                            </h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[...Array(8)].map((_, position) => (
                                                    <div key={position} className="space-y-1">
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Posición {position + 1}
                                                        </label>
                                                        <select
                                                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                                                            value={selectedNotes[position] || ''}
                                                            onChange={(e) => handleNoteSelection(position, e.target.value)}
                                                        >
                                                            <option value="">Seleccionar nota</option>
                                                            {notes.map((note) => (
                                                                <option key={note.id} value={note.id}>
                                                                    {note.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => setExpandedProductId(null)}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={() => handleAssignNotes(product.id)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                                    disabled={Object.keys(selectedNotes).length === 0}
                                                >
                                                    Guardar Asignaciones
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowProducts;
// import axios from "axios";
// import { useState, useEffect } from 'react';
// import { useProducts } from "../context/ProductsContext";

// const ShowProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { deleteProduct, getNotes, assassignNoteToProduct } = useProducts();

//     useEffect(() => {
//         getProducts();
//     }, []);

//     const getProducts = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get(`http://localhost:4000/api/products`);
//             setProducts(res.data);
//             setError(null);
//         } catch (err) {
//             setError("Error al cargar los productos");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("¿Estás seguro de eliminar este producto?")) {
//             try {
//                 await deleteProduct(id);
//                 getProducts(); // Actualizar la lista después de eliminar
//             } catch (err) {
//                 console.error("Error al eliminar el producto:", err);
//             }
//         }
//     };

//     return (
//         <div className="w-full overflow-x-auto">
//             {loading ? (
//                 <div className="text-center py-8">
//                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                     <p className="mt-2">Cargando productos...</p>
//                 </div>
//             ) : error ? (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                     <strong className="font-bold">Error: </strong>
//                     <span className="block sm:inline">{error}</span>
//                 </div>
//             ) : products.length === 0 ? (
//                 <div className="text-center py-8">
//                     <p className="text-gray-500">No hay productos registrados</p>
//                 </div>
//             ) : (
//                 <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
//                     <thead className="bg-gray-100 dark:bg-gray-700">
//                         <tr>
//                             <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Nombre</th>
//                             <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Descripción</th>
//                             <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                         {products.map((product) => (
//                             <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                                 <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{product.name}</td>
//                                 <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{product.description}</td>
//                                 <td className="py-3 px-4 space-x-2">
//                                     {/* <Link 
//                                         to={`/products/edit/${product.id}`} 
//                                         className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                                     >
//                                         Editar
//                                     </Link> */}
//                                     <button 
//                                         onClick={() => handleDelete(product.id)}
//                                         className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                                     >
//                                         Eliminar
//                                     </button>
//                                     <button 
//                                         className="inline-block px-3 py-1 bg-blue text-white rounded hover:bg-red-600 transition"
//                                     >
//                                         Asignar Notes
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default ShowProducts;

// import axios from "axios";
// import { useState, useEffect } from 'react';
// import { useProducts } from "../context/ProductsContext";


// const ShowProducts = ({ product }) => {
//     const [ products, setProduct] = useState([]);
//     const { deleteProduct } = useProducts();

//     useEffect(() =>{
//         getProducts();
//     },[]);

//     const getProducts = async () => {
//         const res = await axios.get(`http://localhost:4000/api/products`);
//         setProduct(res.data)
//     };

//     // const deleteProduct = async (id) => {
//     //     axios.delete(`http://localhost:4000/api/products/${id}`);
//     //     getProducts();
//     // };

//     return (

//     <div className="show-prod">
//         <div className="row">
//             <div className="col">
//                 <table className="table">
//                     <thead className="table-primary"> 
//                         <tr>
//                             <th>Title</th>
//                             <th>Contente</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         { products.map ((product) => (
//                             <tr key={product.id}>
//                                 <td>{product.name}</td>
//                                 <td>{product.description}</td>
//                                 <td>
//                                     {/* <Link to={`/products/edit/${product.id}`} className="btn btn-info">Editar</Link> */}
//                                     <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Eliminar</button>
//                                 </td>
//                             </tr>
//                         ))};
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>

//     );
// };

// export default ShowProducts;