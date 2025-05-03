import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

const DetailProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mostrarMediosDePago = () => {
        Swal.fire({
            title: 'Medios de Pago',
            html: `
                <div class="text-left">
                    <p class="font-semibold mb-2">Transferencia bancaria:</p>
                    <p class="mb-4">Al finalizar la compra te va a llegar un email con los datos bancarios para realizar la transferencia</p>
                    
                    <p class="font-semibold mb-2">Efectivo:</p>
                    <p class="mb-4">Podés pagar en efectivo retirando personalmente en nuestros puntos de retiro</p>
                    
                    <p class="font-semibold mb-2">Acordar:</p>
                    <p>Acordamos el medio de pago al finalizar la compra.</p>
                </div>
            `,
            confirmButtonText: 'Entendido',
            customClass: {
                popup: 'rounded-lg',
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded'
            }
        });
    };

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

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2);
    };

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8  dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
            {loading && (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">Cargando...</p>
                </div>
            )}
            
            {error && (
                <div className="text-center py-12">
                    <p className="text-lg text-red-500">Error: {error}</p>
                </div>
            )}

            {!loading && !error && product.length > 0 ? (
                product.map((item) => (
                    <div 
                        key={item.id}
                        className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <div className="md:flex">
                            {/* Columna izquierda - Imagen */}
                            <div className="md:w-1/2 p-6 flex justify-center items-center">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="max-h-96 w-full object-contain"
                                />
                            </div>
                            
                            {/* Columna derecha - Datos */}
                            <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {item.name}
                                </h1>
                                
                                <div className="mt-4">
                                    <p className="text-2xl text-gray-800">
                                        <span className="font-semibold">Precio:</span> ${formatPrice(item.price)}
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <button 
                                        onClick={mostrarMediosDePago}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
                                    >
                                        Medios de pago
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                !loading && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">No se encontró el producto</p>
                    </div>
                )
            )}
        </div>
    );
};

export default DetailProductPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const DetailProductPage = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:4000/api/products/${id}`, {
//                     headers: {
//                         'Cache-Control': 'no-cache, no-store, must-revalidate',
//                         'Pragma': 'no-cache',
//                         'Expires': '0',
//                     },
//                 });

//                 console.log("Datos obtenidos del API:", response.data);

//                 const data = Array.isArray(response.data) ? response.data : [response.data];
//                 setProduct(data);
//             } catch (err) {
//                 console.error("Error al obtener el producto:", err);
//                 setError(err.response?.data?.message || "Error al obtener el producto");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);


//     return (
//         <div className='flex justify-center items-center text-black'>
//             {loading && <p>Cargando...</p>}
//             {error && <p>Error: {error}</p>}
//             {!loading && !error && product.length > 0 ? (
//                 product.map((item) => (
//                     <div key={item.id}>
//                         <img src={item.image} alt='' />
//                         <h1>Nombre: {item.name}</h1>
//                         <p>Precio: {item.price}</p>
//                     </div>
//                 ))
//             ) : (
//                 !loading && <p>No se encontró el producto</p>
//             )}
//         </div>
//     );
// };

// export default DetailProductPage;
