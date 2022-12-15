import React from 'react'
import './Login.css'
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios'
import { app } from './firebase'
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Config } from './config'
import Logo from './logo.png'
import LinearProgress from '@mui/material/LinearProgress';

export function Login(){
    const [signInChosen, setSignInChosen] = React.useState(true)
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [disable,setBtnDisable] = React.useState(false)
    const [linearProgress,setLinearProgress] = React.useState('none')
    const [showToast, setShowToast] = React.useState('none')
    const [toastText, setToastText] = React.useState('')
    const [toastColor, setToastColor] = React.useState('')
    const navigate = useNavigate();
 
    function signUp(email,password){
        setLinearProgress('block')
        setBtnDisable(true)
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            axios.post(Config.API_URI+'/users', {
                createUserRequest:{
                    username: userName,
                    email: email,
                    password: password
                }
            })
            .then(
                res => {
                    const user = userCredential.user;
                    setShowToast('block')
                    setToastText('Succesfully created account')
                    setToastColor('#198754')
                    signIn(email,password)
                }
            )
            .catch(error => {
                console.error(error)
                setShowToast('block')
                setToastText('Failed to create user')
                setToastColor('red')
            })
            .finally(() => {
                setLinearProgress('none')
                setBtnDisable(false)
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setShowToast('block')
            setToastText(errorMessage.slice(10))
            setToastColor('red')
        });
    }

    function signIn(email,password){
        setLinearProgress('block')
        setBtnDisable(true)
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            axios.get(Config.API_URI+'/users',{
                params: {
                    email: email
                }
            })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                setShowToast('block')
                setToastText('Succesfully signed in')
                setToastColor('#198754')
                navigate("/seller/shop")
            })
            .catch(err => {
                console.log('failed to sign in ', err)
                setShowToast('block')
                setToastText('Failed to sign in')
                setToastColor('red')
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('failed to sign in with error ', errorMessage)
            setShowToast('block')
            setToastText(errorMessage.slice(10))
            setToastColor('red')
        })
        .finally(() => {
            setLinearProgress('none')
            setBtnDisable(false)
        })
    }
    React.useEffect(() => {
        localStorage.clear()
    },[])
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url('https://wallpaperaccess.com/full/2482231.jpg')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            display: 'grid'
        }}>
            <div style={{
                position: 'absolute',
                top: '1rem',
                left: '0.5rem'
            }}>
                <img src={Logo} width='48px' height='48px' />
            </div>
            <ToastContainer className="p-3  animate__animated animate__slideInRight" position='top-end'>
                    <Toast style={{
                        backgroundColor: toastColor,
                        display: showToast
                    }}>
                        <Toast.Body style={{
                            color: '#fff',
                            fontWeight: 400
                        }}>{toastText}</Toast.Body>
                    </Toast>
                </ToastContainer>
            {
                signInChosen
                ?
                <form className='auth-inner'>
                <LinearProgress style={{display: linearProgress}} />
                <h3>Sign In to Sell3r</h3>
                <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                </div>
                <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                </div>
                <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                    </label>
                </div>
                </div>
                <div className="d-grid">
                <button 
                    disabled={disable}
                    className="btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault()
                        console.log('sign in details ', {
                            email,
                            password
                        })
                        signIn(email,password)
                    }}
                    >
                    Log in
                </button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                
                <p className="forgot-password text-right">
                    Dont have an account? <a href="#" onClick={() => { setSignInChosen(false) }} >sign up</a>
                </p>
                {/* <div style={{
                    width: '100px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <img alt='google' src={Google} width= '32px' height='32px' />
                    <img alt='facebook' src={Facebook} width= '32px' height='32px' />
                </div> */}
                </form>
                :
                <form className='auth-inner'>
                    <LinearProgress style={{display: linearProgress}} />
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g My shop"
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                    />
                    </div>
                    <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    </div>
                    <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    </div>
                    <div className="d-grid">
                    <button
                        disabled={disable}
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.preventDefault()
                            signUp(email,password)
                        }}
                        >
                        Sign up
                    </button>
                    </div>
                    <p className="forgot-password text-right">
                    Already registered <a href="#" onClick={() => { setSignInChosen(true) }}>sign in?</a>
                    </p>
                </form>
            }
        </div>
    )
}