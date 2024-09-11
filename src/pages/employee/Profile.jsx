import React from 'react'
import SectionHeading from '../../components/SectionHeading'
import avatar from "../../assets/images/avatar.png";
import ProfileForm from '../../layouts/ProfileForm';



function Profile() {
  return (
    <div className='main_profile_container'>
        <div className='profile_container'>
            <SectionHeading title="Profile"/>

            <div className='profile_details d-flex justify-content-center align-items-center p-3 p-lg-5'>
                <div className='inner_profile'>
                    <div className="profile_photo w-100">
                        <img src={avatar} alt="profile_photo" width="75" height="75" style={{borderRadius:"50%"}}/>
                        <button className="btn font-bg-color text-white ms-3" style={{backgroundColor:"#624f27",cursor:"pointer"}}><label for="upload">Upload <input type="file" id="upload" hidden/></label></button>
                    </div>

                    {/* Profile form */}
                    <ProfileForm/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile