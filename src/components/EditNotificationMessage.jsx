import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { useDispatch, useSelector } from 'react-redux';
import RadioButton from './RadioButton';
import SelectComponent from './SelectComponent';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ButtonComponent from './ButtonComponent';
import { leaveName } from '../javascript/leaveFormValidation';
import { deletingNotificationFromServer, setSelectedNotification, updatingNotificationToServer } from '../slicers/NotificationsSlicer';
import gif from '../assets/images/success.gif'

function EditNotificationMessage({notification}) {
    const dispatch = useDispatch();
    const {leaveTypeSet,error:errors} = useSelector(state=>state.leavetype);

    const [leaveType,setLeaveType] = useState({
        name:"",
        default:"",
        enabled:"",
        annual:""
    })

    const [removeLeaveType,setRemoveLeaveType]=useState({
        leavetype:"",
        remove:""
    })
    const {selectedNotification} = useSelector(state => state.notification);

    const [error,setError]=useState({})

    function onChangeName(e){
        const {name,value}=e.target;
        setLeaveType(prev=>({
            ...prev,
            [name]:value
        }))

        const error = {};
        const state = leaveName(value);
        if(state[0]){
            error.leavename = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.leavename=state[1];
            setError({...error,...error});
            return false;
        }
    }

    function onChangeRadio(e){
        const {name,value} = e.target;
        console.log(name,value)
        setLeaveType({
            ...leaveType,
            [name]:value
        })
    }

    function onChangeRadioRemove(e){
        const {name,value} = e.target;
        console.log(name,value)
        setRemoveLeaveType({
            ...removeLeaveType,
            [name]:value
        })
    }
    function onSubmitValidation(e){
        e.preventDefault();
        const error = {};
        const name = leaveName(leaveType.name);
        if(!name[0]){
            error.leavename = name[1];
        }
        if(leaveType.default == ""){
            error.default = "Select an option";
        }
        if(leaveType.enabled == ""){
            error.enabled = "Select an option";
        }
        if(leaveType.annual == ""){
            error.annual = "Select an option";
        }
        if(Object.keys(error).length >0){
            
            setError({...error,...error});
        }
        else{
            setError({...error,...error})
            const id = selectedNotification.id;
            dispatch(updatingNotificationToServer({...leaveType,from:"hr",type:"add",id}))
            setLeaveType({
                name:"",
                default:"",
                enabled:"",
                annual:"",
            })
            handleClose();
            handleSuccessShow();
        }
    }

    function onChangeSelect(e){
        const {name,value} = e.target;
        setRemoveLeaveType(prev=>({
            ...prev,
            [name]:value
        }))
        console.log(name,value)
        const error = {};
        if(removeLeaveType.leavetype==""){
            error.leavetype = "Select a leave";
            setError({...error,...error});
            return false; 
        }
        else{
            error.leavetype = null;
            setError({...error,...error});
            return true; 
        }
    }

    function onSubmitRemoveValidation(e){
        e.preventDefault();
        const error = {};
        if(removeLeaveType.leavetype==""){
            error.leavetype = "Select a leave";
        }
        if(removeLeaveType.remove == ""){
            error.remove = "Select an option";
        }
        if(Object.keys(error).length >0){
            setError({...error,...error});
        }
        else{
            setError({...error,...error})
            const id = selectedNotification.id;
            dispatch(updatingNotificationToServer({...removeLeaveType,from:"hr",type:"remove",id}))
            setRemoveLeaveType({
                leavetype:"",
                remove:""
            });
            handleRemoveClose();
            handleSuccessShow();
        }
    }

    function editAddLeaveType(notification){
        dispatch(setSelectedNotification(notification));
        handleShow();
    }

    function editRemoveLeaveType(notification){
        dispatch(setSelectedNotification(notification));
        handleRemoveShow();
    }

    function deleteNotification(notification){
        dispatch(deletingNotificationFromServer(notification))
    }
    useEffect(()=>{
        if(Object.keys(selectedNotification).length>0 && selectedNotification.type ==="add"){
            setLeaveType({
                name:selectedNotification.name,
                default:selectedNotification.default,
                enabled:selectedNotification.enabled,
                annual:selectedNotification.annual
            })
        }
        else{
            if(Object.keys(selectedNotification).length>0 && selectedNotification.type === "remove"){
                setRemoveLeaveType({
                    leavetype:selectedNotification.leavetype,
                    remove:selectedNotification.remove
                })
            }
        }
    },[dispatch,selectedNotification])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [removeShow, setRemoveShow] = useState(false);

  const handleRemoveClose = () => setRemoveShow(false);
  const handleRemoveShow = () => setRemoveShow(true);

  const [successShow, setSuccessShow] = useState(false);

  const handleSuccessClose = () => setSuccessShow(false);
  const handleSuccessShow = () => setSuccessShow(true);

    const {notificationSet} = useSelector((state)=>state.notification)
    let nonotify = true;
  return (
    <>
        {/* add card design */}
        {
            notification.type === "add"?
            <div style={{border:"1px solid grey"}} className='p-2 mb-2'>
                    <div className="close-notify d-flex justify-content-between mb-2" >
                        <h6 className='font-color text-decoration-underline'><i>Request to add leave type</i></h6>
                        <ion-icon name="close-outline" className="btn-close" onClick={()=>deleteNotification(notification)}></ion-icon>
                    </div>
                    <Row>
                        <Col>
                            <div className='d-flex align-items-center column-gap-2'>
                                <p className='mb-2 fw-semibold font-color'>Leave Name: </p>
                                <p className='mb-2'>{notification.name}</p>
                            </div>
                            <div className='d-flex align-items-center column-gap-2'>
                                <p className='mb-2 fw-semibold font-color'>Set Default: </p>
                                <p className='mb-2'>{notification.default.charAt(0).toUpperCase() + notification.default.slice(1)}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex align-items-center column-gap-2'>
                                <p className='mb-2 fw-semibold font-color'>Set Enabled: </p>
                                <p className='mb-2'>{notification.enabled.charAt(0).toUpperCase() + notification.enabled.slice(1)}</p>
                            </div>
                            <div className='d-flex align-items-center column-gap-2'>
                                <p className='mb-2 fw-semibold font-color'>Deduct from annual: </p>
                                <p className='mb-2'>{notification.annual.charAt(0).toUpperCase() + notification.annual.slice(1)}</p>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <Button variant="success" className='me-4 mb-2 mb-xl-0' onClick={()=>editAddLeaveType(notification)}>Edit</Button>
                            <Button variant="danger" onClick={()=>deleteNotification(notification)}>Canel</Button>
                        </Col>
                    </Row>
            </div>:null
        }
        {/* remove card design */}
        {
            notification.type === "remove" ? 
            <div style={{border:"1px solid grey "}} className='p-2 mb-2'>
                    <div className="close-notify d-flex justify-content-between mb-2" >
                        <h6 className='font-color text-decoration-underline'><i>Request to remove leave type</i></h6>
                        <ion-icon name="close-outline" className="btn-close" onClick={()=>deleteNotification(notification)}></ion-icon>
                    </div>
                    <Row>
                        <Col>
                            <div className='d-flex align-items-center column-gap-2'>
                                <p className='mb-2 fw-semibold font-color'>Leave Type: </p>
                                <p className='mb-2'>{notification.leavetype}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex align-items-center column-gap-2'>
                                <p className='mb-2 fw-semibold font-color'>Remove or Default </p>
                                <p className='mb-2'>{notification.remove.charAt(0).toUpperCase() + notification.remove.slice(1)}</p>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <Button variant="success" className='me-4 mb-md-2 mb-xl-0' onClick={()=>editRemoveLeaveType(notification)}>Edit</Button>
                            <Button variant="danger" className='mb-2 mb-md-2 mb-xl-0' onClick={()=>deleteNotification(notification)}>Canel</Button>
                        </Col>
                    </Row>
            </div>:null
        }
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='heading-bg-color'>
            <Modal.Title  as={() => {
                return <h5 style={{ marginBottom: "0px" }}>Request to add leave type</h5>;
            }} className='form-font'></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                {/* Leave type name */}
            <Form.Group className=" mb-2">
                <Form.Label>Leave Type<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                <Form.Control type="text" placeholder="Enter leave type name" value={leaveType.name} name="name" onChange={onChangeName} className="border-secondary"/>
                {error.leavename && <small>{error.leavename}</small>}
            </Form.Group>
            {/* Default leave type */}
            <div className="mb-3 mt-2">
                <Form.Label className='fw-semibold'>Set as default type<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                <div className='p-2 ps-4 radio-border rounded-3'>
                    <RadioButton label="yes" name="default" value="yes" checked={leaveType.default=='yes'} onChange={onChangeRadio}/>
                    <RadioButton label="no" name="default" value="no" checked={leaveType.default=='no'} onChange={onChangeRadio}/>
                </div>
                {error.default && <small>{error.default}</small>}
            </div>

            {/* set leave type enabled */}
            <div className="mb-3 mt-2">
                <Form.Label className='fw-semibold'>Set as Enabled<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                <div className='p-2 ps-4 radio-border rounded-3'>
                    <RadioButton label="yes" name="enabled" value="yes" checked={leaveType.enabled=='yes'} onChange={onChangeRadio}/>
                    <RadioButton label="no" name="enabled" value="no" checked={leaveType.enabled=='no'} onChange={onChangeRadio}/>
                </div>
                {error.enabled && <small>{error.enabled}</small>}
            </div>

            {/* detect from annual leave */}
            <div className="mb-3 mt-2">
                <Form.Label className='fw-semibold'>Detect From Annual Leave<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                <div className='p-2 ps-4 radio-border rounded-3'>
                    <RadioButton label="yes" name="annual" value="yes" checked={leaveType.annual=='yes'} onChange={onChangeRadio} />
                    <RadioButton label="no" name="annual" value="no" checked={leaveType.annual=='no'} onChange={onChangeRadio} />
                </div>
                {error.annual && <small>{error.annual}</small>}
            </div>

            <div className='d-flex justify-content-end column-gap-3'>
                <ButtonComponent type="reset">reset</ButtonComponent>
                <ButtonComponent type="submit" onClick={onSubmitValidation}>Submit</ButtonComponent>
            </div>
            </Form>
            </Modal.Body>
        </Modal>

        {/* request to remove leave modal */}
        <Modal show={removeShow} onHide={handleRemoveClose}>
            <Modal.Header closeButton className='heading-bg-color'>
            <Modal.Title  as={() => {
                return <h5 style={{ marginBottom: "0px" }}>Request to remove leave type</h5>;
            }} className='form-font'></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* leave types */}
                    <label htmlFor="leavetype fw-semibold">Leave Type<sup className='text-danger fw-bolder fs-6'>*</sup></label>
                    <SelectComponent  id="leave_type" name="leavetype" options={leaveTypeSet} setDefault={removeLeaveType.leavetype} onChange={onChangeSelect}/>
                    {error.leavetype && <small>{error.leavetype}</small>}

                    {/* enabled or disabled */}
                    <div className="mb-3 mt-2">
                        <Form.Label className='fw-semibold'>Remove or Disabled leave type<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                        <div className='p-2 ps-4 radio-border rounded-3'>
                            <RadioButton label="Remove" name="remove" value="remove" checked={removeLeaveType.remove == "remove"} onChange={onChangeRadioRemove}/>
                            <RadioButton label="Disable" name="remove" value="disable" checked={removeLeaveType.remove == "disable"} onChange={onChangeRadioRemove}/>
                        </div>
                        {error.remove && <small>{error.remove}</small>}
                    </div>

                    <div className='d-flex justify-content-end column-gap-3'>
                        <ButtonComponent type="reset">reset</ButtonComponent>
                        <ButtonComponent type="submit" onClick={onSubmitRemoveValidation}>Submit</ButtonComponent>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

        {/* Submitted Successfully */}
        <Modal show={successShow} onHide={handleSuccessClose}>
            <Modal.Header closeButton className='heading-bg-color'>
            <Modal.Title  as={() => {
                return <h5 style={{ marginBottom: "0px" }}>Form Submitted Successfully</h5>;
            }} className='form-font'></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={gif} alt=""  style={{width:"100%"}}/>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default EditNotificationMessage