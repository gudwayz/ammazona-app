import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../models/UserModel.js';
import { data } from '../src/data.js';
import { auth, generateToken } from '../util.js';


const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    //await User.remove({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser })

}));

userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)

            });
            return;
        }
    }
    res.status(401).send({ message: "invalid email or password" })
}));


userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const { email, name, isAdmin } = req.body;
    const password = bcrypt.hashSync(req.body.password, 8);
    const user = new User({ email, name, password, isAdmin });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: user.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    })

}));

userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user)
    } else {
        res.status(404).send({ message: "user does not exist" })
    }
}));

userRouter.put('/profile', auth, expressAsyncHandler(async(req, res) => {
    const user = await UserfindById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),


        })
    }

}))

export default userRouter;