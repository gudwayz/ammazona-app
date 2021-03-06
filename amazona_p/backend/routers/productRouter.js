import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { data } from '../src/data.js';

const ProductRouter = express.Router();

ProductRouter.get('/', expressAsyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

ProductRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
}));

ProductRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({
            message: "products not found"
        })
    }

}));
export default ProductRouter;