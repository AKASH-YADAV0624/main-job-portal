import React from "react";
import './RecentJobs.css'
import LatestJobCard from "../LatestJobCard";
import { useSelector } from "react-redux";


//const randomJobs=[1,2,3,4,5,6,7,8];
const RecentJobs=()=>{
    const {allJobs}=useSelector(store=>store.job);
    return(
        <div className="recent-jobs w-full">
            <h1>Recent jobs</h1>
            <div className="grid grid-cols-3 gap-4 my-5 max780:grid-cols-2 max560:grid-cols-1">
           {
           allJobs.length<=0?<span>No Job Available</span>:allJobs?.slice(0,6).map((job)=><LatestJobCard key={job._id} job={job}/>)}
           </div>
        </div>
    )
}

export default RecentJobs;