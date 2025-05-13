import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Marquee from "react-fast-marquee";
import ProductCard from '../components/ProductCard';
import FragranceNotes from '../components/FragranceNotes';
import { useProducts } from '../context/ProductsContext';
import { URL } from "../config.js";


const DetailProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getProducts, products } = useProducts();

    useEffect(() => {
      getProducts()
    }, [])
    
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
                const response = await axios.get(`${URL}/products/${id}`, {
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
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
            {loading && (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600 dark:text-gray-300">Cargando...</p>
                </div>
            )}
            
            {error && (
                <div className="text-center py-12">
                    <p className="text-lg text-red-500 dark:text-red-400">Error: {error}</p>
                </div>
            )}

            {!loading && !error && product.length > 0 ? (
                product.map((item) => (
                    <div 
                        key={item.id}
                        className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-blue-gray-900 overflow-hidden mb-12"
                    >
                        <div className="md:flex">
                            {/* Columna izquierda - Imagen */}
                            <div className="md:w-1/2 p-6 flex flex-col justify-center items-center ">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="max-h-96 object-contain rounded-lg shadow-md shadow-blue-gray-900 border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105 mb-6"
                                />
                            </div>
                            
                            {/* Columna derecha - Datos */}
                            <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {item.name}
                                </h1>
                                
                                <div className="mt-4">
                                    <p className="text-2xl text-gray-800 dark:text-gray-200">
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
                                                                {/* Integración de FragranceNotes con el id del producto */}
                                <div className="w-full">
                                <FragranceNotes id={item.id} />
                                </div>
                            </div>
                        </div>
                         <div className="w-full py-6 px-20 text-justify font-semibold mb-3 text-gray-800 dark:text-gray-200">
                            <h6 className=" text-xl mb-3">
                                Descripcion
                            </h6>
                            <div className=" text-justify font-semibold ">
                                {item.description}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                !loading && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 dark:text-gray-300">No se encontró el producto</p>
                    </div>
                )
            )}

            {/* Sección de productos relacionados */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">Otros productos que te pueden interesar</h2>
                <Marquee 
                    pauseOnHover={true}
                    speed={50}
                    gradient={false}
                    className="py-4"
                >
                    <div className="flex space-x-20 px-4">
                        {products.filter(p => p.id !== id).map((product) => (
                            <div key={product.id} className="w-72 flex-shrink-0">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default DetailProductPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Swal from "sweetalert2";
// import Marquee from "react-fast-marquee";
// import ProductCard from '../components/ProductCard';
// import FragranceNotes from '../components/FragranceNotes';
// import { useProducts } from '../context/ProductsContext';

// const DetailProductPage = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState([]); 
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { getProducts, products } = useProducts();

//     useEffect(() => {
//       getProducts()
//     }, [])
    
//     const mostrarMediosDePago = () => {
//         Swal.fire({
//             title: 'Medios de Pago',
//             html: `
//                 <div class="text-left">
//                     <p class="font-semibold mb-2">Transferencia bancaria:</p>
//                     <p class="mb-4">Al finalizar la compra te va a llegar un email con los datos bancarios para realizar la transferencia</p>
                    
//                     <p class="font-semibold mb-2">Efectivo:</p>
//                     <p class="mb-4">Podés pagar en efectivo retirando personalmente en nuestros puntos de retiro</p>
                    
//                     <p class="font-semibold mb-2">Acordar:</p>
//                     <p>Acordamos el medio de pago al finalizar la compra.</p>
//                 </div>
//             `,
//             confirmButtonText: 'Entendido',
//             customClass: {
//                 popup: 'rounded-lg',
//                 confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded'
//             }
//         });
//     };

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

//     const formatPrice = (price) => {
//         return typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2);
//     };

//     return (
//         <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
//             {loading && (
//                 <div className="text-center py-12">
//                     <p className="text-lg text-gray-600 dark:text-gray-300">Cargando...</p>
//                 </div>
//             )}
            
//             {error && (
//                 <div className="text-center py-12">
//                     <p className="text-lg text-red-500 dark:text-red-400">Error: {error}</p>
//                 </div>
//             )}

//             {!loading && !error && product.length > 0 ? (
//                 product.map((item) => (
//                     <div 
//                         key={item.id}
//                         className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12"
//                     >
//                         <div className="md:flex">
//                             {/* Columna izquierda - Imagen */}
//                             <div className="md:w-1/2 p-6 flex justify-center items-center ">
//                                 <img 
//                                     src={item.image} 
//                                     alt={item.name}
//                                     className="max-h-96  object-contain rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105"
//                                 />
//                                 <div>
//                                     <FragranceNotes/>
//                                 </div>
//                             </div>
                            
//                             {/* Columna derecha - Datos */}
//                             <div className="md:w-1/2 p-8 flex flex-col justify-center">
//                                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//                                     {item.name}
//                                 </h1>
                                
//                                 <div className="mt-4">
//                                     <p className="text-2xl text-gray-800 dark:text-gray-200">
//                                         <span className="font-semibold">Precio:</span> ${formatPrice(item.price)}
//                                     </p>
//                                 </div>

//                                 <div className="mt-6">
//                                     <button 
//                                         onClick={mostrarMediosDePago}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
//                                     >
//                                         Medios de pago
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 !loading && (
//                     <div className="text-center py-12">
//                         <p className="text-lg text-gray-600 dark:text-gray-300">No se encontró el producto</p>
//                     </div>
//                 )
//             )}

//             {/* Sección de productos relacionados */}
//             <div className="mt-16">
//                 <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">Otros productos que te pueden interesar</h2>
//                 <Marquee 
//                     pauseOnHover={true}
//                     speed={50}
//                     gradient={false}
//                     className="py-4"
//                 >
//                     <div className="flex space-x-20 px-4">
//                         {products.filter(p => p.id !== id).map((product) => (
//                             <div key={product.id} className="w-72 flex-shrink-0">
//                                 <ProductCard product={product} />
//                             </div>
//                         ))}
//                     </div>
//                 </Marquee>
//             </div>
//         </div>
//     );
// };

// export default DetailProductPage;
