import React from 'react'
import NavCard from '../../components/admin/NavCard'
import addEmploye from '../../assets/images/add-employee.png'
import addnewleave from '../../assets/images/add-leav.png'
import addholiday from '../../assets/images/holiday.jpg'
import backup from '../../assets/images/backup.jpg'
function AdminDashboard() {
  return (
    <div className="admin">
        <div className="welcome_admin">
            <div className='admin_nav d-flex flex-column justify-content-evenly '>
                <div className="welcome_admin_heading">
                    <h2 className="font-color fw-semibold">Welcome Back Admin, Have a Nice Day</h2>
                </div>
                <div className='admin_navigation flex-wrap'>
                    {/* add employee */}
                    <NavCard title="Add Employee" path="addemployee">
                        <img src={addEmploye} alt="addEmployee" width="100" height="100"/>
                    </NavCard>

                    {/* add new leave type */}
                    <NavCard title="Add New Leave" path="addleave">
                        <img src={addnewleave} alt="addnewleave" width="100" height="100"/>
                    </NavCard>

                    {/* add new holiday */}
                    <NavCard title="Add Holiday" path="addholiday">
                        <img src={addholiday} alt="addholiday" width="100" height="100"/>
                    </NavCard>

                    {/* add backup */}
                    <NavCard title="Backup" path="backup">
                        <img src={backup} alt="backup" width="100" height="100" />
                    </NavCard>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard