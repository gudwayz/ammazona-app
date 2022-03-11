import React, {useEffect} from 'react'
import {useDispatch, useSelector} from'react-redux'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import Product from '../components/Product'
import {listProducts} from '../actions'


const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state=>state.productList)

    const{loading, error,products}= productList;
    useEffect(()=>{
       
    dispatch(listProducts());
   
    },[dispatch]);
    return (
        <div>{
            loading?<LoadingBox></LoadingBox>
        :error?<MessageBox variant = "danger"></MessageBox>
    :
    <div className="row center">
    {
        products.map(product => (
            <Product key={product._id} product={product} />
        ))
    }
</div>}
            
        </div>
    )
}

export default HomeScreen
