import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { useDispatch } from 'react-redux'
import { deletingNotificationFromServer } from '../slicers/NotificationsSlicer';

function NotificationMessage({notification}) {
    const dispatch = useDispatch();
    function deleteNotification(notification){
        dispatch(deletingNotificationFromServer(notification))
    }  
  return (
    <>
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
                    </Row>
            </div>:null
        }
        {
            notification.type === "remove" ? 
            <div style={{border:"1px solid grey "}} className='p-2 mb-2'>
                    <div className="close-notify d-flex justify-content-between mb-2" >
                        <h6 className='font-color text-decoration-underline'><i>Request to remove leave type</i></h6>
                        <ion-icon name="close-outline" className="btn-close"></ion-icon>
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
                    </Row>
            </div>:null
        }
    </>
  )
}

export default NotificationMessage