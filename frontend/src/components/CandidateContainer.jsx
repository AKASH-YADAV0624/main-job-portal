
import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { faBriefcase, faEnvelope, faMapLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const CandidateContainer=({candidate})=>{
    const {user}=useSelector(store=>store.auth)
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate(`/candidatedescription/${candidate?._id}`)} className="flex p-5 cursor-pointer rounded-md shadow-xl bg-white border border-gray-100 cursor pointer  my-4 mx-4">
          
            <div>
                <h4 className="text-base  text-gray-500">{candidate?.firstName}</h4>  
                <h1 className="font-normal text-lg my-2">{candidate?.profile?.bio}</h1> 
                <h1 className="font-normal text-lg my-2">{candidate?.profile?.title}</h1>
           
            <div className="flex flex-wrap items-center gap-5 my-2 max650:gap-2">

                <h4  className="text-base text-gray-500"> <FontAwesomeIcon icon={faPhone} className="text-gray-400" />  {candidate?.phoneNumber}</h4> 
                 <p className="text-sm text-gray-500 items-center"> <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />  {candidate?.email}</p> 
            </div>
            </div>
        </div>
    )
}

export default CandidateContainer;