
import { Badge } from "./ui/badge";
import React from "react";
import {Avatar,AvatarImage} from "./ui/avatar"
import { Button } from "./ui/button";
import { faBriefcase, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Job=({job})=>{
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate(`/description/${job?._id}`)} className="flex p-5 cursor-pointer rounded-md shadow-xl bg-white border border-gray-100 cursor pointer ">
            <div className="flex items-center gap-2 my-2 pr-2.5 max650:h-fit">
              
                    <Avatar>
                        <AvatarImage  src={job?.company?.logo}/>
                    </Avatar>
                
            </div>
            <div>
                <h4 className="text-base  text-gray-500">{job?.company?.name}</h4>  
                <h1 className="font-normal text-lg my-2">{job?.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className={'bg-blue-700 text-white font bold'} variant="ghost" >Full Time</Badge>
                <Badge className={'bg-[#F83002] text-white font bold'} variant="ghost" >Temporary</Badge>
                <Badge className={'bg-[#4CBB17] text-white font bold'} variant="ghost" >Freelance</Badge>
                <Badge className={'bg-[#FF5733] text-white font bold'} variant="ghost" >Part Time</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-5 my-2 max650:gap-2">

                <h4  className="text-base text-gray-500"> <FontAwesomeIcon icon={faBriefcase} className="text-gray-400" />  {job?.company?.name}</h4> 
                 <p className="text-sm text-gray-500"> <FontAwesomeIcon icon={faMapLocation} className="text-gray-400" />  {job?.location}</p> 
            </div>
            </div>
        </div>
    )
}

export default Job;