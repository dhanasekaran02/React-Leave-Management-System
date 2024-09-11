import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    leaveTypeSet:[],
    selectedLeave:{},
    error:""
}

//getting data from the server
export const getLeaveTypeFromServer = createAsyncThunk(
    "leavetype/getLeaveTypeFromServer",
    async(_,{rejectWithValue})=>{
        const response = await fetch("http://localhost:5000/leaveTypes");
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave Types found"});
        }
    }
)

//add leavetype to the server
export const addLeaveTypeToServer = createAsyncThunk(
    "leavetype/addLeaveTypeToServer",
    async(leavetype,{rejectWithValue})=>{
        const id = ""+Math.random()*100;
        leavetype = {...leavetype,id};
        const options={
            method:"POST",
            body:JSON.stringify(leavetype),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/leaveTypes",options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave Types found"});
        }
    }
)

//edit leavetype to the server
export const updateLeaveTypeToServer = createAsyncThunk(
    "leavetype/updateLeaveTypeToServer",
    async(leavetype,{rejectWithValue})=>{
        const id = leavetype.id;
        console.log("leave type:".leavetype)
        const options={
            method:"PATCH",
            body:JSON.stringify(leavetype),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/leaveTypes/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave Types found"});
        }
    }
)

//edit leavetype to the server
export const deleteLeaveTypeFromServer = createAsyncThunk(
    "leavetype/deleteLeaveTypeFromServer",
    async(leavetype,{rejectWithValue})=>{
        const id = leavetype.id;
        const options={
            method:"DELETE",
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/leaveTypes/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave Types found"});
        }
    }
)

const leaveTypeSlice = createSlice({
    name:"leavetypeslice",
    initialState,
    reducers:{
        setSelectedLeave:(state,action)=>{
            state.selectedLeave = action.payload;
        }   
    },
    extraReducers:(builder)=>{
        builder
        //pending status
        .addCase(getLeaveTypeFromServer.pending,state=>{})
        //fullfilled
        .addCase(getLeaveTypeFromServer.fulfilled,(state,action)=>{
            state.leaveTypeSet = action.payload;
            state.error="";
        })
        //rejected
        .addCase(getLeaveTypeFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
            state.leaveTypeSet = [];
        })
        //adding type to the server
        //pending status
        .addCase(addLeaveTypeToServer.pending,state=>{})
        //fullfilled
        .addCase(addLeaveTypeToServer.fulfilled,(state,action)=>{
            state.leaveTypeSet.push(action.payload);
            state.error="";
        })
        //rejected
        .addCase(addLeaveTypeToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

        //updating type to the server
        //pending status
        .addCase(updateLeaveTypeToServer.pending,state=>{})
        //fullfilled
        .addCase(updateLeaveTypeToServer.fulfilled,(state,action)=>{
            state.leaveTypeSet =  state.leaveTypeSet.map((leave)=> leave.id === action.payload.id?action.payload:leave);
            state.error = "";
        })
        //rejected
        .addCase(updateLeaveTypeToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

        //deleting type to the server
        //pending status
        .addCase(deleteLeaveTypeFromServer.pending,state=>{})
        //fullfilled
        .addCase(deleteLeaveTypeFromServer.fulfilled,(state,action)=>{
            state.leaveTypeSet = state.leaveTypeSet.filter((leave)=>leave.id !== action.payload.id);
        })
        //rejected
        .addCase(deleteLeaveTypeFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

    }
}
)

export const {setSelectedLeave} = leaveTypeSlice.actions;
export default leaveTypeSlice.reducer;