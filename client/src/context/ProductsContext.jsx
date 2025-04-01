import { createContext, useContext, useState } from "react";
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
        if (res.status = 204) setProducts(products.filter(product => product.id != id));
            
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
        }}
        >
            {children}
        </ProductContext.Provider>
    );
}