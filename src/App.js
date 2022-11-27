import React from 'react';
import './App.css';
import Close from './cancel.png'
import Plus from './plus.png'
import Minus from './minus-button.png'

const productImgs = [
  'https://cdn.shoplightspeed.com/shops/655187/files/39922165/1652x1652x2/adidas-adidas-yeezy-boost-750-light-brown-gum-choc.jpg',
  'https://i.ebayimg.com/images/g/slEAAOSwTZZiXLVe/s-l1600.jpg',
  'https://sneakernews.com/wp-content/uploads/2016/10/light-brown-yeezy-750-release-info-2.jpg',
  'https://cdn.luxatic.com/wp-content/uploads/2021/01/Most-Expensive-Yeezy-Shoes.jpg'
]

function SalesPage() {
  const [selectedImg,setSelectedImg] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [continueCheckOut,setContinueCheckout] = React.useState(false)
  return (
    <div className="Container">
      <div className='hero' style={{
        backgroundImage: "url('https://images.solecollector.com/complex/images/c_fill,dpr_2.0,h_182,q_70,w_328/yik1lb39kis2w6alxvuo/chocolate-yeezy-boosts-on-feet-1')"
      }}
      onClick={() => {
        setSelectedImg('https://images.solecollector.com/complex/images/c_fill,dpr_2.0,h_182,q_70,w_328/yik1lb39kis2w6alxvuo/chocolate-yeezy-boosts-on-feet-1')
      }}
      >
      </div>
      <div className='desc-section'>
        <h1>Adidas Yeezy Boost 750 Chocolate/Gum</h1>
        <p>If you’re in a rush, 
          the side zipper might come in handy, 
          while a perforated vamp was chosen to help regulate your foot’s 
          temperature. 
           </p>
      </div>
      <div className='img-section'>
        <h2>Images ({productImgs.length})</h2>
        <div className='img-container'>
          {
            productImgs.map((img,i) => {
              return(
                <div onClick={() => {
                  setSelectedImg(img)
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
        }} ><b>Buy now ($2,500)</b></a>
        
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
              <img className='item-img' src={productImgs[0]} alt='' style={{width:'72px',height:'72px'}} />
              <div className='item-desc'>
                <span>
                Contrary to popular belief, Lorem Ipsum is not simply random text. 
                It has roots in a piece of classical Latin 
                literature from 45 BC, making it over 
                2000 years old.
                </span>
              </div>
            </div>
          </div>
          <div className='counter-grid'>
            <h3>Ksh 3,500</h3>
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
              <span>Proceed (Ksh 3,500)</span>
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
    </div>
  );
}

export default SalesPage;
