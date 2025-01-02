import React, { useEffect } from "react";
import Header from "./shared/Header";
import { Badge } from "./ui/badge";
import { faCalendarDays, faLink, faMapLocationDot, faMoneyCheckDollar, faStar, faUserTie } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  COMPANY_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Helmet, HelmetProvider } from "react-helmet-async";

const CompanyDescription=()=>{
    const {singleCompany}=useSelector(store=>store.company)
    const params=useParams();
    const companyId=params.id;
    const dispatch=useDispatch()
    const isBookmark=false;
    
  
    useEffect(()=>{
        const fetchSingleCompany= async()=>{
            try{
                const res= await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch])
 

    const daysAgoFunction=(mongodbTime)=>{
        const createdAt=new Date(mongodbTime);
        const currentTime=new Date();
        const timeDifference=currentTime-createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    // LocalBusiness Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": singleCompany?.name,
    "url": `https://findmycareer.co.in/companydescription/${companyId}`,
    "logo": singleCompany?.logo,
    "description": singleCompany?.companyContent,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": singleCompany?.phoneNumber,
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": "English",
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": singleCompany?.location,
      "addressLocality": singleCompany?.location,
      "addressRegion": "IN",
      "postalCode": "110001",
    },
    "sameAs": singleCompany?.website || "findmycareer.co.in",
  };
    return(
        <div>
            <HelmetProvider>
        <Helmet>
          <title>{`${singleCompany?.name} - findmycareer.co.in`}</title>
          <meta
            name="description"
            content={`${singleCompany?.name} - Explore job opportunities and learn more about this company on FindMyCareer.`}
          />
           <meta name="keywords" content={`play boy job, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986`} />
          
           <meta name="robots" content="index, follow, max-snippet: -1, max-video-preview: -1, max-image-preview: large" />
           <link rel="canonical" href={`https://findmycareer.co.in/companydescription/${companyId}`} />

          <meta property="og:title" content={`${singleCompany?.name}  - findmycareer.co.in`} />
          <meta
            property="og:description"
            content={`${singleCompany?.name} - Explore job opportunities and learn more about this company on FindMyCareer.`}
          />
          
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://findmycareer.co.in/companydescription/${companyId}`}
          />
          <meta name="twitter:title" content={`${singleCompany?.name} - findmycareer.co.in`} />
          <meta
            name="twitter:description"
            content={`${singleCompany?.name} - Explore job opportunities and learn more about this company on FindMyCareer.`}
          />
          <meta name="twitter:card" content="summary" />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      </HelmetProvider>
            <Header/> 
        <div className="max-w-7xl mx-40 my-10 max1024:mx-5 ">
            <div className="flex justify-between items-center max650:flex-wrap gap-3">
                <div>
                    
            <h2 className="color-gray-400 text-l my-3">{singleCompany?.description}</h2>
           

                </div>
            </div>

            <div className="flex my-8 p-4 pl-10 pr-5  justify-between items-center color-[#fff]  border-gray-300 shadow-lg">
                <div >   
                <Avatar>
                        <AvatarImage  src={singleCompany?.logo}/>
                    </Avatar>
                  <h1 className="color-black text-2xl">{singleCompany?.name}</h1>
                  <p className="text-gray-400">{singleCompany?.name}</p>
                  <Button className="my-2  bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2"><FontAwesomeIcon icon={faLink} />{singleCompany?.website}</Button>
                
                
                  
                </div>
              
            </div>
            <div className="flex   gap-10 max650:flex-wrap ">
                <div  className="w-3/4 max650:w-full">
                 <p  className="my-2 text-lg text-gray-500">{singleCompany?.companyContent}</p>
                <h2 className="my-2 text-lg text-gray-500">Video Url : {singleCompany?.video}</h2>
                </div>

                <div >
                    <h2 className="text-2xl text-black">Job overview</h2>
                    <div className="p-[35px_38px_31px_38px]">
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />
                        <div className="my-2">
                    <h3 className="font-medium text-black ">Date Posted:</h3>
                    <h3 className="text-gray-500">{daysAgoFunction(singleCompany?.createdAt)===0?"Today":`${daysAgoFunction(singleCompany?.createdAt)} days ago`}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapLocationDot} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">location:</h3>
                    <h3 className="text-gray-500">{singleCompany?.location}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserTie} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">Company Descriptiom:</h3>
                    <h3 className="text-gray-500"> {singleCompany?.description}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMoneyCheckDollar}className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium  text-black">salary:</h3>
                    <h3 className="text-gray-500">{singleCompany?.salary}</h3>
                        </div>
                    </div>
                    </div>
                  
                </div>
                
            </div>
        </div>
        </div>
    )
}

export default CompanyDescription;