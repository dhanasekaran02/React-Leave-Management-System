import React, { useEffect, useState } from 'react'
import {MDBDataTable} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHolidayFromServer, getHolidaysFromServer, setSelectedHoliday, updateHolidayToServer } from '../../slicers/HolidaySlicer';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonComponent from '../../components/ButtonComponent';
import { holidayName,holidayDate,holidayDescription } from '../../javascript/leaveFormValidation'
import FormInput from '../../components/FormInput';


function AddNewHolidayTable() {

    const [show,setShow]= useState(false);
    const handleShow = (holiday) => (
        setShow(true),
        dispatch(setSelectedHoliday(holiday))
    );
    const handleClose = () => setShow(false);

    const [holiday,setHoliday] = useState({
        holidayname:"",
        date:"",
        description:""
    })

    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => (
        setDeleteShow(false)
    );
    const handleDeleteShow = (holiday) => (
        setDeleteShow(true),
        setHolidayDelete({
            ...holiday
        })
    )

    //delete leavetype
    function deleteHolidayType(){
        dispatch(deleteHolidayFromServer(holidayDelete));
        handleDeleteClose();
    }

    const [holidayDelete,setHolidayDelete] = useState({});


    const dispatch = useDispatch();
    //getting holidays from the server
    const {holidayList} =useSelector((state)=>state.holidays)
    const {selectedHoliday} = useSelector((state)=>state.holidays)
    useEffect(()=>{
        dispatch(getHolidaysFromServer());
        setHoliday({
            holidayname:selectedHoliday.holidayname,
            date:selectedHoliday.date,
            description:selectedHoliday.description
        })
    },[dispatch,selectedHoliday]);


    const rows = holidayList.map((holiday)=>{
        const date = holiday.date.split('-').reverse().join('-');
        const holidayname = holiday.holidayname.charAt(0).toUpperCase() + holiday.holidayname.slice(1);
        const action = <div class="edit_icon">
                            <ion-icon name="create-outline" class="employee-edit-button" onClick={()=>handleShow(holiday)}></ion-icon>
                            <ion-icon name="trash-outline" class="delete" onClick={()=>handleDeleteShow(holiday)}></ion-icon>
                        </div>
        return ({...holiday,holidayname,date,action});
    })

    

    const [error,setError] = useState({});

    //onchange holiday name validation
    function onChangeHolidayName(e){
        const {name,value} = e.target;
        setHoliday({
            ...holiday,
            [name]:value
        })
        const error = {};
        const state = holidayName(value);
        if(state[0]){
            error.name = null;
            setError({...error,...error});
            return true;
        }
        else{
            error.name = state[1];
            setError({...error,...error});
            return false
        }
    }

    //onchange holiday date validation
    function onChangeHolidayDate(e){
        const {name,value} = e.target;
        setHoliday({
            ...holiday,
            [name]:value
        })
        const error = {};
        const state = holidayDate(value);
        if(state[0]){
            error.date = null;
            setError({...error,...error});
            return true;
        }
        else{
            error.date = state[1];
            setError({...error,...error});
            return false
        }
    }

    //onchange holiday description validation
    function onChangeDescription(e){
        const {name,value} = e.target;
        setHoliday({
            ...holiday,
            [name]:value
        })
        const error = {};
        const state = holidayDescription(value);
        if(state[0]){
            error.description = null;
            setError({...error,...error});
            return true;
        }
        else{
            error.description = state[1];
            setError({...error,...error});
            return false
        }
    }

    //on submit validation
    function onSubmitValidation(e){
        e.preventDefault();

        const name = holidayName(holiday.holidayname);
        const date = holidayDate(holiday.date);
        const desc = holidayDescription(holiday.description);
        const error={}
        if(!name[0]){
            error.name = name[1];
        }
        if(!date[0]){
            error.date = date[1];
        }
        if(!desc[0]){
            error.description = desc[1];
        }
        if(Object.keys(error).length>0){
            setError({...error});
        }
        else{
            console.log("form has been submitted successfully");
            setError({...error,...error});
            const id = selectedHoliday.id;
            dispatch(updateHolidayToServer({...holiday,id}));
            handleClose();
            setHoliday({
                holidayname:"",
                date:"",
                description:""
            })
        }
    }


    const data = {
        columns: [
            {
                label: 'Holiday Name',
                field: 'holidayname',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Calendar Date',
                field: 'date',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 100
            }
        ],
        rows:rows
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
                        return <p style={{ marginBottom: "0px" }}>Edit holiday</p>;
                    }} className='form-font'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormInput type="text" name="holidayname" label="Holiday Name" important="true" className="mt-0" value={holiday.holidayname} onChange={onChangeHolidayName}/>
                        {error.name && <small>{error.name}</small>}
                        <FormInput type="date" name="date" label="Holiday Date" important="true" value={holiday.date} onChange={onChangeHolidayDate}/>
                        {error.date && <small>{error.date}</small>}
                        <FormInput type="text" name="description" label="One Line Description" important="true" value={holiday.description} onChange={onChangeDescription}/>
                        {error.description && <small>{error.description}</small>}
                        <div className='d-flex justify-content-end column-gap-3 mt-4'>
                            <ButtonComponent type="reset">reset</ButtonComponent>
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
                        <ButtonComponent type="submit" color="red" onClick={deleteHolidayType}>Delete</ButtonComponent>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
        
  );
}

export default AddNewHolidayTable