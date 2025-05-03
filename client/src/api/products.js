import axios from "./axios";

// const API = 'http://localhost:4000/api';
// const API = 'https://perfumes-julian.vercel.app/api';

export const getProductsRequest = () => axios.get(`/products`);

export const getProductRequest = (id) => axios.get(`/products/${id}`);

export const getProductByNameRequest = name => axios.get(`/products/?name=${name}`);

export const createProductRequest = product => axios.post(`/products`, product);

export const updateProductRequest = (id, product) => axios.put(`/products/${id}`, product);

export const deleteProductRequest = id => axios.delete(`/products/${id}`);