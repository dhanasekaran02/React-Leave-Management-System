import { configureStore } from '@reduxjs/toolkit'
import leaveReducer from './slicers/LeaveSlicer'
import employeeReducer from './slicers/EmployeeSlicer'
import leaveType from './slicers/LeaveTypeSlicer'
import policies from './slicers/LeavePolicySlicer'
import notifications from './slicers/NotificationsSlicer'
import leaveHistorySlicer from './slicers/LeaveHistorySlicer'
import HolidayReducer from './slicers/HolidaySlicer'

const store =  configureStore({
    reducer: {
      leave:leaveReducer,
      employee:employeeReducer,
      leavetype:leaveType,
      policy:policies,
      notification:notifications,
      leavehistories:leaveHistorySlicer,
      holidays:HolidayReducer

    },
  })
  export default store;