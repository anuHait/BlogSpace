import React from 'react'
import desktop from "../assets/desktop.jpg"
import hey from "../assets/hey.jpeg"
import LinesEllipsis from 'react-lines-ellipsis'
function blogBox(props) {
  return (
    <div className='flex flex-col w-[21.6vw] gap-3 ml-3 shadow-xl rounded-lg  p-3 '>
      <div className=''>
      <img src={props.image} alt="blog_img" className='rounded-xl  '/>
      </div>
      <div className='flex flex-col gap-3 p-2'>
      <h2 className='text-md text-blue-500 font-semibold'>{props.cate}</h2>
      <h1 className='text-lg font-bold '>{props.title}</h1>
     <p className=' text-md text-justify leading-0'>
     <LinesEllipsis
     text={props.desc}
     maxLine='3'
     ellipsis='...'
     trimRight
     basedOn='letters'
   /></p>
      </div>
      
    </div>
  )
}

blogBox.defaultProps={
    title:"Hemlooooo afersgeb sdgvrsbh dsgvrsb agvwsrhb zfvfv",
    image:hey,
    desc:"The defaultProps is a React component property that allows you to set default values for the props argument. If the prop property is passed, it will be changed. The defaultProps can be defined as a property on the component class itself, to set the default props for the class.",
    cate:"prop type"
}
export default blogBox
