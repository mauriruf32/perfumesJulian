import { Router } from "express";
import { updateOrder, getOrder, createOrder, deleteOrder, getOrders } from "../controllers/orders.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get('/orders', getOrders);

router.get('/orders/:id', getOrder);

router.post('/orders', authRequired, createOrder);

router.delete('/orders/:id', authRequired, deleteOrder);

router.put('/orders/:id', authRequired, updateOrder);

export default router;