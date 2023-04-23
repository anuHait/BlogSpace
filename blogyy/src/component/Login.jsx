import React, { useState } from 'react'
import {auth,provider,} from './creds'
import { useCookies } from 'react-cookie';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import desk from "../assets/person.svg"
function Login() {
  const[token,setToken]=useState("");
  const [cookies, setCookie] = useCookies("");
    const handle=()=>{
      signInWithPopup(auth, provider)
      .then((result) => {
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        //console.log(user.accessToken);
        setToken(user.accessToken);
        //console.log(token);
        setCookie('accessToken',user.accessToken);
      }).catch((error) => {
        console.log(error);
        
      });
    }
  return (
    <div className='flex flex-row gap-28 font-Montserrat items-center justify-center mt-10'>
    <div>
    <img src={desk} alt="Landing_img" className='w-[50vw]'/>
    </div>
    <div className='flex flex-col text-center items-center justify-center gap-3'>
    <h1 className='text-3xl'>Welcome to Webimple</h1>
    <h2 className='text-xl'>Scribble Share Engage</h2>
    <button className='p-2 text-xl bg-purple-600' onClick={handle}>Login with Google</button>

    </div>
    </div>
  )
}

export default Login
