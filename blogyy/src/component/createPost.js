import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreatePost() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <button onClick={handleShow}>
    hi i am modal 
    </button>

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
          <label htmlFor="mane" className='text-cyan-600'>Name</label>
          <input type="text" className='border-cyan-800' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    
    </>
    
  )
}

export default CreatePost
