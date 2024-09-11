import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState={
    holidayList:[],
    selectedHoliday:{},
    error:""
}

//getting holiday from the server
export const getHolidaysFromServer = createAsyncThunk(
    "holiday/getHolidaysFromServer",
    async(_,{rejectWithValues})=>{
        const response = await fetch("http://localhost:5000/holiday");
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"No Holidays found"})
        }
    }
)

//adding holiday to the server
export const addHolidayToServer = createAsyncThunk(
    "holiday/addHolidayToServer",
    async(holiday,{rejectWithValues})=>{
        const id = ""+Math.random()*100;
        holiday = {...holiday,id}
        const options = {
            method:"POST",
            body:JSON.stringify(holiday),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/holiday",options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"Error is adding holiday"});
        }
    }
)

//updating holiday to the server
export const updateHolidayToServer = createAsyncThunk(
    "holiday/updateHolidayToServer",
    async(holiday,{rejectWithValues})=>{
        const id = holiday.id;
        const options = {
            method:"PATCH",
            body:JSON.stringify(holiday),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/holiday/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"Error is adding holiday"});
        }
    }
)

//updating holiday to the server
export const deleteHolidayFromServer = createAsyncThunk(
    "holiday/deleteHolidayFromServer",
    async(holiday,{rejectWithValues})=>{
        const id = holiday.id;
        const options = {
            method:"DELETE",
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/holiday/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            rejectWithValues({error:"Error is adding holiday"});
        }
    }
)

const holidaySlice = createSlice({
    name:"employeelistslice",
    initialState,
    reducers:{
        setSelectedHoliday:(state,action)=>{
            state.selectedHoliday = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        //getting holidays from the server
        //pending
        .addCase(getHolidaysFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(getHolidaysFromServer.fulfilled,(state,action)=>{
            state.holidayList = action.payload;
            state.error = ""
        })
        .addCase(getHolidaysFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
            state.holidayList = []
        })
        //adding holiday from the server
        //pending
        .addCase(addHolidayToServer.pending,(state)=>{})
        //fulfilled
        .addCase(addHolidayToServer.fulfilled,(state,action)=>{
            state.holidayList.push(action.payload);
            state.error = "";
        })
        .addCase(addHolidayToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
        // updating iday from the server
        //pending
        .addCase(updateHolidayToServer.pending,(state)=>{})
        //fulfilled
        .addCase(updateHolidayToServer.fulfilled,(state,action)=>{
            state.holidayList =  state.holidayList.map((holiday)=> holiday.id === action.payload.id?action.payload:holiday);
            state.error = "";
        })
        .addCase(updateHolidayToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

        // delete iday from the server
        //pending
        .addCase(deleteHolidayFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(deleteHolidayFromServer.fulfilled,(state,action)=>{
            state.holidayList = state.holidayList.filter((holiday)=>holiday.id !== action.payload.id);   
            state.error = "";
        })
        .addCase(deleteHolidayFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
    }
})

export const {setSelectedHoliday} = holidaySlice.actions;
export default holidaySlice.reducer;