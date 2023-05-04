import React from 'react'
import CreatePost from './createPost'
function navbar() {
  return (
    <div className='flex flex-row justify-between mt-6'>
      <div></div>
      <div >
      <ul className='flex flex-row gap-3'>
      <li className='text-2xl font-semibold text-[#AA77FF] p-2'>Home</li>
      <li className='text-2xl font-semibold text-[#AA77FF] p-2'>About</li>
      <li><CreatePost/></li>
      </ul>
      </div>
    </div>
  )
}

export default navbar
