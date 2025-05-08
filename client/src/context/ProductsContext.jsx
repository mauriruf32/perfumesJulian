import { createContext, useContext, useState } from "react";
import axios from "axios";
import { getProductWithNotesRequest, createNoteRequest, getNotesRequest, assignNoteToProductRequest } from "../api/fragrance_notes";
import { 
    getProductRequest, 
    getProductsRequest, 
    deleteProductRequest, 
    getProductByNameRequest, 
    updateProductRequest,
    createProductRequest,
} from "../api/products";

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider")
    }

    return context;
}

export function ProductProvider({ children }) {
    const [ products, setProducts ] = useState([]);

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        }
       
    }

    const getProductById = async (id) => {
        try {
            const res = await getProductRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
       
    }

    const createProduct = async (product) => {
        const res = await createProductRequest(product);
        console.log(res);
    }

    const deleteProduct = async (id) => {
        try {
        const res = await deleteProductRequest(id);
        if (res.status === 204) setProducts(products.filter(product => product.id != id));
            
        } catch (error) {
        console.log(error);
            
        }
    }

    const getProductByName = async (name) => {
        const res = await getProductByNameRequest(name); 
        if (res.status = 200) setProducts(products.filter(product => product.name.toLowerCase().includes(name.toLowerCase())));
    };

    const updateProduct = async (id, product) => {
         try {
            await updateProductRequest(id, product);
         } catch (error) {
            console.log(error);
         }
    }
 
    const getProductWithNotes = async (id) => {
        try {
            const res = await getProductWithNotesRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
       
    }

    const createNote = async (note) => {
        const res = await createNoteRequest(note);
        console.log(res);
    }

    const getNotes = async () => {
        try {
            const res = await getNotesRequest();
            return res.data;
        } catch (error) {
            console.error(error);
        }
       
    }

    //  const assignNoteToProduct = async (productId, noteId, position) => {
    //     try {
    //         const res = await axios.post(`/notes/product-notes`, {
    //             product_id: productId,
    //             note_id: noteId,
    //             position
    //         });
    //         return res.data;
    //     } catch (error) {
    //         console.error("Error en assignNoteToProduct:", error);
    //         throw error; // Opcional: re-lanzar el error para manejo externo
    //     }
    // };
    const assignNoteToProduct = async (productId, noteId, position) => {
        try {
            const res = await assignNoteToProductRequest(productId, noteId, position);
            return res.data;
        } catch (error) {
            console.error("Error en assignNoteToProduct:", error);
            throw error;
        }
    };

    return (
        <ProductContext.Provider 
        value={{
            products,
            createProduct,
            getProducts,
            deleteProduct,
            getProductByName,
            getProductById,
            updateProduct,
            getProductWithNotes,
            createNote,
            getNotes,
            assignNoteToProduct,
        }}
        >
            {children}
        </ProductContext.Provider>
    );
}