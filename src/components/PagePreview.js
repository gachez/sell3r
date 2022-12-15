import React from 'react'
import Plus from '../wplus.png'
import '../Admin.css'
import { Modal,Button, Form } from 'react-bootstrap'
import {FileInput,ValidationForm} from 'react-bootstrap4-form-validation';
import { LinearProgress } from '@mui/material';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Plussign from '../snip1.png'

export function PagePreview(props){
  const productImgs = [
    props.image1,
    props.image2,
    props.image3
  ]  

  const handleCloseUploadModal = () => props.setShowHeroUploadModal(false);
  const handleShowUploadModal = () => props.setShowHeroUploadModal(true);

  const handleCloseImgModal = () => props.setShowImgUploadModal(false);
  const handleShowImgModal = () => props.setShowImgUploadModal(true);

    return(
        <div className="Container" >
          <OverlayTrigger
            placement='left'
            defaultShow={props.product === undefined?true:false}
            show={props.product === undefined?true:false}
            delay={2500}
            overlay={
            <Popover>
              <Popover.Header as="h3">{`Sell3r tip`}</Popover.Header>
              <Popover.Body>
                <strong>Click to add high quality images of what you are selling.</strong>.
              </Popover.Body>
            </Popover>
          }
        >
          <div className='hero' style={{
              height: props.hero===''?'5rem':'200px',
              maxHeight: '200px',
              backgroundColor: props.hero===''?'rgba(0,0,0,0.7)':'none',
              backgroundImage: props.hero === ''? 'none':`url(${props.hero})`,
              cursor:'pointer'
          }}
          onClick={() => {
            handleShowUploadModal()
          }}
          >
              <img style={{
                margin:'auto'}} src={Plus} alt='add' width='24px' height='24px' />
          </div>
        </OverlayTrigger>
        <div className='desc-section'>
          <h1>{props.productName}</h1>
          <p style={{padding:'8px'}} >
            {props.description} 
             </p>
        </div>
        <div className='img-section'>
          <h2>Images ({productImgs.length})</h2>
          <div className='img-container'>
            {
              productImgs.map((img,i) => {
                return(
                  <div onClick={() => {
                   handleShowImgModal()
                    props.setSelectedImgIndex(i+1)
                  }} className='img' style={{
                    display:'grid',
                    cursor:'pointer',
                    backgroundImage: img === ''?'none':`url(${img})`,
                    backgroundColor: img === ''?'rgba(0,0,0,0.6)':'none'
                    }}>
                    <img alt='plus' src={Plus} style={{margin: 'auto'}} width='24px' height='24px' />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='reviews-section'>
        </div>
        <Modal centered show={props.showHeroUploadModal} onHide={handleCloseUploadModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload hero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <LinearProgress style={{display: props.linearProgress}}/>  
        <ValidationForm>
          <div style={{fontSize:'12px'}}>Allowed files: jpg jpeg, png upto 5mb</div>
                        <FileInput
                            name="fileUploaded"
                            id="image"
                            encType="multipart/form-data"
                            onChange={(e) => {
                                props.setImageUploaded(() => {
                                    return e.target.files[0];
                                });
                            }}
                            required
                            fileType={['png', 'jpg', 'jpeg']}
                            maxFileSize="3mb"
                            errorMessage={{
                                required: 'Please upload an image',
                                fileType: 'Only image is allowed',
                                maxFileSize: 'Max file size is 3MB'
                            }}
                        />
                    </ValidationForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUploadModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            props.handleUpload()
            handleCloseImgModal()
          }}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={props.showImgUploadModal} onHide={handleCloseUploadModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <LinearProgress style={{display:props.linearProgress}} />  
        <ValidationForm>
                        <div style={{fontSize:'12px'}}>Allowed files: jpg jpeg, png upto 5mb</div>
                        <FileInput
                            name="filesUploaded"
                            id="image"
                            encType="multipart/form-data"
                            onChange={(e) => {
                                props.setImageUploaded(() => {
                                    return e.target.files[0];
                                });
                            }}
                            required
                            fileType={['png', 'jpg', 'jpeg']}
                            maxFileSize="3mb"
                            errorMessage={{
                                required: 'Please upload an image',
                                fileType: 'Only image is allowed',
                                maxFileSize: 'Max file size is 3MB'
                            }}
                        />
                    </ValidationForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImgModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            props.handleUpload()
          }}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}