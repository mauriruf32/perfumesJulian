import { createContext, useContext, useEffect, useState } from "react";
import {
    registerRequest, 
    loginRequest, 
    verifyTokenRequest, 
    getUserProfileRequest,
    updateUserProfileRequest,
} from "../api/auth";

import Cookies  from "js-cookie";

export const AuthContext = createContext();

// Creamos una funcion para el uso del contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    
    return context;
};

export const AuthProvider = ({children}) => {
// Creamos el estado que se guardara en el context 
    const [user, setUser] = useState(null);
// Creamos el estado del user autenticado
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
// Creamos el estado para el manejo de errores
    const [ errors, serErrors ] = useState([]);

    const [ loading, setLoading ] = useState(true);

// Creamos la funcion de registo
    const signUp = async (user) => {
      try {
        const res = await registerRequest(user);
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
        setUser(res.data);
    } catch (error) {
        console.log(error.response)
        serErrors(error.response.data)  
    }
};

// Creamos funcion para login

const signIn = async (user) => {
    try {
        const res = await loginRequest(user);
        console.log(res);
        setIsAuthenticated(true);
        setUser(res.data);
    } catch (error) {
        if (Array.isArray(error.response.data)) {
            return serErrors(error.response.data);
        }
        serErrors([error.response.data.message]);
    }
};


const getUserProfile = async () => {
    try {
        const res = await getUserProfileRequest();
        return res.data;
    } catch (error) {
        console.error(error);
    }
    
};

const updateUserProfile = async (id, user) => {
    try {
       await updateUserProfileRequest(id, user);
    } catch (error) {
       console.log(error);
    }
};

const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
};

//Creamos funcion para eliminar mensajes de error

useEffect(() => {
    if (errors.length > 0) {
        const timer = setTimeout(() => {
            serErrors([]);
        }, 5000)
        return () => clearTimeout(timer);
    }
}, [errors]);

useEffect(() => {
    async function checkLogIn () {
    const cookies = Cookies.get();

    if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
        }

        try {
            const res = await verifyTokenRequest(cookies.token);
            console.log(res);
            if (!res.data) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
                 
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
      
    }
    checkLogIn();
}, []);

// Retornamos funcion/es y usuario para utilizarlos en otros componentes
    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
            getUserProfile,
            updateUserProfile,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

