import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState={
    employeeList:[],
    selectedEmployee:{},
    error:""
}

//getting employees from the server
export const getEmployeesFromServer = createAsyncThunk(
    "employee/getEmployeesFromServer",
    async(_,{rejectWithValues})=>{
        const response = await fetch("http://localhost:5000/employee");
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"No Employees found"})
        }
    }
)

//adding employees to the server
export const addEmployeeToServer = createAsyncThunk(
    "employee/addEmployeeToServer",
    async(employee,{rejectWithValues})=>{
        const id = ""+Math.random()*100;
        employee = {...employee,id};
        const options={
            method:"POST",
            body:JSON.stringify(employee),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/employee",options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"Employee can't be added due to some issues"})
        }
    }
)

//updating employee to the server
export const updateEmployeeToServer = createAsyncThunk(
    "employee/updateEmployeeToServer",
    async(employee,{rejectWithValues})=>{
        console.log("Profile from the server ",employee)
        const id = employee.id;
        const options={
            method:"PATCH",
            body:JSON.stringify(employee),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/employee/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"Can't able to update the value"})
        }
    }
)

//deleting employee to the server
export const deleteEmployeeFromServer = createAsyncThunk(
    "employee/deleteEmployeeFromServer",
    async(employee,{rejectWithValues})=>{
        const id = employee.id;
        const options={
            method:"DELETE",
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/employee/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"There is an issue in deleting..."})
        }
    }
)

const employeeListSlice = createSlice({
    name:"employeelistslice",
    initialState,
    reducers:{
        setSelectedEmployee:(state,action)=>{
            state.selectedEmployee = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        //pending state
        .addCase(getEmployeesFromServer.pending,(state)=>{})
        //fulfilled state
        .addCase(getEmployeesFromServer.fulfilled,(state,action)=>{
            state.employeeList = action.payload;
            state.error="";
        })
        //rejected state
        .addCase(getEmployeesFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
            state.employeeList=[]
        })
        //adding employee
        //pending state
        .addCase(addEmployeeToServer.pending,(state)=>{})
        //fulfilled state
        .addCase(addEmployeeToServer.fulfilled,(state,action)=>{
            state.employeeList.push(action.payload);
        })
        //rejected
        .addCase(addEmployeeToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
        //updating employee
        //pending state
        .addCase(updateEmployeeToServer.pending,(state)=>{})
        //fulfilled state
        .addCase(updateEmployeeToServer.fulfilled,(state,action)=>{
            state.employeeList =  state.employeeList.map((employee)=> employee.id === action.payload.id?action.payload:employee);
        })
        //rejected
        .addCase(updateEmployeeToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
        //deleting employee
        //pending state
        .addCase(deleteEmployeeFromServer.pending,(state)=>{})
        //fulfilled state
        .addCase(deleteEmployeeFromServer.fulfilled,(state,action)=>{
            state.employeeList = state.employeeList.filter((employee)=>employee.id !== action.payload.id);
        })
        //rejected
        .addCase(deleteEmployeeFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
    }
})


export const {setSelectedEmployee} = employeeListSlice.actions;
export default employeeListSlice.reducer;