import express from 'express';
import { deliverOrder, getMyAddress, getMyOrders, orderProduct } from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';



export const orderRouter = express.Router();


orderRouter.post('/order-product', verifyToken, orderProduct);

orderRouter.get('/get-my-orders', verifyToken, getMyOrders);

orderRouter.get('/get-my-address', verifyToken, getMyAddress);

orderRouter.post('/deliver-order', verifyToken, deliverOrder);
