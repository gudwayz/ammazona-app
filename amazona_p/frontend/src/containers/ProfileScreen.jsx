import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userConstants } from '../actions/Constants';
import { detailsUser, updateUserProfile } from '../actions/User.action';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');

    const userSignin = useSelector(state=>state.userSignin)
    const{userInfo} = userSignin;
    const userDetails = useSelector(state=>state.userDetails)
    const{user, error, loading} = userDetails;
    const userUpdateProfile = useSelector(state=>state.userUpdateProfile);
    const{success:successUpdate, error:errorUpdate, loading:loadingUpdate} = userUpdateProfile;

const dispatch = useDispatch();
    useEffect(()=>{
        if(!user){
            dispatch({type:userConstants.USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email);
          
        }
        
    },[dispatch, userInfo._id, user])

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !== comfirmPassword){
            alert("The password and Re-comfirm password does not match")
        }else{
            dispatch(updateUserProfile({name, userId:user._id, email, password}))
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading?<LoadingBox></LoadingBox>:
                error?<MessageBox>{error}</MessageBox>:
                <>
                {loadingUpdate &&<LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {successUpdate && <MessageBox variant="success">Profile Successfully updated</MessageBox>}
                <div>
                    <label htmlFor="name">UserName</label>
                    <input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter username" type="text"/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter email" type="text"/>
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter password" type="password"/>
                </div>

                <div>
                    <label htmlFor="cpassword"> Comfirm Password</label>
                    <input id="cpassword" value={comfirmPassword} onChange={(e)=>setComfirmPassword(e.target.value)}  placeholder="Re-comfirm password" type="password"/>
                </div>

                <div>
                    <label/>
                    <button type="submit" className="primary">Update</button>
                </div>
                
                </>}
            </form>
        </div>
    )
}

export default ProfileScreen
