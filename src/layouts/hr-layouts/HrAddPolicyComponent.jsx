import React,{useState,useEffect} from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ButtonComponent from '../../components/ButtonComponent'
import FormInput from '../../components/FormInput'
import Form from 'react-bootstrap/Form'
import {policyName, policyDate, policyDescription} from '../../javascript/policyValidation'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { deletePolicyFromServer, setSelectedPolicy, updatePolicyToServer } from '../../slicers/LeavePolicySlicer'
import gif from '../../assets/images/success.gif'

function HrAddPolicyComponent({policy}) {
  const [policies,setPolicies] = useState({
    policyName:"",
    policyDate:"",
    description:""
})
const dispatch = useDispatch();
const {selectedPolicy} = useSelector((state) => state.policy);

useEffect(()=>{
    if(Object.keys(selectedPolicy).length>0){
      setPolicies({
        policyName:selectedPolicy.policyName,
        policyDate:selectedPolicy.policyDate,
        description:selectedPolicy.description
      })
    }
},[dispatch,selectedPolicy]);



const [error,setError] = useState({});
// edit modal
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true)


//delete modal
const [showDelete, setShowDelete] = useState(false);
const handleDeleteClose = () => setShowDelete(false);
const handleDeleteShow = () => setShowDelete(true)

//delete confirm modal
const [deleteConfirm, setDeleteConfirm] = useState(false);
const handleConfirmClose = () => setDeleteConfirm(false);
const handleConfirmShow = () => setDeleteConfirm(true)

function editPolicy(policy){
  dispatch(setSelectedPolicy(policy))
  handleShow();
}

function deletePolicy(policy){
  console.log(policy)
  dispatch(deletePolicyFromServer(policy));
  handleDeleteClose();
  handleConfirmShow();
}


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
        const id = selectedPolicy.id;
        dispatch(updatePolicyToServer({...policies,id}));
        setPolicies({
            policyName:"",
            policyDate:"",
            description:""
        })
        handleClose();
    }
}
  return (
    <>
      <li>
          <span>{policy.policyName}</span>
          <Row className='policy-row'>
            <Col lg={9} sm={11} style={{width:"75%"}}>
              <div className='policy ms-4 mt-2'>
                {policy.description}
              </div>
            </Col>
            <Col lg={2} sm={11} className='edit_icon d-flex align-items-center justify-content-lg-end justify-content-center mt-3 mt-lg-0'>
              <ion-icon name="create-outline" class="policy-edit-button" onClick={()=>editPolicy(policy)}></ion-icon>
              <ion-icon name="trash-outline" class="delete" onClick={handleDeleteShow}></ion-icon>
            </Col>
          </Row>
          <hr />
      </li>
      {/* Edit modal */}
      <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{backgroundColor:"#eece8b"}} closeButton>
              <Modal.Title as={() => {
                  return <p style={{ marginBottom: "0px" }}><b>Edit Policy</b></p>;
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
              <ButtonComponent type="button" onClick={onSubmitValidation}>Save Changes</ButtonComponent>
          </Modal.Footer>
      </Modal>

      {/* Confirm Delete modal */}
      <Modal show={deleteConfirm} onHide={handleConfirmClose}>
          <Modal.Header style={{backgroundColor:"#eece8b"}} closeButton>
              <Modal.Title as={() => {
                  return <p style={{ marginBottom: "0px" }}><b>Confirm to Delete</b></p>;
              }} className='form-font' ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <img src={gif} alt="Deleted successfully" style={{width:"100%"}} />
          </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
          <Modal.Header style={{backgroundColor:"#eece8b"}} closeButton>
              <Modal.Title as={() => {
                  return <p style={{ marginBottom: "0px" }}><b>Confirm to Delete</b></p>;
              }} className='form-font' ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h4>Are you sure to delete the policy??</h4>
          </Modal.Body>
          <Modal.Footer>
              <ButtonComponent type="button"onClick={handleDeleteClose}>cancel</ButtonComponent>
              <ButtonComponent type="button" onClick={()=>deletePolicy(policy)}>Delete</ButtonComponent>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default HrAddPolicyComponent