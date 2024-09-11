import React, { useState } from 'react'
import AddNewHolidayTable from '../../layouts/admin-layouts/AddNewHolidayTable'
import SectionHeading from '../../components/SectionHeading'
import ButtonComponent from '../../components/ButtonComponent'
import ButtonModal from '../../components/ButtonModal'
import FormInput from '../../components/FormInput'
import Form from 'react-bootstrap/Form'
import { holidayName,holidayDate,holidayDescription } from '../../javascript/leaveFormValidation'
import { useDispatch } from 'react-redux'
import { addHolidayToServer } from '../../slicers/HolidaySlicer'

function AddNewHoliday() {
    const btn = <ButtonComponent>+&nbsp;&nbsp;Add Holiday</ButtonComponent>
    const [holiday,setHoliday] = useState({
        holidayname:"",
        date:"",
        description:""
    })

    const dispatch = useDispatch();
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
            dispatch(addHolidayToServer(holiday));
            setHoliday({
                holidayname:"",
                date:"",
                description:""
            })
        }
    }

    function reset(){
        setHoliday({
            holidayname:"",
            date:"",
            description:""
        })
    }
  return (
    <div className="add_employee_container">
            {/* <!-- heading --> */}
            <SectionHeading title="Add Holiday"/>
            <div className="employee_table">
                {/* <!-- container --> */}
                <div className="emp_table mb-3">
                    {/* <!-- searchbar and button --> */}
                    <div className="search_button container d-flex justify-content-end align-items-center ms-5 mb-2">
                        <div className="add_emp_btn mb-2 me-5">
                            <ButtonModal button={btn} title="Add Holiday" color="black" footer={false}>
                                <Form>
                                    <FormInput type="text" name="holidayname" label="Holiday Name" important="true" value={holiday.holidayname} onChange={onChangeHolidayName}/>
                                    {error.name && <small>{error.name}</small>}
                                    <FormInput type="date" name="date" label="Holiday Date" important="true" value={holiday.date} onChange={onChangeHolidayDate}/>
                                    {error.date && <small>{error.date}</small>}
                                    <FormInput type="text" name="description" label="One Line Description" important="true" value={holiday.description} onChange={onChangeDescription}/>
                                    {error.description && <small>{error.description}</small>}
                                    <div className='d-flex justify-content-end column-gap-3 mt-4'>
                                        <ButtonComponent type="reset" onClick={reset}>reset</ButtonComponent>
                                        <ButtonComponent type="submit" onClick={onSubmitValidation}>Submit</ButtonComponent>
                                    </div>
                                </Form>
                            </ButtonModal>
                        </div>
                    </div>
                    {/* <!-- table --> */}
                    <div className="container table-container table-responsive">
                        <AddNewHolidayTable/>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AddNewHoliday