import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import SectionHeading from '../../components/SectionHeading'
import ButtonComponent from '../../components/ButtonComponent'
import LeaveTypeTable from '../../layouts/hr-layouts/LeaveTypeTable'
import RadioButton from '../../components/RadioButton'
import Form from 'react-bootstrap/Form';
import SelectComponent from '../../components/SelectComponent'
import { leaveName } from '../../javascript/leaveFormValidation'
import { useDispatch, useSelector } from 'react-redux'
import { getLeaveTypeFromServer } from '../../slicers/LeaveTypeSlicer';
import Modal from 'react-bootstrap/Modal'
import { getNotificationsFromServer, postingNotificationsToServer } from '../../slicers/NotificationsSlicer'
import gif from '../../assets/images/success.gif';
import NotificationMessage from '../../components/NotificationMessage'
import EditNotificationMessage from '../../components/EditNotificationMessage'

function LeaveTypeTablePage() {
    const dispatch = useDispatch();
    const {leaveTypeSet,error:errors} = useSelector(state=>state.leavetype);

    useEffect(()=>{
        dispatch(getLeaveTypeFromServer());
    },[dispatch]);



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
    // console.log(removeLeaveType)
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
            dispatch(postingNotificationsToServer({...leaveType,from:"hr",type:"add"}))
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

    function resetAdd(){
        setLeaveType({
            name:"",
            default:"",
            enabled:"",
            annual:"",
        })
    }

    function onChangeSelect(e){
        const {name,value} = e.target;
        setRemoveLeaveType(prev=>({
            ...prev,
            [name]:value
        }))
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
            dispatch(postingNotificationsToServer({...removeLeaveType,from:"hr",type:"remove"}))
            setRemoveLeaveType({
                leavetype:"",
                remove:""
            });
            handleRemoveClose();
            handleSuccessShow();
        }
    }

    function resetRemove(){
        setRemoveLeaveType({
            leavetype:"",
            remove:""
        });
    }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [removeShow, setRemoveShow] = useState(false);

  const handleRemoveClose = () => setRemoveShow(false);
  const handleRemoveShow = () => setRemoveShow(true);

  const [successShow, setSuccessShow] = useState(false);

  const handleSuccessClose = () => setSuccessShow(false);
  const handleSuccessShow = () => setSuccessShow(true);

    useEffect(()=>{
        dispatch(getNotificationsFromServer())
    },[dispatch]);

    const {notificationSet} = useSelector((state)=>state.notification)
    let nonotify = true;
    
  return (
    <section className="leave-type-table ps-3 ps-sm-4" id="leave">
        <Container fluid className='leave_type_container'>
            <SectionHeading title="Leave Type"/>

            <Container fluid className="add_leave_type container-fluid body-bg-color mx-0 rounded-3 pt-3 mb-5" style={{width:"100%"}}>
                <Container>
                    {/* leave type table */}
                    <LeaveTypeTable/>
                    <div className="add_remove d-flex justify-content-center mt-4 border-2 mb-3">
                        {/* add policy button modal */}
                        <ButtonComponent class_name='me-2'color="#3b3423" onClick={handleShow}>&#x2b;&nbsp;Add Policy</ButtonComponent>
                        {/* remove leave policy button */}
                        <ButtonComponent class_name='ms-2'color="#3b3423" onClick={handleRemoveShow}>&#xd7;&nbsp;Remove Policy</ButtonComponent>
                    </div>
                </Container>
            </Container>
        </Container>
        {notificationSet && notificationSet.length>0 && (
            <div className='mb-5 pb-4'>
                <SectionHeading title="Applied Requests" />
                {notificationSet.filter((notify) => notify.from === "hr").map((value, index) => (
                    <EditNotificationMessage key={index} notification={value}/>
                ))}
            </div>
        )}  
        {/* add policy modal */}
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
                <ButtonComponent type="reset" onClick={resetAdd}>reset</ButtonComponent>
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
                    <SelectComponent  id="leave_type" name="leavetype" options={leaveTypeSet} onChange={onChangeSelect}/>
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
                        <ButtonComponent type="reset" onClick={resetRemove}>reset</ButtonComponent>
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
    </section>
  )
}

export default LeaveTypeTablePage