import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import SectionHeading from '../../components/SectionHeading';
import Form from 'react-bootstrap/Form';
import {managers} from '../../components/utilities/selectOption';
import SelectComponent from '../../components/SelectComponent';
import FormInput from '../../components/FormInput';
import FormCheck from '../../components/FormCheck';
import ButtonComponent from '../../components/ButtonComponent';
import ButtonModal from '../../components/ButtonModal';
import gif from '../../assets/images/success.gif';
import { leaveTypeValid,startDate,endDate, managerValid,calculateDay, reasonToLeave, suggest } from '../../javascript/leaveFormValidation';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveTypeFromServer } from '../../slicers/LeaveTypeSlicer';
import { postLeaveToServer } from '../../slicers/LeaveSlicer';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function ApplyLeave() {
    const dispatch = useDispatch();
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //getting logged user from the local storage
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    
    const empname = loggedUser.firstName.charAt(0).toUpperCase() + loggedUser.firstName.slice(1) + " " + loggedUser.lastName.charAt(0).toUpperCase();
    //creating extra details for the leave object
    const extra={
        empid:loggedUser.id,
        empname:empname,
        designation:loggedUser.designation,
        status:"pending",
        appliedDate:new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
    }

    
    //getting leave types from the server
    const {leaveTypeSet,error} = useSelector((state)=>state.leavetype);
    
    //leave type from json
    useEffect(()=>{
        dispatch(getLeaveTypeFromServer())
    },[dispatch])
    
    const [half_day,setHalfDay] = useState(false);

    const [errors,setErrors]=useState({})

    //leave form values state variables
    const [leave,setLeave] = useState({
        leaveType:"",
        startDate:"",
        endDate:"",
        noOfDays:"",
        manager:"",
        suggestion:"",
        reason:""
    });

    //Checking for leavetype
    const onChangeLeaveType= (e)=>{
        const {name,value} = e.target;
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
          }));
        // setSelectLeaveType(value);

        // console.log("leave type after setting :",leave.leavetype)
        // console.log("leave type after setting separately :",selectleavetype)
        const error = {};
        if(leaveTypeValid(value)){
            error.leavetype = null;
            setErrors({...errors,...error});
            return true;
        }
        else{
            error.leavetype = 'Select an leave type';
            setErrors({...errors,...error});
            return false
        }
    }

    //checking for start date
    const onChangeStartDate= (e)=>{
        const {name,value} = e.target;
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
        }));
        const error = {};
        const date = startDate(value)
        if(!date[0]){
            error.sdate=date[1]
            setErrors({...errors,...error});
            return false;
        }
        else{
            error.sdate=null
            setErrors({...errors,...error});
            calculateDays(leave.startDate,leave.endDate);    
            return true;
        }
    }

    //checking for end date
    const onChangeEndDate= (e)=>{
        const {name,value} = e.target;
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
        }));
        const error = {};
        const date = endDate(value)
        if(!date[0]){
            error.edate=date[1]
            setErrors({...errors,...error});
            return false;
        }
        else{
            error.edate = null
            setErrors({...errors,...error});
            calculateDays();
            return true;
        }
    }

    function calculateDays(){
        const error = {};
        const date = calculateDay();
        if(!date[0]){
            error.edate = date[1];
            setErrors({...errors,...error});
            return false;
        }
        else{
            if(date[1] === 1){
                setHalfDay(true);
                setLeave(prevLeave => ({
                    ...prevLeave,
                    noOfDays: date[1]
                }));
                setErrors({...errors,...error})
                return true;
            }
            else{
                setHalfDay(false);
                setLeave(prevLeave => ({
                    ...prevLeave,
                    noOfDays: date[1]
                }));
                setErrors({...errors,...error})
                return true;
            }
        }
    }

    //checking for manager
    const onChangeManager= (e)=>{
        const {name,value} = e.target;
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
          }));
        const error = {};
        if(managerValid(value)){
            error.manager = null;
            setErrors({...error});
            return true;
        }
        else{
            error.manager='Select a manager';
            setErrors({...error});
            return false;
        }
    }

    //checking for suggestion
    const onChangeSuggestion= (e)=>{
        const {name,value} = e.target;
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
          }));
        const error = {};
        if(suggest(value)){
            error.suggest = null;
            setErrors({...error});
            return true;
        }
        else{
            error.suggest='Suggest a person';
            setErrors({...error});
            return false;
        }
    }

    //checking for reason
    const onChangeReason= (e)=>{
        const {name,value} = e.target;
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
          }));
        const error = {};
        if(reasonToLeave(value)){
            error.reason = null;
            setErrors({...error});
            return true;
        }
        else{
            error.reason='Enter the reason';
            setErrors({...error});
            return false;
        }
    }


    // on submit validation
    function onSubmitValidation(e){
        e.preventDefault();
        const leavetype = leaveTypeValid(leave.leaveType)
        const sdate = startDate(leave.startDate);
        const edate = endDate(leave.endDate);
        const date = calculateDay();
        const manager = managerValid(leave.manager);
        const reason = reasonToLeave(leave.reason);

        const errorlist = {};
        if(!leavetype[0]){
            errorlist.leavetype = leavetype[1];
        }
        if(!sdate[0]){
            errorlist.sdate = sdate[1];
        }
        if(!edate[0]){
            errorlist.edate = edate[1];
        }
        if(!date[0]){
            errorlist.edate = date[1];
        }
        if(!manager[0]){
            errorlist.manager = manager[1];
        }
        if(!reason[0]){
            errorlist.reason = reason[1];
        }
        if(Object.keys(errorlist).length >0)
        {   
            console.log(errorlist)
            setErrors({...error,...errorlist});
        }
        else{
            setErrors({...error,...errorlist})
            dispatch(postLeaveToServer({...leave,...extra}))
            setLeave({
                leaveType:"",
                startDate:"",
                endDate:"",
                noOfDays:"",
                manager:"",
                suggestion:"",
                reason:""
            })
            handleShow();

        }
    }

    function reset(){
        setLeave({
            leaveType:"",
            startDate:"",
            endDate:"",
            noOfDays:"",
            manager:"",
            suggestion:"",
            reason:""
        })
    }


   

    //styles
    const style={
        border:"1px solid grey",
        height:"35px"
    }

  return (
    <div className="apply_leave_form_section pt-0 ms-0 ps-xl-3  ps-lg-4 w-100 h-500" id="applyleave">
        {/* form container */}
        <Container fluid className='main_section_container '>
            {/* <!-- Form heading --> */}
            <SectionHeading title="Apply Leave"/>

            {/* Form contents container */}
            <Container fluid className='apply_leave_form p-lg-5 p-3 body-bg-color m-0 ms-sm-0 ms-md-0 ms-lg-0 d-flex align-items-center justify-content-center h-100'>
                <Form className="leave-form p-4 overflow-y-scroll bg-white" onSubmit={onSubmitValidation} style={{height:"500px"}} controlId="leave-apply-form">
                    {/* Leave type */}
                    <div className='mb-3'>
                        <label htmlFor="leavetype">Leave Type <sup className='text-danger fw-bolder fs-6'>*</sup></label>
                        <SelectComponent label="Leave Type" id="leave_type" name="leaveType" options={leaveTypeSet} onChange={onChangeLeaveType}/>
                        {errors.leavetype && <small>{errors.leavetype}</small>}
                    </div>
                    
                    {/* Start date */}
                    <FormInput  type="date" name="startDate" label="Start Date"placeholder="select date"id="sdate" important="true" value={leave.startDate} onChange={onChangeStartDate} />
                    {errors.sdate && <small>{errors.sdate}</small>}

                    {/* End date */}
                    <FormInput value={leave.endDate}  type="date" name="endDate" label="End Date"placeholder="select date" id="sdate" important="true" onChange={onChangeEndDate}/>
                    {errors.edate && <small>{errors.edate}</small>}

                    {/* <!-- No of days --> */}
                    <div className="mb-3 mt-3">
                        {/* <!-- no of days should be calculated automatically --> */}
                        <label for="no_of_days" className="form-label form-font" id="noOfDays">No. of. Days</label>
                        <p className="w-100 rounded-3 p-1 ps-3 mb-0" id='no-of-days' style={style}>{leave.noOfDays}</p>
                    </div>

                    {/* Half day */}
                    <div  id="oneday" className = {half_day?"d-flex mb-3":"d-none mb-3"}>
                        {/* forenoon */}
                        <FormCheck type="radio" label="Forenoon" id="forenoon" name="time" checked={true}/> 
                        <FormCheck type="radio" label="Afternoon" id="afternoon" name="time"/> 
                    </div>

                    {/* Managers */}
                    <div className='mb-3'>
                        <label htmlFor="manager">Reporting Manager<sup className='text-danger fw-bolder fs-6'>*</sup></label>
                        <SelectComponent label id="manager" name="manager" options={managers} onChange={onChangeManager}/>
                        {errors.manager && <small>{errors.manager}</small>}
                    </div>

                    {/* Suggestion */}
                    <FormInput  type="text" name="suggestion" label="Suggestion" value={leave.suggestion}  placeholder="Suggest"id="suggestion" onChange={onChangeSuggestion}/>
                    {errors.suggest && <small>{errors.suggest}</small>}

                    {/* Reason */}
                    <div class="mb-3 mt-3">
                        <label for="reason" class="form-label form-font">Reason <sup class="text-danger fw-bolder fs-6">*</sup></label>
                        <textarea name="reason" value={leave.reason}  class=" form-control" id="reason" cols="30" rows="3" style={{resize: "none"}} onChange={onChangeReason}></textarea>
                        {errors.reason && <small>{errors.reason}</small>}
                    </div>
                    {/* buttons */}
                    <div className='buttons d-flex justify-content-center'>
                        <Button type="reset" style={{backgroundColor:"#473610"}} className='btn font-bg-color text-white px-4 mx-3' onClick={reset}>Reset</Button>
                        <ButtonComponent type="submit" class_name='btn font-bg-color text-white px-4 mx-3' color="#473610">Apply</ButtonComponent>
                    </div>
                </Form>
            </Container>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='heading-bg-color'>
            <Modal.Title  as={() => {
                return <h5 style={{ marginBottom: "0px" }}>Form Submitted Successfully</h5>;
            }} className='form-font'></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={gif} alt=""  style={{width:"100%"}}/>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default ApplyLeave