import { addressModel } from "../models/address.model.js";
import { sendMail } from "../services/email.service.js";
import { cartModel } from "../models/cart.model.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { getOrderHtml } from '../utils/order.email.utils.js';
import { orderModel } from "../models/order.model.js";





export async function orderProduct(req, res) {
    try {

        const decoded = req.user;

        const { fullname, phonenumber, street, landmark, city, state, pincode } = req.body;

        let userAddress = await addressModel.findOne({
            userId: decoded.userId,
            fullname,
            phonenumber,
            street,
            landmark,
            city,
            state,
            pincode
        });


        if (!userAddress) {

            userAddress = await addressModel.create({
                userId: decoded.userId,
                fullname,
                phonenumber,
                street,
                landmark,
                city,
                state,
                pincode
            });
        }

        const userCart = await cartModel.findOne({ userId: decoded.userId }).populate('products.productId');

        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Empty cart'
            })
        }

        const customOrderId = `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;


        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 10);


        const newOrder = await orderModel.create({
            userid: decoded.userId,
            products: userCart.products.map(item => ({
                productid: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            })),
            addressid: userAddress._id,

            orderid: customOrderId,
            expecteddelivery: deliveryDate
        });

        const adminHtmlContent = getOrderHtml(
            fullname,
            phonenumber,
            street,
            landmark,
            city,
            state,
            pincode,
            userCart.products,
            customOrderId
        );

        sendMail(process.env.ADMIN_EMAIL, `New order recieved! ID: ${customOrderId}`, 'New order Aleart', adminHtmlContent).catch(async (error) => {
            console.log('Mail sending error', error);

            await orderModel.findByIdAndDelete(newOrder._id);
        });


        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            orderid: customOrderId
        })



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

};

export async function getMyOrders(req, res) {
    try {

        const decoded = req.user;

        const userOrders = await orderModel.find({ userid: decoded.userId })
            .populate({
                path: 'products.productid',
                select: 'name price description image'
            })
            .populate('addressid')
            .sort({ createdAt: -1 });


        if (!userOrders || userOrders.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No orders found for this user',
                orders: []
            });
        }


        return res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            count: userOrders.length,
            orders: userOrders
        });

    } catch (error) {
        console.error("Get orders error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export async function getMyAddress(req, res) {
    try {

        const decoded = req.user;

        const userAddress = await addressModel.find({ userId: decoded.userId });

        if (!userAddress || userAddress.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No addresses saved yet',
                userAddress: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Address found successfully',
            userAddress: [
                userAddress
            ]
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal srever error'
        });
    }
};

export async function deliverOrder(req, res) {
    try {

        const { orderId } = req.body;


        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order id is required'
            });
        }

        const deliveryProduct = await orderModel.findOne({ orderid: orderId });



        if (!deliveryProduct) {
            return res.status(404).json({
                success: false,
                message: 'Order Not Found' 
            });
        }


       
        if (deliveryProduct.isDelivered === true) {
            return res.status(400).json({
                success: false,
                message: 'Order Already delivered' 
            });
        }

        const deliveredProduct = await orderModel.findOneAndUpdate(
            { orderid: orderId },
            { isDelivered: true },
            { returnDocument: 'after' }
        );


        res.status(200).json({
            success: true,
            message: 'Order deliverd successfully'
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
};
