import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    notificationSet:[],
    selectedNotification:{},
    error:""
}

//getting notifications from the server
export const getNotificationsFromServer = createAsyncThunk(
    "notification/getNotificationsFromServer",
    async(_,{rejectWithValue})=>{
        const response = await fetch("http://localhost:5000/notifications");
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Notifications Found"});
        }
    }
)

//putting notificaitions to the server
export const postingNotificationsToServer = createAsyncThunk(
    "notification/postingNotificationsToServer",
    async(notification,{rejectWithValue})=>{
        const id = ""+Math.random()*100;
        notification = {...notification,id};
        const options = {
            method:"POST",
            body:JSON.stringify(notification),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/notifications",options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Notifications Found"});
        }
    }

)

//updating notificaitions to the server
export const updatingNotificationToServer = createAsyncThunk(
    "notification/updatingNotificationToServer",
    async(notification,{rejectWithValue})=>{
        console.log(notification)
        const id = notification.id;
        const options = {
            method:"PATCH",
            body:JSON.stringify(notification),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/notifications/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Notifications Found"});
        }
    }

)

//putting notificaitions to the server
export const deletingNotificationFromServer = createAsyncThunk(
    "notification/deletingNotificationFromServer",
    async(notification,{rejectWithValue})=>{
        const id = notification.id;
        const options = {
            method:"DELETE",
            body:JSON.stringify(notification),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/notifications/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Notifications Found"});
        }
    }

)


const notificationSlice = createSlice({
    name:"notificationslice",
    initialState,
    reducers:{
        setSelectedNotification:(state,action)=>{
            state.selectedNotification = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        //getting notifications
        //pending
        .addCase(getNotificationsFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(getNotificationsFromServer.fulfilled,(state,action)=>{
            state.notificationSet = action.payload;
            state.error="";
        })
        //rejected
        .addCase(getNotificationsFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
            state.notificationSet=[];
        })

        //adding notifications
        //pending
        .addCase(postingNotificationsToServer.pending,(state)=>{})
        //fulfilled
        .addCase(postingNotificationsToServer.fulfilled,(state,action)=>{
            state.notificationSet.push(action.payload);
            state.error="";
        })
        //rejected
        .addCase(postingNotificationsToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

        //updating notification to server
        //pending
        .addCase(updatingNotificationToServer.pending,(state)=>{})
        //fulfilled
        .addCase(updatingNotificationToServer.fulfilled,(state,action)=>{
            state.notificationSet =  state.notificationSet.map((notify)=> notify.id === action.payload.id?action.payload:notify);
        })
        //rejected
        .addCase(updatingNotificationToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })      
        
        //deletin4-g json from the server
        //pending
        .addCase(deletingNotificationFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(deletingNotificationFromServer.fulfilled,(state,action)=>{
            state.notificationSet = state.notificationSet.filter((notificaition)=>notificaition.id !== action.payload.id);   
        })
        //rejected
        .addCase(deletingNotificationFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
    }
})

export const {setSelectedNotification} = notificationSlice.actions;
export default notificationSlice.reducer