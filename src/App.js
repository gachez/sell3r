import React from 'react';
import './App.css';
import Close from './cancel.png'

const productImgs = [
  'https://cdn.shoplightspeed.com/shops/655187/files/39922165/1652x1652x2/adidas-adidas-yeezy-boost-750-light-brown-gum-choc.jpg',
  'https://i.ebayimg.com/images/g/slEAAOSwTZZiXLVe/s-l1600.jpg',
  'https://sneakernews.com/wp-content/uploads/2016/10/light-brown-yeezy-750-release-info-2.jpg',
  'https://cdn.luxatic.com/wp-content/uploads/2021/01/Most-Expensive-Yeezy-Shoes.jpg'
]

function SalesPage() {
  const [selectedImg,setSelectedImg] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
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
        <a>Buy now ($2,500)</a>
      </div>
      {
        openModal 
        ?
        (
          <div className='img-modal' style={{
            backgroundImage: `url(${selectedImg})`
          }}>
            <div style={{width:'32px',height: '32px',position:'absolute',top:0}} />
            <div className='img-modal-div' style={{backgroundImage: `url(${selectedImg})`}} alt='modal-img' />
          </div>    
        )
        :
        null
      }
    </div>
  );
}

export default SalesPage;
