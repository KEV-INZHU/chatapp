import React from 'react';
import './Login.css';
import {Button} from '@material-ui/core';
import 'firebase/compat/auth';
import {auth, provider} from "../firebase";
import { actionTypes } from '../Reducer';
import {useStateValue} from "../StateProvider";

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type:actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error)=>alert(error.message));
    };
  return (
    <div className = "Login">
        <div className = "LoginContainer">
            <img src = 'https://cdn-icons-png.flaticon.com/512/134/134914.png'
            alt = ''/>
            <div className='LoginText'>
                <h1>Sign in to ChatApp</h1>
            </div>

            <Button type = "submit" onClick = {signIn}>
                Sign In With Google
            </Button>
        </div>
    </div>
  )
}

export default Login