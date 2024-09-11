import React,{useState} from 'react'
import SectionHeading from '../../components/SectionHeading'
import backup from '../../assets/images/cloud-upload-svgrepo-com.png'
import Form from 'react-bootstrap/Form';
import RadioButton from '../../components/RadioButton';
import FormInput from '../../components/FormInput';
import ButtonComponent from '../../components/ButtonComponent';
import Modal from 'react-bootstrap/Modal'
import gif from '../../assets/images/success.gif';

function Backup() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [disabled,setDisable] = useState(false);
    const handleDisable = ()=>setDisable(false);
    const handleDisableShow = ()=>setDisable(true)

    function customField(){
        console.log("This has been called false")
        handleDisable();
    }
    function disableCustom(){
        console.log("This has been called true")
        handleDisableShow();
    }
    function example(){
        console.log("Outside of the function : ",disabled)
    }
  return (
    <div className="backup_container">
        <SectionHeading title="Backup"/>
        <div className="main_backup_container d-flex justify-content-center align-items-center flex-column body-bg-color">
            <div className='backup d-flex justify-content-around align-items-center flex-wrap p-2 mb-2'>
                <img src={backup} alt="Upload-img" width="150" height="150"/>
                <div className="backup_form">
                    <h4>Backup on</h4>
                    <Form>
                        {/* daily */}
                        <div className="mb-1">
                            <RadioButton name="backup" label="Daily" onChange={disableCustom}/>
                            
                        </div>
                        {/* weekly */}
                        <div className="mb-1">
                            <RadioButton name="backup" label="Weekly" onChange={disableCustom}/>
                        </div>
                        {/* monthly */}
                        <div className="mb-1">
                            <RadioButton name="backup" label="Monthly" onChange={disableCustom}/>
                        </div>
                        {/* custom */}
                        <div className="mb-1">
                            <RadioButton name="backup" label="custom" onChange={customField}/>
                            {/* from date for backup */}
                            {disabled?(
                                <Form.Group className={`mb-2`} controlId="from-date">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="date" name="from-date" className="border-secondary" id="from-date" disabled/>
                            </Form.Group>
                            ):<Form.Group className={`mb-2`} controlId="from-date">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="date" name="from-date" className="border-secondary" id="from-date"/>
                            </Form.Group>
                            }
                            
                            {/* to date for backup */}
                            {disabled?(
                                <Form.Group className={`mb-2`} controlId="to-date">
                                <Form.Label>To</Form.Label>
                                <Form.Control type="date" name="to-date" className="border-secondary" id="to-date" disabled/>
                            </Form.Group>
                            ):<Form.Group className={`mb-2`} controlId="to-date">
                                <Form.Label>To</Form.Label>
                                <Form.Control type="date" name="to-date" className="border-secondary" id="to-date"/>
                            </Form.Group>
                            }
                        </div>
                    </Form>
                </div>
            </div>
            <div className="edit_button">
                <ButtonComponent type="submit" onClick={handleShow}>Backup</ButtonComponent>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='heading-bg-color'>
            <Modal.Title  as={() => {
                return <h5 style={{ marginBottom: "0px" }}>Backup Completed</h5>;

            }} className='form-font'></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={gif} alt=""  style={{width:"100%"}}/>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Backup