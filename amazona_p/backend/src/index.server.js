import express from 'express'
import env from 'dotenv'
import cors from 'cors'

import mongoose from 'mongoose'

import userRouter from '../routers/userRouter.js'
import ProductRouter from '../routers/productRouter.js'
import OrderRouter from '../routers/orderRouter.js'

env.config();



const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.use('/api/users', userRouter);
app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter)

app.get('/', (req, res) => {
    res.send('server ready')
});






app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
});