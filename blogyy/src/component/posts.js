import React from 'react'
import Navbar from './navbar'
import BlogBox from './blogBox'
function Posts() {
  return (
    <div>
    <Navbar/>
    <div className='flex flex-row gap-3'>
    <BlogBox/>
    <BlogBox/>
    </div>
    </div>
  )
}

export default Posts
