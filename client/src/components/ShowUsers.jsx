import axios from "axios";
import { useState, useEffect } from 'react';



const ShowUsers = () => {
    const [ users, setUser ] = useState([]);

    useEffect(() =>{
        getUsers();
    },[]);

    const getUsers = async () => {
        const res = await axios.get(`http://localhost:4000/users`);
        setUser(res.data)
    };

    const deleteUser = async (id) => {
        axios.delete(`http://localhost:4000/users/${id}`);
        getUsers();
    };

    return (

    <div className="container">
        <div className="row">
            <div className="col">
                <table className="table">
                    <thead className="table-primary"> 
                        <tr>
                            <th>Title</th>
                            <th>Contente</th>
                            <th>Actions</th>
                            <th>Title</th>
                            <th>Contente</th>
                            <th>Roll</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map ((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                {/* <td>{user.lastName}</td>
                                <td>{user.phoneNumber}</td> */}
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                {/* <td>{user.roll}</td> */}
                                <td>
                                    {/* <Link to={`/edit/${user.id}`} className="btn btn-info">Editar</Link> */}
                                    <button onClick={()=>deleteUser(user.id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    );
};

export default ShowUsers;