import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    leaveHistorySet:[],
    error:""
}

export const getLeaveHistoryFromServer = createAsyncThunk(
    "leavehistory/getLeaveHistoryFromServer",
    async(_,{rejectWithValue})=>{
        const response = await fetch("http://localhost:5000/leavehistories");
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Leave History Found"});
        }
    }
)

const leaveHistorySlice = createSlice({
    name:"leavehistoryslice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //getting leavehistory from the server
        //pending
        .addCase(getLeaveHistoryFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(getLeaveHistoryFromServer.fulfilled,(state,action)=>{
            state.leaveHistorySet = action.payload;
            state.error = action.payload.error;
        })
        //rejected
        .addCase(getLeaveHistoryFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
            state.leaveHistorySet=[];
        })
    }
})

export default leaveHistorySlice.reducer;