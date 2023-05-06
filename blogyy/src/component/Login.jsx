import React, { useState } from 'react'
import {auth,provider,} from './creds'
import { useCookies } from 'react-cookie';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import cover from "../assets/cover.png"
import { useNavigate } from "react-router";
import axios from "axios"
import Typewriter from 'typewriter-effect';
import google from "../assets/google.png"
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
    <img src={cover} alt="Landing_img" className='w-[50vw] m-4'/>
    </div>
    <div className='flex flex-col text-center items-center justify-center gap-3 w-[45vw] m-5'>
    <h1 className='text-4xl font-bold text-[#7a49c9]'>Welcome to Webimple</h1>
    <div className="text-2xl font-semibold text-blue-500">
    <Typewriter 
  options={{
    strings: ['Scribble Share Engage ...'],
    autoStart: true,
    loop: true,
  }}
/></div>
    <p className='text-lg font-semibold'>We aim to provide informative and engaging content on a wide range of topics. Whether you're looking for expert advice on a specific subject, or simply seeking inspiration and entertainment, our team of knowledgeable writers has got you covered.
    From technology and science to lifestyle and culture, we delve into the latest trends, news, and opinions to bring you a fresh perspective on the world around us.</p>
    <div className=' rounded-3xl bg-gradient-to-r from-blue-500 to-[#AA77FF] text-white text-xl p-2 font-semibold flex flex-row gap-2' onClick={handleSubmit}
    >
    <img src={google} alt="google_img" className='w-[1.8vw]'/>
    Login with Google</div>

    </div>
    </div>
  )
  }

export default Login
