import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"

function CreatePost() {
  const preset_key="gbg5x2iv";
  const cloudname="dcugof3zo";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[img,setImg]=useState("");
  const uploadImg=(event)=>{
    const file=event.target.files[0];
    console.log(file);
    const formData=new FormData();
    formData.append("file",file);    
    formData.append("upload_preset",preset_key);
    axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
    formData).then(
      (response)=>{
        console.log(response)
        console.log(response.data.secure_url);
        setImg(response.data.secure_url);
      }
    ).catch(err=>console.log(err))
    // fetch("https://api.cloudinary.com/v1_1/dcugof3zo/image/upload", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       //setPic(data.secure_url.toString());
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  }
 
  return (
    <>
    <button onClick={handleShow}>
    Create Post
    </button><br/>
    
          <input type="file" className='border-cyan-800' onChange={uploadImg}/>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        keyboard={false}
        className='flex flex-col justify-center items-center'
      >
        <Modal.Header         className='flex flex-col justify-center items-center'
        >
          <Modal.Title>Pen Down Your Thoughts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form action="" className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
        <label htmlFor="title" className='text-blue-500 text-2xl font-semibold'>Title</label>
          <input type="text" className='border-2 border-blue-800 rounded-md h-38' />
        </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="des" className='text-blue-500 text-2xl font-semibold'>Description</label>
          <input type="text" className='border-2 border-blue-800 rounded-md  h-60' />
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="image" className='text-blue-500 text-2xl font-semibold'>Image</label>
          <input type="file" className='border-2 border-blue-800 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="cate" className='text-blue-500 text-2xl font-semibold'>Category</label>
          <input type="text" className='border-2 border-blue-800 rounded-md w-[20vw]' />
          </div>
          
          </form>
          
        </Modal.Body>
        <Modal.Footer className='flex flex-col justify-center items-center'>
          <button  onClick={handleClose} >
            Submit
          </button>
          
        </Modal.Footer>
      </Modal>
    
    </>
    
  )
}

export default CreatePost
