import React, { useEffect } from "react";
import Header from "./shared/Header";
import { Badge } from "./ui/badge";
import { faAward, faBookOpen, faCalendarDays, faEnvelope, faLink, faMapLocationDot, faMoneyCheckDollar, faPhone, faStar, faTableCells, faUserTie } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  COMPANY_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import { Avatar, AvatarImage } from "./ui/avatar";
import { setSingleUser, setUser } from "@/redux/authSlice";

const CandidateDescription=()=>{
    const {singleUser ,user}=useSelector((store)=>store.auth)
    const params=useParams();
    const userId=params.id;
    const dispatch=useDispatch()
    const isBookmark=false;
    const isResume=true;
    
  
    useEffect(()=>{
        const fetchSingleCandidate= async()=>{
            try{
                const res= await axios.get(`${USER_API_END_POINT}/get/${userId}`,{withCredentials:true});
               
                if(res.data.success){
                    dispatch(setSingleUser(res.data.candidate));
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchSingleCandidate();
    },[userId,dispatch])
 

    const daysAgoFunction=(mongodbTime)=>{
        const createdAt=new Date(mongodbTime);
        const currentTime=new Date();
        const timeDifference=currentTime-createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
  
    return(
        <div>
            <Header/> 
        <div className="max-w-7xl mx-40 my-10  max1024:mx-5  ">
            <div className="flex justify-between items-center max650:flex-wrap gap-3">
                <div>
                    
            <h2 className="color-gray-400 text-2xl my-3">{singleUser?.profile?.title}</h2>
         

                </div>
               

            </div>

            <div className="flex my-8 p-4 pl-10 pr-5  justify-between items-center color-[#fff]  border-gray-300 shadow-lg">
                <div >   
                
                  <h1 className="color-black text-2xl">{singleUser?.firstName}</h1>
                  <p className="text-gray-400">{singleUser?.profile?.bio}</p>

                  <div className="flex flex-wrap">

                  
                  <Button className="my-2 mx-2  bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2">
                  <FontAwesomeIcon icon={faLink} />
                  {
                    isResume? <a target="blank" rel="noopener noreferrer" href={singleUser?.profile?.resume}>{singleUser?.profile?.resumeOriginalName}</a> : <span>NA</span>
                  }</Button>
                  <Button className="my-2 mx-2  bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2"><FontAwesomeIcon icon={faEnvelope} />{singleUser?.email}</Button>
                  <Button className="my-2 mx-2 bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2"><FontAwesomeIcon icon={faPhone} />{singleUser?.phoneNumber}</Button>
                  <Button className="my-2 mx-2  bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2"><FontAwesomeIcon icon={faBookOpen} />{singleUser?.profile?.skills}</Button>
                  <Button className="my-2 mx-2  bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2">{singleUser?.profile?.category}</Button>
                  
                  </div>
                
                  
                </div>
              

            </div>
            <div className="flex  gap-10  max650:flex-wrap">
                <div  className="w-3/4 max650:w-full">
                 <p  className="my-2 text-lg text-gray-500">{singleUser?.profile?.content}</p>
                <h2 className="my-2 text-lg text-gray-500">Video Url : {singleUser?.profile?.videoLink}</h2>
                </div>

                <div >
                    <h2 className="text-2xl text-black">Job overview</h2>
                    <div className="p-[35px_38px_31px_38px] max780:p-0">
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />
                        <div className="my-2">
                    <h3 className="font-medium text-black ">Date Posted:</h3>
                    <h3 className="text-gray-500">{daysAgoFunction(singleUser?.createdAt)===0?"Today":`${daysAgoFunction(singleUser?.createdAt)} days ago`}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapLocationDot} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">location:</h3>
                    <h3 className="text-gray-500">{singleUser?.profile?.location}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserTie} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">Job Title:</h3>
                    <h3 className="text-gray-500"> {singleUser?.profile?.title}</h3>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMoneyCheckDollar}className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium  text-black">Min Rate:</h3>
                    <h3 className="text-gray-500">{singleUser?.profile?.minRate}</h3>
                        </div>
                    </div>
                    </div>
                  
                </div>
                
            </div>
        </div>
        </div>
    )
}

export default CandidateDescription;