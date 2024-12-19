import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs=()=>{
    const dispatch=useDispatch();
    const {searchedQuery,searchedCategory}= useSelector(store=>store.job)
    useEffect(()=>{
        const fetchAllJobs= async()=>{
            try{
                const res= await axios.get(`${JOB_API_END_POINT}/get`,{
                    params: {
                        keyword: searchedQuery,
                        category: searchedCategory,  // Include category in the API request
                    }, withCredentials: true,
                });
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs;