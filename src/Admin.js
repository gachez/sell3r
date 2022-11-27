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
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
            }} >
        <h3 style={{paddingTop: '1.5rem',paddingLeft: '20%'}}>Product details</h3>
        <Form style={{width: '60%',margin:'auto'}} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="e.g Adidas Yeezy Boost 750 Chocolate/Gum" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="e.g One in five top rated..." />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="1000" />
        </Form.Group>

        <div style={{width:'100%',display: 'flex', justifyContent:'space-between'}}>
        <Button variant="success" type="submit">
            Save changes
        </Button>
        <Button variant="primary" type="submit">
            Publish changes
        </Button>
        </div>
        </Form>
    </div>
    <div style={{
        width:'40%',
        height: '100%',
    }}>
        <h3 style={{textAlign:'left',padding: '1rem',width: '100%'}}>Preview</h3>
        <PagePreview containerStyle={{propstyle: {padding:'2rem',width:'50%',height:'auto',borderRadius: '8px',border: 'solid 2px rgba(0,0,0,0.1)'}}} />
    </div>
    </div>
    </div>
  );
}

export default Admin;
