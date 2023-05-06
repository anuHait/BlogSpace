import React, { useState } from 'react'
import {auth,provider,} from './creds'
import { useCookies } from 'react-cookie';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import desk from "../assets/person.svg"
import { useNavigate } from "react-router";
import axios from "axios"

function Login() {
  const navigate = useNavigate();
  const[token,setToken]=useState("");
  const [cookies, setCookie] = useCookies("");
 
  var userInfo={}
  var uid=0;
    const handle=async()=>{
    
     await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
         userInfo= {
          email: result.user.email,
          name: result.user.displayName, 
        };
        console.log(user);
        setToken(user.accessToken);
        setCookie('accessToken',user.accessToken);
        console.log(userInfo);
      }).catch((error) => {
        console.log(error);
      });
     }
     const handleSubmit=async()=>{
      await handle();
      
      await axios.post('http://localhost:4000/register', userInfo)
      .then(response => {
        console.log(response);
        console.log("User created");
        navigate("/posts");
      })
      .catch(error => {
        console.error(error);
        console.log("user already created");
        navigate("/posts");

      });
      //console.log("HEmlo");
     }
  return (
    <div className='flex flex-row gap-28 font-Montserrat items-center justify-center mt-10'>
    <div>
    <img src={desk} alt="Landing_img" className='w-[50vw]'/>
    </div>
    <div className='flex flex-col text-center items-center justify-center gap-3'>
    <h1 className='text-3xl'>Welcome to Webimple</h1>
    <h2 className='text-xl'>Scribble Share Engage</h2>
    <button className='p-2 text-xl bg-purple-600' onClick={handleSubmit}>Login with Google</button>

    </div>
    </div>
  )
  }

export default Login
