import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/Cart.actions';
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentMethodsScreen = (props) => {
    const cart = useSelector(state=>state.cart)
    const{shippingAddress} = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const submitHandler=(e)=>{
            e.preventDefault();
            dispatch(savePaymentMethod(paymentMethod));
            props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps steps1 steps2 steps3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>Payment Method</h1></div>
                <div>
                    <input 
                    type="radio" 
                    value="Paypal" 
                    id="paypal"
                    required 
                    name="paymentMethod" 
                    onChange={e=>setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="paypal">Paypal</label>
                </div>

                <div>
                    <input 
                    type="radio" 
                    value="Stripe" 
                    id="stripe"
                    required  
                    name="paymentMethod" 
                    onChange={e=>setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                    <button type="submit" className="primary">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodsScreen
