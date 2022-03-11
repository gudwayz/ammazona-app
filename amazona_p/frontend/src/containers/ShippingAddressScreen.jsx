import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/Cart.actions';
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddressScreen = (props) => {
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    if(!userInfo){
        props.history.push('/signin')
    };

    const cart = useSelector(state=>state.cart)
    const {shippingAddress}= cart;

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [phoneNo, setPhoneNo] = useState(shippingAddress.phoneNo);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState(shippingAddress.country);
    

const dispatch = useDispatch();
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, phoneNo, postalcode, city,country}));
        props.history.push('/payment')
    }

  
    return (
        <div>
            <CheckoutSteps steps1 steps2></CheckoutSteps>
            <form className="form" onSubmit={onSubmitHandler}>
                <div>Shipping Address</div>
                <div>
                    <label htmlFor="fullname">FullName</label>
                    <input type="text" value={fullName} id="fullname" onChange={e=>setFullName(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input type="number" value={phoneNo} id="phoneNo" onChange={e=>setPhoneNo(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" value={address} id="address" onChange={e=>setAddress(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" value={city} id="city" onChange={e=>setCity(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="postalcode">PostalCode</label>
                    <input type="number" value={postalcode} id="postalcode" onChange={e=>setPostalcode(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" value={country} id="country" onChange={e=>setCountry(e.target.value)} required/>
                </div>

<div><button type="submit" className="primary">Continue</button></div>
            </form>
        </div>
    )
}

export default ShippingAddressScreen
