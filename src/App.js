import React from 'react';
import './App.css';
import Close from './cancel.png'
import Plus from './plus.png'
import Minus from './minus-button.png'
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import ModalImage from "react-modal-image";
import { useParams } from "react-router";
import { Config } from './config';

function SalesPage() {
  const [selectedImg,setSelectedImg] = React.useState('')
  const [imgModal, setImgModal] = React.useState(false)
  const [product,setProduct] = React.useState({})
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [continueCheckOut,setContinueCheckout] = React.useState(false)

  let { username,id } = useParams();

  function handleImgModalShow(){
    setImgModal(true)
  }

  function handleImgModalClose(){
    setImgModal(false)
  }

  React.useEffect(() => {
    fetchProductDetails()
  },[])

  function fetchProductDetails() {
    const userId = id
    axios.get(Config.API_URI+'/products',{
      params: {
        userId: userId
      }
    })
    .then(res => {
      setProduct(res.data)
      setIsLoaded(true)
    })
    .catch(err => {
      alert(err)
    })
  }

  return isLoaded === false ?
  (
    <div style={{width: '100vw',height: '100vh', display: 'flex'}}>
      <h2 style={{margin: 'auto'}}>Loading.....</h2>
    </div>
  )
  :
  (
    <div className="Container">
      <div className='hero' style={{
        backgroundImage: `url(${product?.heroImg})`
      }}
      onClick={() => {
      }}
      >
      </div>
      <div className='desc-section'>
        <h1>{product?.name}</h1>
        <p>
          {product?.description}
           </p>
      </div>
      <div className='img-section'>
        <h2>Images ({product?.productImgs?.length})</h2>
        <div className='img-container'>
          {
            product?.productImgs?.map((img,i) => {
              return(
                <div onClick={() => {
                  setSelectedImg(img)
                  handleImgModalShow()
                }} className='img' style={{backgroundImage: `url(${img})`}}>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='reviews-section'>
      </div>
      <div className='cta-section'>
        <a onClick={() => {
          setOpenModal(true)
        }} ><b>Buy now ({product?.currency} {product?.price})</b></a>
        
        <small style={{color: '#fff',width: '100%',textAlign: 'center'}}>Powered by <b>Sell3r</b></small>
      </div>
      <div className='items-modal' style={{
        display: !openModal?'none':'block'
      }}>     
      <div style={{display: !continueCheckOut?'grid':'none'}} className='items-container animate__animated animate__slideInUp'>
          <div className='items-title'>
            <span>Order Items (125)</span>
          </div>
          <div className='item-grid'>
            <div className='item-grid-cont'>
              <img className='item-img' src={product.heroImg} alt='' style={{width:'72px',height:'72px'}} />
              <div className='item-desc'>
                <span>
                  {product.description}
                </span>
              </div>
            </div>
          </div>
          <div className='counter-grid'>
            <h3>{product.currency} {product.price}</h3>
            <div className='counter'>
              <div style={{backgroundImage: `url(${Minus})`, width: '28px', height: '28px', backgroundPosition: 'center', backgroundSize: 'contain'}}></div>
                1
              <div style={{backgroundImage: `url(${Plus})`, width: '28px', height: '28px',backgroundPosition: 'center', backgroundSize: 'contain'}}></div>
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-around'}}>
            <div className='item-cancel' onClick={() => {
              setOpenModal(false)
            }} >Cancel</div>
            <div className='item-cta' onClick={() => {
              setContinueCheckout(true)
            }}>
              <span>Proceed ({product.currency} {product.price})</span>
              </div>
            </div>
          </div>

      <div style={{display: continueCheckOut?'grid':'none'}} className='contact-container animate__animated animate__slideInUp'>
        <div className='items-title'>
            <span>Order details</span>
            <img onClick={() => {
              setOpenModal(false)
              setContinueCheckout(false)
            }} src={Close} style={{width: '28px',height: '28px',cursor:'pointer'}} />
          </div>
          <div className='item-grid'>
           <form>
              <input placeholder='Name' type='text' /><br />
              <input placeholder='Phone No.' type='number' /><br />
              <input placeholder='Email' type='email' />
              <br />
              <div className='item-cta' style={{width: '40%', marginLeft: '0.85rem',marginTop: '1.75rem'}}>
                <span>Make order</span>
            </div>
           </form>
          </div>
        </div>
      </div>

      <Modal
      show={imgModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={handleImgModalClose}
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
          <div style={{
            width: '100%',
            height: '70vh',
            backgroundImage: `url(${selectedImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          </div>
      </Modal.Body>
    </Modal>
    </div>
  );
}

export default SalesPage;
