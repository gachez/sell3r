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
  const [selectedImg, setSelectedImg] = React.useState('')
  const [imgModal, setImgModal] = React.useState(false)
  const [product, setProduct] = React.useState({})
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [continueCheckOut, setContinueCheckout] = React.useState(false)

  let { username, id } = useParams();

  function handleImgModalShow() {
    setImgModal(true)
  }

  function handleImgModalClose() {
    setImgModal(false)
  }

  React.useEffect(() => {
    fetchProductDetails()
  }, [])

  function fetchProductDetails() {
    const userId = id
    axios.get(Config.API_URI + '/products', {
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
      <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <h2 style={{ margin: 'auto' }}>Loading.....</h2>
      </div>
    )
    :
    (
      <div className="Container-page">
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
              product?.productImgs?.map((img, i) => {
                return (
                  <div onClick={() => {
                    setSelectedImg(img)
                    handleImgModalShow()
                  }} className='img' style={{ backgroundImage: `url(${img})` }}>
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
          }} ><b>Contact seller 📲</b></a>

          <small style={{ color: '#fff', width: '100%', textAlign: 'center' }}>Powered by <b>Sell3r</b></small>
        </div>
        <div className='items-modal' style={{
          display: !openModal ? 'none' : 'block'
        }}>
          <div style={{ display: !continueCheckOut ? 'grid' : 'none', justifyContent: 'center' }} className='items-container animate__animated animate__slideInUp'>
            <div className='items-title'>
              <span><b>Confirm item</b></span>
            </div>
            <div className='item-grid'>
              <div className='item-grid-cont'>
                <img className='item-img' src={product.heroImg} alt='' style={{ width: '72px', height: '72px' }} />
                <div className='item-desc'>
                  <span>
                    {product.description}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Fira sans', width: '100%', padding: '1rem' }}>
              <b>Price</b>
              <span style={{marginLeft:'2rem', fontWeight: 'bold'}}>{`${product?.currency} ${product?.price}`}</span>
            </div>
            <small style={{ width: '80%', padding: '8px', fontSize: '0.65rem' }} >
              Kindly note that all communiaction between you and the seller will be done via preferred channels. 
              All arrangements are between you and the seller. </small>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div className='item-cancel' onClick={() => {
                setOpenModal(false)
              }} >Cancel</div>
              <div className='item-cta' onClick={() => {
                setContinueCheckout(true)
              }}>
                <span>Proceed</span>
              </div>
            </div>
          </div>

          <div style={{ display: continueCheckOut ? 'grid' : 'none' }} className='contact-container animate__animated animate__slideInUp'>
            <div className='items-title'>
              <span><b>Contact seller</b></span>
              <img onClick={() => {
                setOpenModal(false)
                setContinueCheckout(false)
              }} src={Close} style={{ width: '28px', height: '28px', cursor: 'pointer' }} />
            </div>
            <div className='item-grid'>
              <form>
                <input placeholder='Name' type='text' /><br />
                <input placeholder='Phone No.' type='number' /><br />
                <input placeholder='Email' type='email' />
                <br />
                <input type='textarea' placeholder='Message' />
                <div className='item-cta' style={{ width: '40%', marginLeft: '0.85rem', marginTop: '1.75rem' }}>
                  <span>Contact 🛒</span>
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
