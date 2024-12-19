import { createSlice } from "@reduxjs/toolkit"; 

const jobSlice= createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        allAppliedJobs:[],
        searchedQuery:"",
        searchedCategory: "",  // Add this field for category
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
        state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload
        },
        setSearchedCategory: (state, action) => {  // New action for category
            state.searchedCategory = action.payload;
          },
    }
});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setAllAppliedJobs,setSearchedQuery,setSearchedCategory}=jobSlice.actions;
export default jobSlice.reducer;