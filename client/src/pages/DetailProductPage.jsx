import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/${id}`, {
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    },
                });

                console.log("Datos obtenidos del API:", response.data);

                const data = Array.isArray(response.data) ? response.data : [response.data];
                setProduct(data);
            } catch (err) {
                console.error("Error al obtener el producto:", err);
                setError(err.response?.data?.message || "Error al obtener el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    return (
        <div className='flex justify-center items-center '>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && product.length > 0 ? (
                product.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt='' />
                        <h1>Nombre: {item.name}</h1>
                        <p>Precio: {item.price}</p>
                        <p>Descripción: {item.description}</p>
                    </div>
                ))
            ) : (
                !loading && <p>No se encontró el producto</p>
            )}
        </div>
    );
};

export default DetailProductPage;
