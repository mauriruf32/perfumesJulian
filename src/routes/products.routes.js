import { Router } from "express";
import { updateProduct, deleteProduct, getProduct, getProducts, createProduct } from "../controllers/products.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.post('/products', authRequired, createProduct);

router.delete('/products/:id', authRequired, deleteProduct);

router.put('/products/:id', authRequired, updateProduct);

export default router;