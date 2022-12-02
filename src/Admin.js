import React from 'react';
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import './App.css';
import './Admin.css'
import Cancel from './cancel.png'
import { PagePreview } from './components/PagePreview';
import NavBarMUI from './components/NavBarMUI';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Link from './link.png'
import Edit from './edit.png'
import { Config } from './config';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { height } from '@mui/system';

function Admin() {
    const [productName, setProductName] = React.useState('Enter product name...')
    const [description, setDescription] = React.useState('Enter description...')
    const [price, setPrice] = React.useState(0)
    const [selectedCurrency, setCurrency] = React.useState('KES')
    const [product, setProduct] = React.useState(undefined)
    const [imageUploaded, setImageUploaded] = React.useState('');
    const [hero, setHero] = React.useState('')
    const [linearProgress, setLinearProgress] = React.useState('none')
    const [image1, setImage1] = React.useState('')
    const [image2, setImage2] = React.useState('')
    const [image3, setImage3] = React.useState('')
    const [selectedImgIndex, setSelectedImgIndex] = React.useState()
    const [showToast, setShowToast] = React.useState('none')
    const [toastText, setToastText] = React.useState('')
    const [userSignedIn, setUserSignedIn] = React.useState({})
    const [showLink, setShowLink] = React.useState(false)
    const [generatedLink, setGeneratedLink] = React.useState('')
    const [editProduct, setEditProduct] = React.useState(false)
    const [showHeroUploadModal, setShowHeroUploadModal] = React.useState(false)
    const [showImgUploadModal, setShowImgUploadModal] = React.useState(false)
    React.useEffect(() => {
        fetchProductDetails()
    }, [])

    function fetchProductDetails() {
        setLinearProgress('block')
        const user = localStorage.getItem('user')
        setUserSignedIn(JSON.parse(user))
        getUser(JSON.parse(user)._id)
        axios.get(Config.API_URI + '/products', {
            params: {
                userId: JSON.parse(user)._id
            }
        })
            .then(res => {
                if (Object.keys(res.data).length > 0) {
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
        setLinearProgress('block')
        const form = new FormData();
        form.append('fileUploaded', imageUploaded);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        window.scrollTo(0, 0)
        axios
            .post(Config.API_URI + '/files-upload', form, config)
            .then((res) => {

                if (selectedImgIndex === 1) {
                    setImage1(res.data)
                    console.log('img1')
                    setShowToast('block')
                    setToastText('Succesfully uploaded image')
                    return
                }
                if (selectedImgIndex === 2) {
                    setImage2(res.data)

                    setShowToast('block')
                    setToastText('Succesfully uploaded image')
                    return
                }
                if (selectedImgIndex === 3) {
                    setImage3(res.data)
                    setShowToast('block')
                    setToastText('Succesfully uploaded image')
                    return
                }
                else {
                    setHero(res.data)
                    setShowToast('block')
                    setToastText('Succesfully uploaded image')
                    return
                }
            })
            .catch((error) => {
                setShowToast('block')
                setToastText('Failed to upload image')
            })
            .finally(() => {
                setShowHeroUploadModal(false)
                setShowImgUploadModal(false)
                setLinearProgress('none')
                closeToastAfter()
            })
    }

    const saveProduct = () => {
        const user = localStorage.getItem('user')
        window.scroll(0,0)
        setLinearProgress('block')
        axios.post(Config.API_URI + '/products', {
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
                setEditProduct(false)
                closeToastAfter()
            })
    }

    const closeToastAfter = () => {
        setTimeout(() => setShowToast('none'), 2000)
    }

    function editProductDetails() {
        const user = localStorage.getItem('user')
        axios.put(`${Config.API_URI}/products/${product._id}`, {
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
        })
            .then(res => {
                setToastText('Succesfully saved changes')
                setShowToast('block')
                fetchProductDetails()
            })
            .catch(err => {
                setShowToast('none')
                setToastText(err)
                closeToastAfter()
            })
            .finally(() => {
                setEditProduct(false)
                closeToastAfter()
            })
    }

    const editUser = (id,link) => {
        axios.put(`${Config.API_URI}/users/${id}`,{
            shortLink: link
        })
        .then(res => {
            setGeneratedLink(res.data.shortLink)
            setUserSignedIn(res.data)
            setShowLink(true)
        })
        .catch(err => {
            setShowToast(true)
            setToastText('Failed to generate link: '+ err)
        })
    }

    const getUser = (id) => {
        axios.get(`${Config.API_URI}/users`, {
            params: {
                userId: id
            }
        })
        .then(res => {
            setUserSignedIn(res.data)
        })
        .catch(err => {
            alert(err)
        })
    }

    const generateURL = (url) => {
        window.scrollTo(0,0)
        setLinearProgress('block')
        axios.get(`${Config.API_URI}/generate-url`, {
            params: {
                url: url
            }
        })
            .then(res => {
                setShowToast('block')
                setToastText('Succesfully generated link. Have a try.')
                editUser(userSignedIn._id, res.data)
            })
            .catch(err => {
                console.error(err)
                setShowToast('block')
                setToastText(err)
            })
            .finally(() => {
                setLinearProgress('none')
                closeToastAfter()
            })
    }

    return (
        <div className='admin-container'>
            <NavBarMUI />
            <Box sx={{ width: '100%' }}>
                <LinearProgress style={{ display: linearProgress }} />
            </Box>
            <div className='content-container'>
                <ToastContainer className="p-3  animate__animated animate__slideInRight" position='top-end'>
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
                <Sidebar className='sidebar'
                    backgroundColor='rgba(0,0,0,0.89)'
                    rootStyles={{
                        fontFamily: 'Fira sans',
                        color: '#fff',
                        height: '100vh',
                        top:0
                    }}
                    width='10%'
                    >
                <Menu>
                    <MenuItem id='dashboard' >Dashboard </MenuItem>
                    <MenuItem id='shop' active >Shop </MenuItem>
                    <MenuItem id='orders' >Orders </MenuItem>
                </Menu>
                </Sidebar>
                <div
                 className='details-container'>
                    <div className='details-title-container'>
                        <h3>Product details</h3>
                        <img
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                editProduct?setEditProduct(false):setEditProduct(true)
                            }}
                            alt='btn'
                            src={editProduct?Cancel:Edit}
                            width='24px'
                            height='24px' />
                    </div>
                    <Form className='details-form' >
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label><b>Product name</b></Form.Label>
                            {
                                product === undefined || editProduct
                                    ?
                                    <Form.Control
                                        type="text"
                                        placeholder={product === undefined ? productName : product.name}
                                        onChange={(e) => {
                                            setProductName(e.target.value)
                                        }}
                                    />
                                    :
                                    <p className='form-text'
                                    >{product === undefined ? productName : product.name}</p>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label><b>Description</b></Form.Label>
                            {
                                product === undefined || editProduct
                                    ?
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder={product === undefined ? description : product.description}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }}
                                    />
                                    :
                                    <p style={{ fontFamily: 'Fira sans', paddingTop: '0.5rem', color: 'rgba(0,0,0,0.6' }}>{product === undefined ? description : product.description}</p>

                            }

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label><b>Price</b></Form.Label>
                            {
                                product === undefined || editProduct
                                    ?
                                    <Form.Control
                                        placeholder={product === undefined ? price : product.price}
                                        type="text"
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                        }}
                                    />
                                    :
                                    <p style={{ fontFamily: 'Fira sans', paddingTop: '0.5rem', color: 'rgba(0,0,0,0.6' }}>
                                        {product === undefined ? price?.toLocaleString() : product.price?.toLocaleString()}</p>
                            }

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCurrency">
                            <Form.Label><b>Currency</b></Form.Label>
                            {
                                product === undefined || editProduct
                                    ?
                                    <Form.Control
                                        placeholder={product === undefined ? selectedCurrency : product.currency}
                                        type="text"
                                        onChange={(e) => {
                                            setCurrency(e.target.value)
                                        }}
                                    />
                                    :
                                    <p style={{ fontFamily: 'Fira sans', paddingTop: '0.5rem', color: 'rgba(0,0,0,0.6' }}>{product === undefined ? selectedCurrency : product.currency}</p>
                            }
                        </Form.Group>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="success"
                                style={{
                                    display: product === undefined || editProduct ? 'block' : 'none'
                                }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    editProduct ? editProductDetails() : saveProduct()
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="primary"
                                style={{
                                    display: !userSignedIn.shortLink ? 'block' : 'none'
                                }}
                                onClick={() => {
                                    !userSignedIn.shortLink
                                    ? 
                                    generateURL(`${Config.BASE_URL}/sp/${userSignedIn?.username}/${userSignedIn?._id}`)
                                    :
                                    window.open(userSignedIn.shortLink)
                                }}
                            >
                                {!userSignedIn.shortLink ? 'Publish site':'View page'}
                            </Button>
                        </div><br />
                        <div
                            style={{
                                display: userSignedIn?.shortLink?.length > 0 || showLink ? 'block' : 'none',
                                fontFamily: 'Fira sans'
                            }}>
                            <b>Shop Link:</b> <a target="_blank" href={userSignedIn?.shortLink?.length > 0 ? userSignedIn?.shortLink : generatedLink}>{userSignedIn?.shortLink?.length > 0 ? userSignedIn?.shortLink : generatedLink}</a>
                            <br /><br /><small style={{ color: 'gray' }}>You can start selling your product by sharing the shop link widely. Happy selling!</small>
                        </div>
                    </Form>

                </div>
                <div className='preview-container'>
                    <div className='preview-title-container' >
                        <h3 style={{
                            textAlign: 'left',
                        }}>Preview</h3>
                        <a target="_blank" href={userSignedIn?.shortLink?.length > 0 ? userSignedIn?.shortLink : generatedLink}>
                            <img
                                style={{ cursor: 'pointer' }}
                                onClick={() => {

                                }}
                                alt='link' src={Link} width='24px' height='24px' />
                        </a>

                    </div>
                    <PagePreview
                        productName={productName}
                        product={product}
                        description={description}
                        setImageUploaded={setImageUploaded}
                        handleUpload={handleUpload}
                        hero={hero}
                        editProduct={editProduct}
                        setSelectedImgIndex={setSelectedImgIndex}
                        selectedImgIndex={selectedImgIndex}
                        image1={image1}
                        image2={image2}
                        image3={image3}
                        showHeroUploadModal={showHeroUploadModal}
                        setShowHeroUploadModal={setShowHeroUploadModal}
                        showImgUploadModal={showImgUploadModal}
                        setShowImgUploadModal={setShowImgUploadModal}
                        linearProgress={linearProgress}
                        setLinearProgress={setLinearProgress}
                        />
                </div>
            </div>
        </div>
    );
}

export default Admin;
