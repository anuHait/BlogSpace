import React from 'react'
import desktop from "../assets/desktop.jpg"
//import Truncate from 'react-truncate';
import LinesEllipsis from 'react-lines-ellipsis'
function blogBox(props) {
  return (
    <div className='flex flex-col w-[22.2vw] gap-4 ml-3 border-3 border-gray-600'>
      <img src={props.image} alt="blog_img" className='rounded-xl'/>
      <h2 className='text-md text-blue-500 '>{props.cate}</h2>
      <h1 className='text-2xl font-semibold '>{props.title}</h1>
     <p className=' text-lg'>
     <LinesEllipsis
     text={props.desc}
     maxLine='3'
     ellipsis='...'
     trimRight
     basedOn='letters'
   /></p>
    </div>
  )
}

blogBox.defaultProps={
    title:"Hemlooooo afersgeb sdgvrsbh dsgvrsb agvwsrhb zfvfv",
    image:desktop,
    desc:"The defaultProps is a React component property that allows you to set default values for the props argument. If the prop property is passed, it will be changed. The defaultProps can be defined as a property on the component class itself, to set the default props for the class.",
    cate:"prop type"
}
export default blogBox
