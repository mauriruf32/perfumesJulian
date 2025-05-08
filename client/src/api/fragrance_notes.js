import axios from './axios';

export const createNoteRequest = note => axios.post(`/notes`, note);

export const getNotesRequest = () => axios.get(`/notes`);
// export const loginRequest = user => axios.post(`/login`, user);

// export const verifyTokenRequest = () => axios.get(`/verify`);

// export const assignNoteToProductRequest = () => axios.post(`/notes/product-notes`);
export const assignNoteToProductRequest = (product_id, note_id, position) => 
    axios.post(
        `/notes/product-notes`,
         product_id, note_id, position 
    );

export const getProductWithNotesRequest = (id) => axios.get(`/notes/product-notes/${id}`);

export const updateUserProfileRequest = (id) => axios.put(`/notes/product-notes/${id}`);
