import axios from './axios';

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

export const getUserProfileRequest = () => axios.get(`/profile`);

export const updateUserProfileRequest = (id, user) => axios.put(`/profile/${id}`, user);
