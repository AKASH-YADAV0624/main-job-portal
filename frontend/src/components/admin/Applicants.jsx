import React, { useEffect } from "react";
import Header from "../shared/Header";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Applicants=()=>{
    const params= useParams();
    const dispatch=useDispatch();
    const {applicants}=useSelector(store=>store.application)
    useEffect(()=>{
        const fetchAllApplicants= async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
               
                    dispatch(setAllApplicants(res.data.job))

                
            }catch(error){
                console.log(error);
            }
        }
        fetchAllApplicants();
    },[])
    return(
        <div>
                  <HelmetProvider>
        <Helmet>
          <title>Applicants for Job - findmycareer.co.in</title>
          <meta
            name="description"
            content="View the list of applicants for the job posting. Manage and review job applications on FindMyCareer."
          />
           <meta name="keywords" content={`play boy job, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs, 8505994986`} />
          <meta name="robots" content="index, follow, max-snippet: -1, max-video-preview: -1, max-image-preview: large" />
          <link rel="canonical" href={`https://findmycareer.co.in/job/${params.id}/applicants`} />
          
          <meta property="og:title" content="Applicants for Job - findmycareer.co.in" />
          <meta
            property="og:description"
            content="View the list of applicants for the job posting. Manage and review job applications on FindMyCareer."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://findmycareer.co.in/job/${params.id}/applicants`}
          />
          <meta name="twitter:title" content="Applicants for Job - findmycareer.co.in" />
          <meta
            name="twitter:description"
            content="View the list of applicants for the job posting. Manage and review job applications on FindMyCareer."
          />
          <meta name="twitter:card" content="summary" />
        </Helmet>
      </HelmetProvider>

            <Header/>
            <div className="max-w-7xl mx-auto p-[25px_20px]">
               <h1 className="font-bold text-xl my-5">Applications {applicants?.applications?.length}</h1>
               <ApplicantsTable/>
            </div>
        </div>
    )
}

export default Applicants;