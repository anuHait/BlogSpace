import React from 'react'
import CreatePost from './createPost'
import { Cookies } from 'react-cookie';

function Navbar() {
  const cookies = new Cookies();
  
  const user = cookies.get("imgurl");
  return (
    <div className='flex flex-row justify-between m-6'>
      <div><h1 className='text-4xl font-bold text-[#7a49c9]'>Webimple</h1></div>
      <div >
      <ul className='flex flex-row gap-3 '>
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
