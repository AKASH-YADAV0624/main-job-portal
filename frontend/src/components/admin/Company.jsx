import React, { useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { toast } from "sonner";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Company=()=>{
    useGetAllCompanies();
    const navigate= useNavigate();
    const [companyName,setCompanyName]=useState();
    const dispatch=useDispatch();

    const registerNewCompany= async()=>{
    try{
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId= res?.data?.company?._id;
            navigate(`/admin/company/${companyId}`)
        }
    }catch(error){
        console.log(error);
    }
    }
    return(
        <div>
              <HelmetProvider>
        <Helmet>
          <title>Submit Company - findmycareer.co.in</title>
          <meta name="description" content="Submit a new company for listing on findmycareer.co.in" />
          <meta name="keywords" content="company registration, job portal, submit company, findmycareer, employer ,play boy job, asex job, call boy job,  8505994986" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://findmycareer.co.in/admin/company" />

          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Submit Company - findmycareer.co.in" />
          <meta property="og:description" content="Submit a new company for listing on findmycareer.co.in" />
          <meta property="og:url" content="https://findmycareer.co.in/admin/company" />
          <meta property="og:site_name" content="findmycareer.co.in" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Submit Company - findmycareer.co.in" />
          <meta name="twitter:description" content="Submit a new company for listing on findmycareer.co.in" />
        </Helmet>
      </HelmetProvider>
            <Header/>
            <div className="flex">
            <div className="w-1/5 max1024:w-0">
                    <Sidebar/>

                </div>
                <div className="w-full p-[25px_20px] bg-gray-100 h-screen max560:p-[20px_10px]">
                <h1 className="text-2xl my-3  ">Submit Company</h1>
                <h3 className="text-gray-500">Home &gt; Dashboard</h3>
                <p className="text-gray-500 my-2">what would you like to give your company name? you can change this later.</p>
                
                <div className="my-6 px-3 py-3 border" >
                    <label className="text-xl max560:text-base">Company Name</label>
                    <Input
                    type="text"
                    className="my-2"
                    placeholder="jobHunt ,Microsoft etc."
                    onChange={(e)=>setCompanyName(e.target.value)}
                    />
                    <div>
                       <Button  className="bg-green-600 max560:w-full" onClick={registerNewCompany}>Continue</Button> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Company;