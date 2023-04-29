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
    hi i am modal 
    </button><br/>
    
          <input type="file" className='border-cyan-800' onChange={uploadImg}/>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form action="" className='flex flex-col gap-4'>
        <div>
        <label htmlFor="title" className='text-cyan-600'>Title</label>
          <input type="text" className='border-cyan-800' />
        </div>
          <div>
          <label htmlFor="des" className='text-cyan-600'>Description</label>
          <input type="text" className='border-cyan-800' />
          </div>
          <div>
          <label htmlFor="image" className='text-cyan-600'>Image</label>
          <input type="file" className='border-cyan-800' />
          </div>
          <div>
          <label htmlFor="cate" className='text-cyan-600'>Category</label>
          <input type="text" className='border-cyan-800' />
          </div>
          
          </form>
          
        </Modal.Body>
        <Modal.Footer>
          <button  onClick={handleClose}>
            Submit
          </button>
          
        </Modal.Footer>
      </Modal>
    
    </>
    
  )
}

export default CreatePost
