import axios from "axios";
import { useState, useEffect } from 'react';
import { useProducts } from "../context/ProductsContext";

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { deleteProduct } = useProducts();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:4000/api/products`);
            setProducts(res.data);
            setError(null);
        } catch (err) {
            setError("Error al cargar los productos");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await deleteProduct(id);
                getProducts(); // Actualizar la lista después de eliminar
            } catch (err) {
                console.error("Error al eliminar el producto:", err);
            }
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-2">Cargando productos...</p>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No hay productos registrados</p>
                </div>
            ) : (
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
                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{product.name}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{product.description}</td>
                                <td className="py-3 px-4 space-x-2">
                                    {/* <Link 
                                        to={`/products/edit/${product.id}`} 
                                        className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    >
                                        Editar
                                    </Link> */}
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowProducts;

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