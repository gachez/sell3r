import React from 'react';
import { Navbar,Container,Nav,NavDropdown,Form,Button } from 'react-bootstrap';
import './App.css';
import Close from './cancel.png'
import Plus from './plus.png'
import Minus from './minus-button.png'
import { PagePreview } from './components/PagePreview';
import NavBarMUI from './components/NavBarMUI';

function Admin() {
  const [selectedImg,setSelectedImg] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [continueCheckOut,setContinueCheckout] = React.useState(false)
  return (
    <div className='admin-container'>
     <NavBarMUI />
    <div style={{
        width:'100%',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }}>
    <div style={{
            width: '50%'}} >
        <h3>Product details</h3>
        <Form style={{width: '60%'}} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Product img</Form.Label>
            <Form.Control type="file" />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="e.g One in five top rated..." />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="1000" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </div>
    <div style={{
        width:'40%',
        height: '100%',
    }}>
        <h3 style={{textAlign:'left',padding: '1rem'}}>Preview</h3>
        <PagePreview containerStyle={{propstyle: {padding:'2rem',width:'50%',height:'auto',borderRadius: '8px',border: 'solid 2px rgba(0,0,0,0.1)'}}} />
    </div>
    </div>
    </div>
  );
}

export default Admin;
