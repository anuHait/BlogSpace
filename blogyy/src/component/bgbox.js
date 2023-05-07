import React from 'react'
 import blogbg from '../assets/blogbg.png'
import blogbg1 from '../assets/blogbg1.png'
import Typewriter from 'typewriter-effect';

function Bgbox() {
  return (
    <div className='flex justify-center items-center mb-20'>
      <div className={`rounded-2xl w-[85vw] h-[35vh] flex justify-center items-center`} style={{ backgroundImage: `url(${blogbg})` }}>
      <h1 className='text-center font-bold text-5xl text-white'>
      <Typewriter 
      options={{
        strings: ['Scribble Share Engage ...'],
        autoStart: true,
        loop: true,
      }}
    /></h1>
      </div>
    </div>
  )
}

export default Bgbox
