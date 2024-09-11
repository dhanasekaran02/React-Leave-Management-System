import React,{useState} from 'react'
import SectionHeading from '../../components/SectionHeading'
import ButtonComponent from '../../components/ButtonComponent'
import NewLeaveTypeTable from '../../layouts/admin-layouts/NewLeaveTypeTable'
import ButtonModal from '../../components/ButtonModal'
import RadioButton from '../../components/RadioButton'
import Form from 'react-bootstrap/Form';
import { leaveName } from '../../javascript/leaveFormValidation'
import { useDispatch } from 'react-redux'
import { addLeaveTypeToServer } from '../../slicers/LeaveTypeSlicer'

function NewLeaveType() { 
    const dispatch = useDispatch();
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
        console.log("color value",value)
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
            const days = leaveType.days;
            const name = leaveType.name[0].toUpperCase()+leaveType.name.slice(1)+" Leave";
            dispatch(addLeaveTypeToServer({...leaveType,days,name}));
            setLeaveType({
                name:"",
                default:"",
                enabled:"",
                annual:"",
                days:"",
                leavecolor:"#000000"
            })
        }
    }

    function reset(){
        setLeaveType({
            name:"",
            default:"",
            enabled:"",
            annual:"",
            days:"",
            leavecolor:"#000000"
        })
    }


    const btn = <ButtonComponent>+&nbsp;&nbsp;Add Leave</ButtonComponent>
  return (
    <div className="add_employee_container">
            {/* <!-- heading --> */}
            <SectionHeading title="Add New Leave"/>
            <div className="employee_table">
                {/* <!-- container --> */}
                <div className="emp_table mb-3">
                    {/* <!-- searchbar and button --> */}
                    <div className="search_button container d-flex justify-content-end align-items-center ms-5 mb-2">
                        <div className="add_emp_btn mb-2 me-5">
                            {/* Request to add leave button */}
                            <ButtonModal button={btn} title="Request to add leave" color="black" footer={false}>
                                <Form>
                                    {/* Leave type name */}
                                    <Form.Group className=" mb-3">
                                        <Form.Label>Leave Type<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                                        <Form.Control type="text" placeholder="Enter leave type name" name="name" className="border-secondary" value={leaveType.name} onChange={onChangeName}/>
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
                                        <Form.Label className='fw-semibold'>Set as default type<sup className='text-danger fw-bolder fs-6'>*</sup></Form.Label>
                                        <div className='p-2 ps-4 radio-border rounded-3'>
                                            <RadioButton label="yes" name="enabled"value="yes" checked={leaveType.enabled =='yes'} onChange={onChangeRadio}/>
                                            <RadioButton label="no" name="enabled" value="no" checked={leaveType.enabled=='no'} onChange={onChangeRadio}/>
                                        </div>
                                        {error.enabled && <small>{error.enabled}</small>}
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
                                        <ButtonComponent type="reset" onClick={reset}>reset</ButtonComponent>
                                        <ButtonComponent type="submit" onClick={onSubmitValidation}>Submit</ButtonComponent>
                                    </div>
                                </Form>
                            </ButtonModal>
                        </div>
                    </div>
                    {/* <!-- table --> */}
                    <div className="container table-container table-responsive">
                        <NewLeaveTypeTable/>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default NewLeaveType