import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    leaveSet:[],
    selectedLeave:{},
    error:""
}

//getting leaves from the json server
export const getLeaveFromServer = createAsyncThunk(
    "leave/getLeaveFromServer",
    async(_,{rejectWithValue})=>{
        const response = await fetch("http://localhost:5000/leaves");
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave found"});
        }
    }
)

//posting leave to the server
export const postLeaveToServer = createAsyncThunk(
    "leave/postLeaveToServer",
    async(leave,{rejectWithValue})=>{
        const id = ""+Math.random()*100;
        leave = {...leave,id};
        const options = {
            method:"POST",
            body:JSON.stringify(leave),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/leaves",options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave found"});
        }
    }
)
//update leave to server
export const updateLeaveToServer = createAsyncThunk(
    "leave/updateLeaveToServer",
    async(leave,{rejectWithValue})=>{
        console.log("Leave from manager approval ",leave)
        const leaveId = leave.id;
        const options = {
            method:"PUT",
            body:JSON.stringify(leave),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/leaves/"+leaveId,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave found"});
        }
    }
)

//delete leave from server
export const deleteLeaveFromServer = createAsyncThunk(
    "leave/deleteLeaveFromServer",
    async(leave,{rejectWithValue})=>{
        console.log("Leave from manager approval ",leave)
        const leaveId = leave.id;
        const options = {
            method:"DELETE",
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/leaves/"+leaveId,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave found"});
        }
    }
)

const leaveSlice = createSlice({
    name:"leaveslice",
    initialState,
    reducers:{
        setSelectedLeave:(state,action)=>{
            state.selectedLeave = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        //for getting leave from the server
        //pending status
        .addCase(getLeaveFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(getLeaveFromServer.fulfilled,(state,action)=>{
            state.leaveSet = action.payload;
            state.error="";
        })
        //rejected
        .addCase(getLeaveFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
            state.leaveSet=[];
        })

        //for adding leave to the server
        //pending status
        .addCase(postLeaveToServer.pending,(state)=>{})
        //fulfilled
        .addCase(postLeaveToServer.fulfilled,(state,action)=>{
            state.leaveSet.push(action.payload);
            state.error="";
        })
        //rejected 
        .addCase(postLeaveToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

        //for updating leave to the server
        //pending
        .addCase(updateLeaveToServer.pending,(state)=>{})
        //fulfilled
        .addCase(updateLeaveToServer.fulfilled,(state,action)=>{
            state.leaveSet =  state.leaveSet.map((leave)=> leave.id === action.payload.id?action.payload:leave);
            state.error = "";
        })
        //rejected
        .addCase(updateLeaveToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
        //delete leave from server
        //pending
        .addCase(deleteLeaveFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(deleteLeaveFromServer.fulfilled,(state,action)=>{
            state.leaveSet = state.leaveSet.filter((leave)=>leave.id !== action.payload.id);   
        })
        //rejected
        .addCase(deleteLeaveFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
    }
})


export const {setSelectedLeave} = leaveSlice.actions;

export default leaveSlice.reducer;