import React, { useEffect } from 'react'
import {MDBDataTable} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLeaveTypeFromServer, getLeaveTypeFromServer, setSelectedLeave, updateLeaveTypeToServer } from '../../slicers/LeaveTypeSlicer';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { leaveName } from '../../javascript/leaveFormValidation'
import Form from 'react-bootstrap/Form'
import ButtonComponent from '../../components/ButtonComponent';
import RadioButton from '../../components/RadioButton';
import { updateLeaveToServer } from '../../slicers/LeaveSlicer';

function NewleavenameTable() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (leavetype) => (
        setShow(true),
        dispatch(setSelectedLeave(leavetype))
    )

    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => (
        setDeleteShow(false)
    );
    const handleDeleteShow = (leavetype) => (
        setDeleteShow(true),
        setLeave({
            ...leavetype
        })
    )

    const [leave,setLeave] = useState({});
    
    //leave state
    const [leaveType,setLeaveType] = useState({
        name:"",
        default:"",
        enabled:"",
        annual:"",
        days:"",
        color:"#000000"
    })
    const [error,setError]=useState({})

    //name validation
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

    //radio validation
    function onChangeRadio(e){
        const {name,value} = e.target;
        console.log(name,value)
        setLeaveType({
            ...leaveType,
            [name]:value
        })
    }

    //days validation
    function onChangeDays(e){
        const {name,value}=e.target;
        setLeaveType(prev=>({
            ...prev,
            [name]:value
        }))

        const error = {};
        if(/^[0-9]+$/.test(value)){
            error.days = null;
            setError({...error,...error});
            return true; 
        }
        else{
            error.days ="Numbers only";
            setError({...error,...error});
            return false;
        }
    }

    //color validation
    function onChangeColor(e){
        const {name,value} = e.target;
        setLeaveType({
            ...leaveType,
            [name]:value
        });
        const error = {}
        if(value === "#000000"){
            error.leavecolor = "Select a color";
            setError({...error,...error})
        }
        else{
            error.leavecolor = null;
            setError({...error,...error});
        }
    }

    //submit validation
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
        if(leaveType.days == ""){
            error.days = "Enter the no of days"
        }
        if(leaveType.color == "#000000"){
            error.leavecolor = "Select a color";
        }
        if(Object.keys(error).length >0){
            
            setError({...error,...error});
        }
        else{
            console.log("form has been submitted");
            const id = selectedLeave.id;
            dispatch(updateLeaveTypeToServer({...leaveType,id}));
            setLeaveType({
                name:"",
                default:"",
                enabled:"",
                annual:"",
                days:"",
                leavecolor:"#000000"
            })
            handleClose();
        }
    }
    
    //delete leavetype
    function deleteLeaveType(){
        dispatch(deleteLeaveTypeFromServer(leave));
        handleDeleteClose();
    }
    //color input
    const color = <input type="color" value="#e251e5" disabled/>
    const dispatch = useDispatch();
    const {leaveTypeSet} = useSelector((state)=>state.leavetype);
    const {selectedLeave} = useSelector((state)=>state.leavetype);
    //dispatching leave type
    useEffect(()=>{
        dispatch(getLeaveTypeFromServer());
        setLeaveType({
            name:selectedLeave.name,
            default:selectedLeave.default,
            enabled:selectedLeave.enabled,
            annual:selectedLeave.annual,
            days:selectedLeave.days,
            color:selectedLeave.color
        })
    },[dispatch,selectedLeave]);

    //mapping rows to add the color, edit and delete iconss]
    const row = leaveTypeSet.map((leavetype)=>{
        //action buttons for edit and delete
        const action = <div class="edit_icon">
                <ion-icon name="create-outline" class="employee-edit-button" onClick={()=>handleShow(leavetype)}></ion-icon>
                <ion-icon name="trash-outline" class="delete" onClick={()=>handleDeleteShow(leavetype)}></ion-icon>
            </div>
        const color = <input type="color" value={leavetype.color} disabled/>
        const days = leavetype.days+" days"
        return({...leavetype,days,color,action})
    })

    //data
    const data = {
        columns: [
            {
                label: 'Leave Name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Leave Enabled',
                field: 'enabled',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Set as Default',
                field: 'default',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Deduct for Annual Leave',
                field: 'annual',
                sort: 'asc',
                width: 100
            },
            {
                label:'No.of.days',
                field:'days',
                sort:'asc',
                width:100
            },
            {
                label: 'Color',
                field: 'color',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 100
            }
        ],
        rows: row
    };
  return (
        <>
            <MDBDataTable
            responsive
            bordered
            centered
            hover
            data={data}
            />

            {/* edit modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='heading-bg-color'>
                <Modal.Title as={() => {
                        return <p style={{ marginBottom: "0px" }}>Edit LeaveType</p>;
                    }} className='form-font'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Leave type name */}
                        <Form.Group className=" mb-3">
                            <Form.Label>Leave Type<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                            <Form.Control type="text" placeholder="Enter leave type name" name="name" className="border-secondary" value={leaveType.name} onChange={onChangeName}/>
                            {error.leavename && <small>{error.leavename}</small>}
                        </Form.Group>

                        {/* set leave type enabled */}
                        <div className="mb-3 mt-2">
                            <Form.Label className='fw-semibold'>Set as enabled leave<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                            <div className='p-2 ps-4 radio-border rounded-3'>
                                <RadioButton label="yes" name="enabled"value="yes" checked={leaveType.enabled =='yes'} onChange={onChangeRadio}/>
                                <RadioButton label="no" name="enabled" value="no" checked={leaveType.enabled=='no'} onChange={onChangeRadio}/>
                            </div>
                            {error.enabled && <small>{error.enabled}</small>}
                        </div>
                        
                        {/* Default leave type */}
                        <div className="mb-3 mt-2">
                            <Form.Label className='fw-semibold'>Set as default type<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                            <div className='p-2 ps-4 radio-border rounded-3'>
                                <RadioButton label="yes" name="default" value="yes" checked={leaveType.default=='yes'} onChange={onChangeRadio}/>
                                <RadioButton label="no" name="default" value="no" checked={leaveType.default=='no'} onChange={onChangeRadio}/>
                            </div>
                            {error.default && <small>{error.default}</small>}
                        </div>

                        {/* detect from annual leave */}
                        <div className="mb-3 mt-2">
                            <Form.Label className='fw-semibold'>Detect From Annual Leave<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                            <div className='p-2 ps-4 radio-border rounded-3'>
                                <RadioButton label="yes" name="annual" value="yes" checked={leaveType.annual=='yes'} onChange={onChangeRadio}/>
                                <RadioButton label="no" name="annual" value="no" checked={leaveType.annual=='no'} onChange={onChangeRadio}/>
                            </div>
                            {error.annual && <small>{error.annual}</small>}
                        </div>

                        {/* Leave type name */}
                        <Form.Group className=" mb-3">
                            <Form.Label>No of Days<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                            <Form.Control type="text" placeholder="Enter No of Days" name="days" className="border-secondary" value={leaveType.days} onChange={onChangeDays}/>
                            {error.days && <small>{error.days}</small>}
                        </Form.Group>

                        {/* input leave color */}
                        <div className="mt-2 d-flex align-items-center">
                            <Form.Label className='fw-semibold'>Leave Color: <sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                            <div className='d-block'>
                                <input type="color" name="color" value={leaveType.color} id="input-color" onChange={onChangeColor} />
                            </div>
                        </div>
                            {error.leavecolor && <small>{error.leavecolor}</small>}

                        <div className='d-flex justify-content-end column-gap-3'>
                            <ButtonComponent type="reset" >reset</ButtonComponent>
                            <ButtonComponent type="submit" onClick={onSubmitValidation}>Submit</ButtonComponent>
                        </div>
                    </Form>
                </Modal.Body>
                
            </Modal>

            {/* delete modal */}
            <Modal show={deleteShow} onHide={handleDeleteClose}>
                <Modal.Header closeButton className='heading-bg-color'>
                <Modal.Title as={() => {
                        return <p style={{ marginBottom: "0px" }}>Edit LeaveType</p>;
                    }} className='form-font'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='d-flex justify-content-center text-secondary'>Are you sure to delete the LeaveType</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-end column-gap-3'>
                        <ButtonComponent type="reset" onClick={handleDeleteClose}>Cancel</ButtonComponent>
                        <ButtonComponent type="submit" color="red" onClick={deleteLeaveType}>Delete</ButtonComponent>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
  );
}

export default NewleavenameTable