import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../actions/User.action';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Register = (props) => {
    
    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const redirect = props.location.search ? (props.location.search.split('=')[1]) : '/';
    
    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
if(password !== cpassword){
    alert("please the two password does not  match");
}else{

        dispatch(register(email,name,password))
    }

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
                    <h1>Create Account</h1>
                 </div>
                 {loading && <LoadingBox></LoadingBox>}
                 {error && <MessageBox variant="danger">{error}</MessageBox>}
                 <div>
                    <label htmlFor="name">Name:</label>
                        <input type="text" 
                        id="name" 
                        placeholder="enter your Name"
                         required 
                         value={name}
                         onChange={(e)=>setName(e.target.value)}></input>
                </div>

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

                <div>
                    <label htmlFor="cpassword">Password:</label>
                        <input type="password" 
                        id="cpassword" 
                        placeholder="Re-comfirm password"
                         required 
                     value={cpassword}
                         onChange={(e)=>setCPassword(e.target.value)}></input>
                </div>
    
                    <label/>
                        <button type="submit" className="primary">register</button>
                </div>

                <div>
                    <label/>
                    <div>
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Create your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;
