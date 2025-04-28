import axios from "axios";
import { useState, useEffect } from 'react';
import { useProducts } from "../context/ProductsContext";


const ShowProducts = ({ product }) => {
    const [ products, setProduct] = useState([]);
    const { deleteProduct } = useProducts();

    useEffect(() =>{
        getProducts();
    },[]);

    const getProducts = async () => {
        const res = await axios.get(`http://localhost:4000/api/products`);
        setProduct(res.data)
    };

    // const deleteProduct = async (id) => {
    //     axios.delete(`http://localhost:4000/api/products/${id}`);
    //     getProducts();
    // };

    return (

    <div className="show-prod">
        <div className="row">
            <div className="col">
                <table className="table">
                    <thead className="table-primary"> 
                        <tr>
                            <th>Title</th>
                            <th>Contente</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map ((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>
                                    {/* <Link to={`/products/edit/${product.id}`} className="btn btn-info">Editar</Link> */}
                                    <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))};
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    );
};

export default ShowProducts;