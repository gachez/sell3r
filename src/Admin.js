import React from 'react';
import { Form,Button,Toast,ToastContainer } from 'react-bootstrap';
import './App.css';
import { PagePreview } from './components/PagePreview';
import NavBarMUI from './components/NavBarMUI';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Link from './link.png'
import Edit from './edit.png'
import { Config } from './config';


function Admin() {
    const [productName, setProductName] = React.useState('Enter product name...')
    const [description, setDescription] = React.useState('Enter description...')
    const [price, setPrice] = React.useState(0)
    const [selectedCurrency, setCurrency] = React.useState('KES')
    const [product,setProduct] = React.useState(undefined)
    const [imageUploaded, setImageUploaded] = React.useState('');
    const [hero, setHero] = React.useState('')
    const [linearProgress, setLinearProgress] = React.useState('none')
    const [image1,setImage1] = React.useState('')
    const [image2,setImage2] = React.useState('')
    const [image3,setImage3] = React.useState('')
    const [selectedImgIndex, setSelectedImgIndex] = React.useState()
    const [showToast,setShowToast] = React.useState('none')
    const [toastText, setToastText] = React.useState('')
    const [userSignedIn,setUserSignedIn] = React.useState({})
    const [showLink, setShowLink] = React.useState(false)
    const [generatedLink,setGeneratedLink] = React.useState('')

    React.useEffect(() => {
        fetchProductDetails()
    },[])

    function fetchProductDetails(){
        setLinearProgress('block')
        const user = localStorage.getItem('user')
        setUserSignedIn(JSON.parse(user))
        axios.get(Config.API_URI+'/products', {
            params: {
                userId: JSON.parse(user)._id
            }
        })
        .then(res => {
            if(Object.keys(res.data).length > 0){
                setProduct(res.data)
                setProductName(res.data.name)
                setHero(res.data.heroImg)
                setImage1(res.data.productImgs[0])
                setImage2(res.data.productImgs[1])
                setImage3(res.data.productImgs[2])
                setDescription(res.data.description)
                setPrice(res.data.price)
                setCurrency(res.data.currency)
            }
            return
        })
        .catch(err => {
            alert(err)
            console.error(err)
        })
        .finally(() => {
            setLinearProgress('none')
        })
    }
    const handleUpload = () => {
        const form = new FormData();
        form.append('fileUploaded', imageUploaded);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        axios
            .post(Config.API_URI+'/files-upload', form, config)
            .then((res) => {
                
                setShowToast('block')
                setToastText('Succesfully uploaded image')
                if(selectedImgIndex === 1){
                    setImage1(res.data)
                    return
                }
                if(selectedImgIndex === 2){
                    setImage2(res.data)
                    return
                }
                if(selectedImgIndex === 3){
                    setImage3(res.data)
                    return
                }
                else{
                    setHero(res.data);
                    return
                }
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    const saveProduct = () => {
        const user = localStorage.getItem('user')
        setLinearProgress('block')
        axios.post(Config.API_URI+'/products',{
            createProductRequest: {
                name: productName,
                description: description,
                userId: JSON.parse(user)._id,
                price: price,
                currency: selectedCurrency,
                heroImg: hero,
                productImgs: [
                    image1,
                    image2,
                    image3
                ]
            }
        })
        .then(res => {
            setShowToast('block')
            setToastText('Succesfully saved product details')
            fetchProductDetails()
        })
        .catch(err => {
            console.error(err)
            setShowToast('block')
            setToastText(err)
        })
        .finally(() => {
            setLinearProgress('none')
        })
    }

    const closeToast = () => {
        setShowToast('none')
    }
    const generateURL = (url) => {
        setLinearProgress('block')
        axios.get(`${Config.API_URI}/generate-url`,{
            params: {
                url: url
            }
        })
        .then(res => {
            setShowToast('block')
            setToastText('Succesfully generated link. Have a try.')
            setGeneratedLink(res.data)
            setShowLink(true)
        })
        .catch(err => {
            console.error(err)
            setShowToast('block')
            setToastText(err)
        })
        .finally(() => {
            setLinearProgress('none')
        })
    }

  return (
    <div className='admin-container'>
     <NavBarMUI />
     <Box sx={{ width: '100%' }}>
      <LinearProgress style={{display: linearProgress}} />
    </Box>
    <div style={{
        width:'100%',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontFamily: 'Fira sans'
    }}>
        <ToastContainer className="p-3" position='top-end'>
          <Toast style={{
            backgroundColor: '#198754',
            display: showToast
          }}>
            <Toast.Body style={{
                color: '#fff',
                fontWeight: 400
            }}>{toastText}</Toast.Body>
          </Toast>
        </ToastContainer>  
    <div style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
            }} >
        <div style={{paddingTop: '1rem',position: 'relative',left:'8%',width: '60%', display:'flex', justifyContent: 'space-between',alignItems: 'center'}}>
            <h3 style={{paddingLeft: '20%'}}>Product details</h3>
            <img alt='btn' src={Edit} width='24px' height = '24px' />
        </div>
        <Form style={{width: '60%',height:'80%',margin:'auto'}} >
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Product name</Form.Label>
            <Form.Control
             type="text" 
             value={product===undefined?productName:product.name}
             placeholder="e.g Adidas Yeezy Boost 750 Chocolate/Gum" 
             onChange={(e) => {
                setProductName(e.target.value)
             }}
             />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
             as="textarea" 
             rows={3} 
             value={product===undefined?description:product.description}
             placeholder="e.g One in five top rated..." 
             onChange={(e) => {
                setDescription(e.target.value)
             }}
             />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
                 value={product===undefined?price:product.price} 
                 type="text" 
                 placeholder="1000" 
                 onChange={(e) => {
                    setPrice(e.target.value)
                 }}
                 />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCurrency">
            <Form.Label>Currency</Form.Label>
            <Form.Control
                value={product===undefined?selectedCurrency:product.currency} 
                type="text" 
                placeholder="USD"
                onChange={(e) => {
                    setCurrency(e.target.value)
                }}
                />
        </Form.Group>

        <div style={{width:'100%',display: 'flex', justifyContent:'space-between'}}>
        <Button variant="success" 
            onClick={(e) => {
                e.preventDefault()
                saveProduct()
            }}
        >
            {}Save
        </Button>
        <Button
            variant="primary" 
            onClick={() => {
                generateURL(`${Config.BASE_URL}/sp/${userSignedIn?.username}/${userSignedIn?._id}`)
            }}
            >
            Publish site
        </Button>
        </div><br />
        <div
            style={{
                display: showLink?'block':'none',
                fontFamily: 'Fira sans'
                }}>Page Link: <a href={generatedLink}>{generatedLink}</a></div>
        </Form>
    
    </div>
    <div style={{
        width:'40%',
        height: '100%',
    }}>
        <div style={{
            display: 'flex', 
            alignItems: 'center'
        }} >
            <h3 style={{
                textAlign:'left',
                padding: '1rem'
                }}>Preview</h3>
            <img alt='link' src={Link} width='24px' height='24px' />
        </div>
        <PagePreview
            productName={productName}
            product={product}
            description={description}
            setImageUploaded={setImageUploaded} 
            handleUpload={handleUpload}
            hero={hero}
            setSelectedImgIndex={setSelectedImgIndex}
            selectedImgIndex={selectedImgIndex}
            image1={image1}
            image2={image2}
            image3={image3}
            containerStyle={{
                propstyle: 
                {
                    padding:'2rem',
                    width:'50%',
                    height:'auto',
                    borderRadius: '8px',
                    border: 'solid 2px rgba(0,0,0,0.1)'
                }}} />
    </div>
    </div>
    </div>
  );
}

export default Admin;
