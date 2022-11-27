import React from 'react'
import Plus from '../wplus.png'

const productImgs = [
    'https://cdn.shoplightspeed.com/shops/655187/files/39922165/1652x1652x2/adidas-adidas-yeezy-boost-750-light-brown-gum-choc.jpg',
    'https://i.ebayimg.com/images/g/slEAAOSwTZZiXLVe/s-l1600.jpg',
    'https://i.ebayimg.com/images/g/slEAAOSwTZZiXLVe/s-l1600.jpg',
    'https://i.ebayimg.com/images/g/slEAAOSwTZZiXLVe/s-l1600.jpg'
  ]

export function PagePreview(props){
    console.log(props)
    return(
        <div className="Container" style={props.containerStyle.propstyle}>
        <div className='hero' style={{
            height: '5rem',
            maxHeight: '200px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            cursor:'pointer'
        }}
        onClick={() => {
        }}
        >
            <img style={{margin:'auto'}} src={Plus} alt='add' width='24px' height='24px' />
        </div>
        <div className='desc-section'>
          <h1>Adidas Yeezy Boost 750 Chocolate/Gum</h1>
          <p style={{padding:'8px'}} >If you’re in a rush, 
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
                  }} className='img' style={{display:'grid',backgroundImage: `none`,backgroundColor: 'rgba(0,0,0,0.6)'}}>
                    <img src={Plus} style={{margin: 'auto'}} width='24px' height='24px' />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='reviews-section'>
        </div>
      </div>
    )
}