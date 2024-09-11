import React, { useEffect } from 'react';
import Col from "react-bootstrap/esm/Col";
import Profile from './Profile';
import ButtonModal from './ButtonModal';
import NotificationMessage from './NotificationMessage';
import { useDispatch, useSelector } from 'react-redux';
import {getNotificationsFromServer } from '../slicers/NotificationsSlicer';


function NotificationBoxIcon(){
    //getting notifications from the server
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getNotificationsFromServer())
    },[dispatch]);

    

    const {notificationSet,error} = useSelector((state)=>state.notification)
    let nonotify = true;
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    return(
        <div className='input-group align-items-center d-sm-inline-block d-sm-flex d-none d-flex justify-content-end'>
            <div className="notification me-3 mt-1" role="button">
                <ButtonModal button={<ion-icon name="notifications-outline" style={{fontSize:"25px"}}></ion-icon>} title="Notifications" color="black" footer={false}>
                    {
                        notificationSet && notificationSet.filter((notify)=>notify.from === loggedUser.notification).map((value,index)=>{
                            nonotify = false;
                            return(
                                <NotificationMessage notification={value}/>
                            );
                        })
                    }
                    {
                        nonotify?<h5 className='d-flex justify-content-center text-secondary'>No Notifications found</h5>:null
                    }
                </ButtonModal>
            </div> 
            <div className="dots_menu me-3 mt-1">
                <ion-icon name="grid-outline" style={{fontSize:"25px"}}></ion-icon>
            </div>
        </div>
    );
}

function UserProfile({name,designation}) {
  return (
    <Col xl="4" lg="5" md="6" sm="7" className='profile d-flex justify-content-between'>
        <NotificationBoxIcon/>
        <Profile name={name} designation={designation}/>
    </Col>
  )
}

export default UserProfile