import React from 'react'
import CreatePost from './createPost'
import { Cookies } from 'react-cookie';

function Navbar() {
  const cookies = new Cookies();
  
  const user = cookies.get("imgurl");
  return (
    <div className='flex flex-row justify-between '>
      <div></div>
      <div >
      <ul className='flex flex-row gap-3 m-6'>
      <li className='text-2xl font-semibold text-[#AA77FF] p-2'>Home</li>
      <li><CreatePost/></li>
      <div >
      <img src={user} alt="user_pic" className='border-2 rounded-full border-[#AA77FF] w-12' />
      </div>
      </ul>
      </div>
    </div>
  )
}

export default Navbar
