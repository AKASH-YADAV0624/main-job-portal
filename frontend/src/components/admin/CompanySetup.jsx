import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup=()=>{
  const params= useParams();
  useGetCompanyById(params.id);
    const [input,setInput]=useState({
        name:"",
        description:"",
        website:"",
        location:"",
        video:"",
        salary:"",
        companyContent:"",
        file:null
    })
    const {singleCompany}=useSelector(store=>store.company);

    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
   const changeFileHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input,file});
   }
   const submitHandler= async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    formData.append("website",input.website);
    formData.append("location",input.location);
    formData.append("video",input.video);
    formData.append("salary",input.salary);
    formData.append("companyContent",input.companyContent);
    if(input.file){
        formData.append("file",input.file);
    }
    try{
        setLoading(true);
        const res= await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
            headers:{
                'content-Type':'multipart/form-data'
            },
            withCredentials:true
        });
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/company");
        }
    }catch(error){
        console.log(error);
        toast.error(error.response.data.message)
    }finally{
        setLoading(false);
    }

   }
   useEffect(()=>{
    setInput({
        name:singleCompany.name ||"",
        description:singleCompany.description||"",
        website:singleCompany.website||"",
        location:singleCompany.location||"",
        video:singleCompany.video ||"",
        salary:singleCompany.salary ||"",
        companyContent:singleCompany.companyContent ||"",
        file:singleCompany.file || null
    })
   },[singleCompany]);

    return(
    <div>
    <Header/>
    <div className="flex">
    <div className="w-1/5 max1024:w-0">
            <Sidebar/>

        </div>
        <div className="w-full p-[25px_20px] bg-gray-100 h-full max560:p-[20px_10px]">
        <h1 className="text-2xl my-3  ">Submit Company</h1>
        <h3 className="text-gray-500">Home &gt; Dashboard</h3>
        <form onSubmit={submitHandler}  className="w-full my-10 p-[20px_20px] bg-[#fff]">
    {/* Name and Email Inputs */}
        <div>

        <h1 className="text-2xl my-4">Company Details</h1>
        <hr />
        </div>
    <div className="flex w-full gap-5 max780:flex-wrap gap-0">
      <div className="w-4/5 max780:w-full">
        <label>Company name</label>
        <Input
          type="text"
          name="name"
          value={input.name}
          onChange={changeEventHandler}
        />
      </div>
      <div className="w-4/5 max780:w-full">
        <label>Company Tagline (optional)</label>
        <Input
          type="text"
          name="description"
          value={input.description}
          onChange={changeEventHandler}
        />
      </div>
    </div>

    {/* Location and Title */}
    <div className="flex w-full gap-5 max780:flex-wrap gap-0">
      <div className="w-4/5 max780:w-full">
        <label>Company location(optional)</label>
        <Input
          type="text"
          name="location"
          value={input.location}
          onChange={changeEventHandler}
        />
      </div>
      <div className="w-4/5 max780:w-full">
        <label>Company logo(optional)</label>
        <Input
          accpet="image/*"
          type="file"
          onChange={changeFileHandler}
        />
      </div>
    </div>

    {/* Resume Category and Video */}
    <div className="flex w-full gap-5 max780:flex-wrap gap-0">
      <div className="w-4/5 max780:w-full">
        <label>Company Website(optional)</label>
        <Input
          type="text"
          name="website"
          value={input.website}
          onChange={changeEventHandler}
        />
      </div>
      <div className="w-4/5 max780:w-full">
        <label>Video (optional)</label>
        <Input
          type="text"
          name="video"
          value={input.video}
          onChange={changeEventHandler}
        />
      </div>
    </div>

    {/* Minimum Rate and Photo */}
    <div className="flex w-full gap-5 max780:flex-wrap gap-0">
      <div className="w-4/5 max780:w-full">
        <label>Email (optional)</label>
        <Input
          type="text"
          name="email"
          //dekhenge iska
        />
      </div>
      <div className="w-4/5 max780:w-full">
        <label>Salary (optional)</label>
        <Input
           type="text"
           name="salary"
           value={input.salary}
           onChange={changeEventHandler}
        />
      </div>
    </div>

    {/* Resume Content */}
    <div className="flex flex-col my-2 gap-2">
      <label>Company content</label>
      <textarea
        className="border px-2 py-2"
        name="companyContent"
        placeholder="Company Content"
          value={input.companyContent}
          onChange={changeEventHandler}
        rows="8"
        cols="100"
        required
      />
    </div>




    {/* Submit Button */}
    <div className="w-full flex  mt-5">
     
      {
        loading? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>: <Button type="submit" className="text-white bg-green-600  py-2 rounded max560:w-full">
        Submit Company
      </Button>
      }
    </div>
  </form>
        </div>
    </div>
</div>
)
}

export default CompanySetup;