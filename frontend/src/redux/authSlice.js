import { createSlice } from "@reduxjs/toolkit";

const authSlice =createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        singleUser:null,
    },
    reducers:{
        //actions
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setSingleUser:(state,action)=>{
            state.singleUser=action.payload;
        }

    }
});
export const {setLoading,setUser,setSingleUser}=authSlice.actions;
export default authSlice.reducer;