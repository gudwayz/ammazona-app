import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signin } from '../actions/User.action';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SigninScreen = (props) => {
    
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? (props.location.search.split('=')[1]) : '/';
    
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(signin(email,password))
        userInfo ? props.history.push(`/`): props.history.push(`/signin`);
    }

     useEffect(()=>{
       if(userInfo){
            props.history.push(redirect)
       }
      },[userInfo, props.history, redirect])
    
    
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                 <div>
                    <h1>Sign IN</h1>
                 </div>
                 {loading && <LoadingBox></LoadingBox>}
                 {error && <MessageBox variant="danger">{error}</MessageBox>}
                 <div>
                    <label htmlFor="email">Email Address:</label>
                        <input type="email" 
                        id="email" 
                        placeholder="enter your email"
                         required 
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                        <input type="password" 
                        id="password" 
                        placeholder="enter password"
                         required 
                     value={password}
                         onChange={(e)=>setPassword(e.target.value)}></input>
                </div>

                <div>
                    <label/>
                        <button type="submit" className="primary">SignIn</button>
                </div>

                <div>
                    <label/>
                    <div>
                        New Customer?{' '}
                        <Link to={`/register?redirect=${redirect}`}>Create your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen
