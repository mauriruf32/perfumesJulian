import axios from "axios";
import { URL } from "../config.js";

const instance = axios.create({
    baseURL: URL,
    withCredentials: true
});



export default instance;
// Interceptor para añadir el token a cada solicitud
// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token'); // O sessionStorage si lo usas
        
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
        
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Interceptor para manejar errores 401 (No autorizado)
// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Token inválido o expirado - manejar según tu lógica de autenticación
//             localStorage.removeItem('token');
//             // Redirigir a login o mostrar mensaje
//             window.location.href = '/login'; // Ajusta según tu ruta de login
//         }
//         return Promise.reject(error);
//     }
// );

// export default instance;
// import axios from "axios";
// import { URL } from "../config.js"

// const instance = axios.create({
//     baseURL: URL,
//     withCredentials: true
// })


