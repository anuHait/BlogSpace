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
 // const[url,setUrl]=useState("");
 var inputArray;
  
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
         return response.data.secure_url;
      }
    ).catch(err=>console.log(err))
   return secure_url 
  }
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '.',
    category:[]
  });
  const handleChange = e => {
    //const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    //console.log("Handle works");
    const picurl=await uploadImg();
    handles();
    //console.log(picurl)
   formData.image=picurl;
   formData.category=inputArray;

    console.log(formData)  
    axios.post('http://localhost:4000/createPost',formData)
    .then(response => {
      console.log(response);
    })
  }
  const [inputValue, setInputValue] = useState('');
  //const [formData, setFormData] = useState(new FormData());
const  [cat,setCat]=useState(new FormData());
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handles = (event) => {
    //event.preventDefault();
     inputArray = inputValue.split(' ');
    inputArray.forEach((value, index) => {
      cat.append(`input_${index}`, value.trim());
    });
    setCat(cat);
  }
  return (
    <>
    <button onClick={handleShow} className='rounded-full bg-gradient-to-r from-blue-500 to-[#AA77FF] text-white text-xl p-2 font-semibold'>
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
          <label htmlFor="description" className='text-blue-500 text-2xl font-semibold'>Description</label>
          <TextareaAutosize
        aria-label="minimum height"
        minRows={12}
        className=' mb-12 text-md border-2 border-blue-700 rounded-md'
        placeholder="Your text area"
        style={{ minWidth: 200,maxWidth:1800 }}
        name="description" value={formData.description} onChange={handleChange}
        />
        </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="image" className='text-blue-500 text-2xl font-semibold'>Image</label>
          <input type="file" className='border-2 border-blue-700 rounded-md'  onChange={(e)=>{setImg(e.target.files[0])}} />
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="cate" className='text-blue-500 text-2xl font-semibold'>Category</label>
          <input type="text" className='border-2 border-blue-700 rounded-md w-[20vw]' name="cate"  value={inputValue} onChange={handleInputChange}/>
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
