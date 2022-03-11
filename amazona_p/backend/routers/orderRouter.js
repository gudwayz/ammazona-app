import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import { auth } from '../util.js'
const OrderRouter = express.Router();


OrderRouter.post('/', auth, expressAsyncHandler(async(req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({
            message: 'cart is empty'
        })
    } else {
        const { orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            itemPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id
        })

        const createdOrder = await order.save();
        res.status(201).send({
            message: "new order created",
            order: createdOrder
        })
    }
}));

OrderRouter.get('/:id', auth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: "Order not found" });
    }
}))

OrderRouter.put('/:id/pay', auth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.paidAt = Date.now();
        order.isPaid = true;
    }
    const updatedOrder = order.save();
    if (updatedOrder) {
        res.send({
            message: "order Paid",
            order: updatedOrder
        })
    } else {
        res.status(401).send({
            message: "order does not exist"
        })
    }

}))
export default OrderRouter;