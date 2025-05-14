import axios from "axios";
import { useState, useEffect } from 'react';
import {URL} from "../config.js"

const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${URL}/users`);
            setUsers(res.data);
            setError(null);
        } catch (err) {
            setError("Error al cargar los usuarios");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            try {
                await axios.delete(`${URL}/users/${id}`);
                getUsers(); // Actualizar la lista después de eliminar
            } catch (err) {
                console.error("Error al eliminar el usuario:", err);
                setError("Error al eliminar el usuario");
            }
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-2">Cargando usuarios...</p>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No hay usuarios registrados</p>
                </div>
            ) : (
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Nombre</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Email</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Rol</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{user.name}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.roll || 'N/A'}</td>
                                <td className="py-3 px-4 space-x-2">
                                    {/* <Link 
                                        to={`/edit/${user.id}`} 
                                        className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    >
                                        Editar
                                    </Link> */}
                                    <button 
                                        onClick={() => handleDelete(user.id)}
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

export default ShowUsers;

// import axios from "axios";
// import { useState, useEffect } from 'react';



// const ShowUsers = () => {
//     const [ users, setUser ] = useState([]);

//     useEffect(() =>{
//         getUsers();
//     },[]);

//     const getUsers = async () => {
//         const res = await axios.get(`http://localhost:4000/users`);
//         setUser(res.data)
//     };

//     const deleteUser = async (id) => {
//         axios.delete(`http://localhost:4000/users/${id}`);
//         getUsers();
//     };

//     return (

//     <div className="container">
//         <div className="row">
//             <div className="col">
//                 <table className="table">
//                     <thead className="table-primary"> 
//                         <tr>
//                             <th>Title</th>
//                             <th>Contente</th>
//                             <th>Actions</th>
//                             <th>Title</th>
//                             <th>Contente</th>
//                             <th>Roll</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         { users.map ((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.name}</td>
//                                 {/* <td>{user.lastName}</td>
//                                 <td>{user.phoneNumber}</td> */}
//                                 <td>{user.email}</td>
//                                 {/* <td>{user.password}</td> */}
//                                 {/* <td>{user.roll}</td> */}
//                                 <td>
//                                     {/* <Link to={`/edit/${user.id}`} className="btn btn-info">Editar</Link> */}
//                                     <button onClick={()=>deleteUser(user.id)} className="btn btn-danger">Eliminar</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>

//     );
// };

// export default ShowUsers;