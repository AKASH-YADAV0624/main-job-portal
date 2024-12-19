
import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { faBriefcase, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompanyContainer=({company})=>{
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate(`/companydescription/${company?._id}`)} className="flex p-5 cursor-pointer rounded-md shadow-xl bg-white border border-gray-100 cursor pointer  my-4 mx-4">
            <div className="flex items-center gap-2 my-2 pr-2.5 max560:p-[0px_10px] max650:h-fit ">
              
                    <Avatar>
                        <AvatarImage  src={company?.logo}/>
                    </Avatar>
                
            </div>
            <div>
                <h4 className="text-base  text-gray-500">{company?.name}</h4>  
                <h1 className="font-normal text-lg my-2">{company?.description}</h1>
           
            <div className="flex flex-wrap items-center gap-5 my-2 max650:gap-2">

                <h4  className="text-base text-gray-500"> <FontAwesomeIcon icon={faBriefcase} className="text-gray-400" />  {company?.name}</h4> 
                 <p className="text-sm text-gray-500"> <FontAwesomeIcon icon={faMapLocation} className="text-gray-400" />  {company?.location}</p> 
            </div>
            </div>
        </div>
    )
}

export default CompanyContainer;