import React, {useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonComponent from '../components/ButtonComponent';
import ButtonModal from '../components/ButtonModal';
import gif from '../assets/images/success.gif';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import FormInput from './FormInput';
import SelectComponent from './SelectComponent';
import FormCheck from './FormCheck';
import { managers } from './utilities/selectOption';
import { deleteLeaveFromServer, setSelectedLeave,updateLeaveToServer } from '../slicers/LeaveSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveTypeFromServer } from '../slicers/LeaveTypeSlicer';
import { leaveTypeValid,startDate,endDate, managerValid,calculateDay, reasonToLeave, suggest } from '../javascript/leaveFormValidation';
import { departmentHead } from '../javascript/addEmployeeValidation';


function AppliedLeaveStatus({user,className,keys}) {
    //delete modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (user) => (
        setShow(true),
        editLeave(user)
    );

    //delete confirm function
    const confirmDelete = ()=>(
        dispatch(deleteLeaveFromServer({...selectedLeave})),
        handleConfirmShow(),
        handleClose()
    )
    //confirm delete modal
    const [confirmShow, setConfirmShow] = useState(false);

    const handleConfirmClose = () => setConfirmShow(false);
    const handleConfirmShow = () => setConfirmShow(true);

    const dispatch = useDispatch();
    function editLeave(user){
        dispatch(setSelectedLeave(user));
    }
    
    const {leaveTypeSet,error} = useSelector((state)=>state.leavetype);
    const {selectedLeave} = useSelector((state=> state.leave))
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

    // use effect function to getting leave type and setting edit leave option
    useEffect(()=>{
        dispatch(getLeaveTypeFromServer())
        if(Object.keys(selectedLeave).length >0){
            setLeave({
                leaveType:selectedLeave.leaveType,
                startDate:selectedLeave.startDate,
                endDate:selectedLeave.endDate,
                noOfDays:selectedLeave.noOfDays,
                manager:selectedLeave.manager,
                suggestion:selectedLeave.suggestion,
                reason:selectedLeave.reason
            })
        }
    },[dispatch,selectedLeave])

    // useEffect(()=>{
    //     
    // },[selectedLeave])
    const [half_day,setHalfDay] = useState(false);
    const [errors,setErrors]=useState({})

    //Checking for leavetype
    const onChangeLeaveType= (e)=>{
        const {name,value} = e.target;
        console.log("Leave type has been changed");
        console.log(name,value)
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
          }));
        console.log(leave.leaveType);
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
        console.log("start date has been changed");
        const {name,value} = e.target;
        console.log(name,value)
        setLeave(prevLeave => ({
            ...prevLeave,
            [name]: value
        }));
        console.log("Leave has setted: ",leave.startDate)
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
          console.log("Setted manager: ",leave.manager)
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
        console.log("The suggestion: ",leave.suggestion)
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
          console.log(leave.reason)
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
            setErrors({...error,...errorlist});
            dispatch(updateLeaveToServer({...selectedLeave,...leave}));
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
    }

    const edit = <ButtonComponent type="button" class_name='btn font-bg-color text-white px-4 mx-3' color="#473610" onClick={editLeave(user)}>Edit</ButtonComponent>
    let save = <ButtonComponent type="submit" class_name='btn font-bg-color text-white px-4 mx-3' color="#473610" onClick={onSubmitValidation}>Save</ButtonComponent>
    let state = user.status.toLowerCase();
    let style={
        marginLeft:"39px",
        marginRight:"8px"
    }
    let Status = user.status.charAt(0).toUpperCase() + user.status.slice(1);
    const sdate = new Date(user.startDate).toLocaleDateString('en-GB').replace(/\//g, '-')
    const edate = new Date(user.endDate).toLocaleDateString('en-GB').replace(/\//g, '-')
  return (
    <div className={className} key={keys}>
        <Row className="pending_leave row p-2 h-auto">
            <Col sm={7} className='left_content'>
                <p className="mb-3"><b className="days-color">Leave Type</b> <span className="mx-2">:</span> {user.leaveType}</p>
                <p className="mb-3"><b className="days-color">Start Date</b> <span className="ms-3 me-2">:</span> {sdate}</p>
                <p className="mb-3"><b className="days-color">Leave Type</b> <span className="mx-2">:</span> {edate}</p>
            </Col>
            <Col sm={5} className='right_content'>
            <p className="mb-3"><b className="days-color">Total Days</b> <span className="mx-2">:</span>{user.noOfDays}</p>
                {/* <!-- <p><b>Comments</b> <span>:</span> 12-01-23</p> --> */}
                <p className="mb-3"><b className="days-color">Status</b> <span style={style} >:</span> <span className={state}><b>{Status}</b></span></p>
            </Col>
        </Row>
        <div className="pending_leave_buttons d-flex justify-content-center mt-3">
            <ButtonComponent type="reset" class_name='btn font-bg-color text-white px-4 mx-3' color="red" id="cancel" onClick={()=>handleShow(user)}>Cancel</ButtonComponent>
            
            {/* edit modal */}
            <ButtonModal bgcolor="#eece8b" color="black" button={edit} title="Confirm to delete" footer={false}>
            <Form controlId="leave-edit-form">
                    {/* Leave type */}
                    <div className='mb-3'>
                        <label htmlFor="leavetype">Leave Type <sup className='text-danger fw-bolder fs-6'>*</sup></label>
                        <SelectComponent label="Leave Type" id="leave_type" name="leaveType" options={leaveTypeSet} setDefault={leave.leaveType} onChange={onChangeLeaveType}/>
                        {errors.leavetype && <small>{errors.leavetype}</small>}
                    </div>
                    
                    {/* Start date */}
                    <FormInput  type="date" name="startDate" label="Start Date"placeholder="select date" id="sdate" important="true" value={leave.startDate} onChange={onChangeStartDate} />
                    {errors.sdate && <small>{errors.sdate}</small>}

                    {/* End date */}
                    <FormInput value={leave.endDate}  type="date" name="endDate" label="End Date"placeholder="select date" id="sdate" important="true" onChange={onChangeEndDate}/>
                    {errors.edate && <small>{errors.edate}</small>}

                    {/* <!-- No of days --> */}
                    <div className="mb-3 mt-3">
                        {/* <!-- no of days should be calculated automatically --> */}
                        <label for="no_of_days" className="form-label form-font" id="noOfDays">No. of. Days</label>
                        <p className="w-100 rounded-3 p-1 ps-3 mb-0" id='no-of-days' style={{border:"1px solid grey",height:"35px"}}>{leave.noOfDays}</p>
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
                        <SelectComponent label id="manager" name="manager" options={managers} setDefault={leave.manager} onChange={onChangeManager}/>
                        {errors.manager && <small>{errors.manager}</small>}
                    </div>

                    {/* Suggestion */}
                    <FormInput  type="text" name="suggestion" label="Suggestion" value={leave.suggestion}  placeholder="Suggest"id="suggestion" onChange={onChangeSuggestion}/>
                    {errors.suggest && <small>{errors.suggest}</small>}

                    {/* Reason */}
                    <div class="mb-3 mt-3">
                        <label for="reason" class="form-label form-font">Reason <sup class="text-danger fw-bolder fs-6">*</sup></label>
                        <textarea name="reason" value={leave.reason}  class=" form-control" id="reason" cols="30" rows="3" style={{resize: "none",border:"1px solid grey"}} onChange={onChangeReason}></textarea>
                        {errors.reason && <small>{errors.reason}</small>}
                    </div>

                    {/* buttons */}
                    <div className='buttons d-flex justify-content-center'>
                        <ButtonComponent type="reset" class_name='btn font-bg-color text-white px-4 mx-3' color="#473610">Reset</ButtonComponent>

                        <ButtonModal bgcolor="#eece8b" color="black" button={save} title="Submitted Successfully" footer={false}>
                            <img src={gif} alt=""  style={{width:"100%"}}/>
                        </ButtonModal>
                        
                    </div>
                </Form>
            </ButtonModal>
        </div>
        <div>
            {
                user.error && <h2>{user.error}</h2>
            }
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{backgroundColor:"#eece8b"}}>
                <Modal.Title as={() => {
                    return <p style={{ marginBottom: "0px" }}><b>Confirm to delete</b></p>;
                }} className='form-font' ></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure to cancel the applied leave ??</h4>
            </Modal.Body>
            <Modal.Footer>
                <ButtonComponent type="button"onClick={handleClose}>Close</ButtonComponent>
                <ButtonComponent type="button" color="red" onClick={confirmDelete}>Cancel</ButtonComponent>
            </Modal.Footer>
        </Modal>

        {/* deleted successfully gif */}
        <Modal show={confirmShow} onHide={handleConfirmClose}>
                <Modal.Header style={{backgroundColor:"#eece8b"}}>
                    <Modal.Title as={() => {
                        return <p style={{ marginBottom: "0px" }}><b>Deleted Successfully</b></p>;
                    }} className='form-font' ></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={gif} alt="" style={{width:"100%"}}/>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonComponent type="button"onClick={handleConfirmClose}>Close</ButtonComponent>
                    <ButtonComponent type="button" onClick={handleConfirmClose}>Cancel</ButtonComponent>
                </Modal.Footer>
        </Modal>
    </div>
    
  )
}

export default AppliedLeaveStatus