import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
//import { useCookies } from 'react-cookie';
import TextareaAutosize from '@mui/base/TextareaAutosize';
function CreatePost() {
  const preset_key="gbg5x2iv";
  const cloudname="dcugof3zo";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[img,setImg]=useState("");
  const[url,setUrl]=useState("");
  const uploadImg=(image)=>{
    console.log("Upload fnc");
    console.log(img);
    const formData=new FormData();
    formData.append("file",img);    
    formData.append("upload_preset",preset_key);
   const secure_url= axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
    formData).then(
      (response)=>{
        console.log(response)
        // console.log(response.data.secure_url);
         return response.data.secure_url;
        // setUrl(response.data.secure_url);
        // console.log(url);
      }
      

    ).catch(err=>console.log(err))
   return secure_url 
  }
  const [formData, setFormData] = useState({
    title: '',
    des: '',
    image: '.',
    cate:''
  });
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // async function uploadImg(e) {
  //   const data = new FormData();
  //   console.log(img);
  //   data.append("file", img);
  //   data.append("upload_preset", preset_key);
  //   data.append("cloud_name", cloudname);
  //   await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/upload`, {
  //     method: "post",
  //     body: data,
  //   })
  //     .then(
  //       (resp) => resp.json()        
  //       )
  //     .then((data) => {
  //       console.log(data)
  //       setPicurl(data.secure_url);
  //       console.log(data.url)
  //       console.log(picurl)

  //     })
  //     .catch((err) => console.log("Error"));
  // }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    //console.log("Handle works");
    const picurl=await uploadImg();
    //console.log(picurl)
   formData.image=picurl;
    //console.log(formData)  
    axios.post('http://localhost:4000/createPost',formData)
    .then(response => {
      console.log(response);
    })
  }
  return (
    <>
    <button onClick={handleShow} className='rounded-2xl bg-gradient-to-r from-blue-500 to-[#AA77FF] text-white text-xl p-2 font-semibold'>
    Create Post
    </button><br/>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        keyboard={false}
        className='flex flex-col justify-center items-center bg-[#97DEFF]'
      >
        <Modal.Header  className='flex flex-col justify-center items-center'
        >
          <Modal.Title className='text-[#6c41b2]'>Pen Down Your Thoughts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
        <label htmlFor="title" className='text-blue-500 text-2xl font-semibold'>Title</label>
          <input type="text" className='border-2 border-blue-700 rounded-md h-38'  name="title" value={formData.title} onChange={handleChange} />
        </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="des" className='text-blue-500 text-2xl font-semibold'>Description</label>
          <TextareaAutosize
        aria-label="minimum height"
        minRows={12}
        className=' mb-12 text-md border-2 border-blue-700 rounded-md'
        placeholder="Your text area"
        style={{ minWidth: 200,maxWidth:1800 }}
        name="des" value={formData.des} onChange={handleChange}
        />
        </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="image" className='text-blue-500 text-2xl font-semibold'>Image</label>
          <input type="file" className='border-2 border-blue-700 rounded-md'  onChange={(e)=>{setImg(e.target.files[0])}} />
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="cate" className='text-blue-500 text-2xl font-semibold'>Category</label>
          <input type="text" className='border-2 border-blue-700 rounded-md w-[20vw]' name="cate" value={formData.cate} onChange={handleChange}/>
          </div>
          <button type="submit" className=' rounded-2xl bg-gradient-to-r from-blue-500 to-[#AA77FF] text-white text-xl p-2 font-semibold ' >
            Submit
          </button>
          
          </form>
          
        </Modal.Body>
        <Modal.Footer >
        </Modal.Footer>
      </Modal>
    
    </>
    
  )
}

export default CreatePost
