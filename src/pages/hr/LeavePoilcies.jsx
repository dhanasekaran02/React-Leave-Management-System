import React, { useEffect, useState } from 'react'
import LeavePolicyComponent from '../../components/LeavePolicyComponent'
import ButtonComponent from '../../components/ButtonComponent'
import FormInput from '../../components/FormInput'
import Form from 'react-bootstrap/Form'
import {policyName, policyDate, policyDescription} from '../../javascript/policyValidation'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getPolicyFromServer, postPolicyToServer } from '../../slicers/LeavePolicySlicer'
import HrAddPolicyComponent from '../../layouts/hr-layouts/HrAddPolicyComponent'

function LeavePolicies() {

    const [policies,setPolicies] = useState({
        policyName:"",
        policyDate:"",
        description:""
    })
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPolicyFromServer());
    },[dispatch]);

    const {policySet} = useSelector((state)=>state.policy);

    const [error,setError] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => (
        setShow(false),
        reset()
    );
    const handleShow = () => (
        setShow(true)
    )

    //checking policy name
    function onChangePolicyName(e){
        const {name,value} = e.target;
        setPolicies({
            ...policies,
            [name]:value
        })
        const result = policyName(value);
        const error = {}
        if(!result[0]){
            error.pname = result[1];
            setError({...error,...error});
            return false;
        }
        else{
            error.pname = null;
            setError({...error,...error});
            return true;
        }
    }

    //checking policy date
    function onChangePolicyDate(e){
        const {name,value} = e.target;
        setPolicies({
            ...policies,
            [name]:value
        })
        const result = policyDate(value);
        const error = {}
        if(!result[0]){
            error.pdate = result[1];
            setError({...error,...error});
            return false;
        }
        else{
            error.pdate = null;
            setError({...error,...error});
            return true;
        }
    }

    //checking policy description
    function onChangePolicyDescription(e){
        const {name,value} = e.target;
        setPolicies({
            ...policies,
            [name]:value
        })
        const result = policyDescription(value);
        const error = {}
        if(!result[0]){
            error.pdescription = result[1];
            setError({...error,...error});
            return false;
        }
        else{
            error.pdescription = null;
            setError({...error,...error});
            return true;
        }
    }

    function onSubmitValidation(){
        const name = policyName(policies.policyName);
        const date = policyDate(policies.policyDate);
        const desc = policyDescription(policies.description);

        const error = {};

        if(!name[0]){
            error.pname = name[1];
        }
        if(!date[0]){
            error.pdate = date[1];
        }
        if(!desc[0]){
            error.pdescription = desc[1];
        }

        if(Object.keys(error).length > 0){
            setError({...error,...error});
        }
        else{
            setError({...error,...error});
            dispatch(postPolicyToServer(policies));
            setPolicies({
                policyName:"",
                policyDate:"",
                description:""
            })
            handleClose();
        }
    }
    let nopolicy = true;

    function reset(){
        setPolicies({
            policyName:"",
            policyDate:"",
            description:""
        })
    }
  return (
    <>
        <LeavePolicyComponent>
            {
                policySet && policySet.map((policy,index)=>{
                    nopolicy = false;
                    return(
                        <HrAddPolicyComponent policy={policy}/>
                    );
                })
            }
            {nopolicy?<h3 className='d-flex justify-content-center text-secondary'>No Policies</h3>:null}
        </LeavePolicyComponent>
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <ButtonComponent onClick={handleShow}>+&nbsp;Add Policy</ButtonComponent>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{backgroundColor:"#eece8b"}} closeButton>
                <Modal.Title as={() => {
                    return <p style={{ marginBottom: "0px" }}><b>Add Policy</b></p>;
                }} className='form-font' ></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormInput type="text" label="Policy Name" name="policyName" className="mt-0" value={policies.policyName} important='true' onChange={onChangePolicyName}/>
                    {error.pname && <small>{error.pname}</small>}
                    <FormInput type="date" label="Policy Date" name="policyDate" important='true' value={policies.policyDate} onChange={onChangePolicyDate}/>
                    {error.pdate && <small>{error.pdate}</small>}
                    <div className="mb-3 mt-3">
                        <label for="Policy_description" className="form-label">Description<sup className="text-danger" style={{fontSize:"16px"}}>*</sup></label>
                        <textarea name="description" id="Policy_description_edit" value={policies.description} cols="30" rows="5" class="form-control" style={{resize:"none",border:"1px solid"}} onChange={onChangePolicyDescription}></textarea>
                        <small class="policy-edit"></small>
                        {error.pdescription && <small>{error.pdescription}</small>}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonComponent type="button"onClick={handleClose}>cancel</ButtonComponent>
                <ButtonComponent type="button" onClick={onSubmitValidation}>Add</ButtonComponent>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default LeavePolicies