import axios from "axios";
import { URL } from "../config.js";

const instance = axios.create({
    baseURL: URL,
    withCredentials: true
});


export default instance;