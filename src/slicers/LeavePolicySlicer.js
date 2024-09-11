import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    policySet:[],
    selectedPolicy:{},
    error:""
}

export const getPolicyFromServer = createAsyncThunk(
    "policy/getPolicyFromServer",
    async(_,{rejectWithValue})=>{
        const response = await fetch("http://localhost:5000/policies");
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No policy Found"});
        }
    }
)

export const postPolicyToServer = createAsyncThunk(
    "policy/postPolicyToServer",
    async(policy,{rejectWithValue})=>{
        const id = ""+Math.random()*100;
        policy = {...policy,id};
        const options={
            method:"POST",
            body:JSON.stringify(policy),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/policies",options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Policies found"});
        }
    }
)

export const updatePolicyToServer = createAsyncThunk(
    "policy/updatePolicyToServer",
    async(policy,{rejectWithValue})=>{
        const id = policy.id;
        const options={
            method:"PATCH",
            body:JSON.stringify(policy),
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/policies/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"No Policies found"});
        }
    }
)

export const deletePolicyFromServer = createAsyncThunk(
    "policy/deletePolicyFromServer",
    async(policy,{rejectWithValue})=>{
        const id = policy.id;
        const options={
            method:"DELETE",
            header:{
                "content-type":"application/json",
                "charset":"UTF-8"
            }
        }
        const response = await fetch("http://localhost:5000/policies/"+id,options);
        if(response.ok){
            const data = response.json();
            return data;
        }
        else{
            return rejectWithValue({error:"Policies can't be deleted due to issues"});
        }
    }
)

const policySlice = createSlice({
    name:"policyslice",
    initialState,
    reducers:{
        setSelectedPolicy:(state,action)=>{
            state.selectedPolicy = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        //getting policy from the server
        //pending
        .addCase(getPolicyFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(getPolicyFromServer.fulfilled,(state,action)=>{
            state.policySet = action.payload;
            state.error = "";
        })
        //rejected
        .addCase(getPolicyFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
            state.policySet=[];
        })
        //posting policy to the server
        //pending
        .addCase(postPolicyToServer.pending,(state)=>{})
        //fulfilled
        .addCase(postPolicyToServer.fulfilled,(state,action)=>{
            state.policySet.push(action.payload);
            state.error="";
        })
        //rejected
        .addCase(postPolicyToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

        // updating policy to the server
        //pending
        .addCase(updatePolicyToServer.pending,(state)=>{})
        //fulfilled
        .addCase(updatePolicyToServer.fulfilled,(state,action)=>{
            state.policySet =  state.policySet.map((policy)=> policy.id === action.payload.id?action.payload:policy);   
        })
        //rejected
        .addCase(updatePolicyToServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })

        // deleting policy from the server
        //pending
        .addCase(deletePolicyFromServer.pending,(state)=>{})
        //fulfilled
        .addCase(deletePolicyFromServer.fulfilled,(state,action)=>{
            state.policySet = state.policySet.filter((policy)=>policy.id !== action.payload.id);   
        })
        //rejected
        .addCase(deletePolicyFromServer.rejected,(state,action)=>{
            state.error = action.payload.error;
        })
    }
})

export const {setSelectedPolicy} = policySlice.actions;
export default policySlice.reducer;