
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import './Register.css'
import { faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../shared/Header";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";


const Register=()=>{ const [input,setInput]=useState({
    username:"",
    email:"",
    password:"",
    firstName:"",
    lastName:"",
    role:"",
    file:""
});
const {user}=useSelector(store=>store.auth)
const navigate= useNavigate();
const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
}

const changeFileHandler=(e)=>{
    setInput({...input,file:e.target.files?.[0]})
}
const handleRoleSelection = (role) => {
    setInput({ ...input, role });
};
const submitHandler= async (e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append("username",input.username);
    formData.append("email",input.email);
    formData.append("password",input.password);
    formData.append("firstName",input.firstName);
    formData.append("lastName",input.lastName);
    formData.append("role",input.role);
    if(input.file){
        formData.append("file",input.file);
    }
    try{
        const res= await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
        });
        if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);
        }

    }catch(error){
        console.log(error);
        toast.error(error.response.data.message);
        
    }
}
useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])
    return(
        <>
        <HelmetProvider>
          <Helmet>
        <title>Register - findmycareer.co.in</title>
        <meta name="description" content="Create your Find My Career account to apply for jobs, post job openings, and explore opportunities including play boy job, sex job, and call boy job postings." />
        <meta name="keywords" content="Register, Find My Career, Job portal, Candidate register, Employer register, Job applications, play boy job, sex job, call boy job , urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986" />
        <meta name="author" content="findmycareer.co.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Register - findmycareer.co.in" />
        <meta property="og:description" content="Sign up for Find My Career to access job postings and opportunities tailored for candidates and employers." />
        <meta property="og:image" content="https://findmycareer.co.in/path-to-register-image.jpg" />
        <meta property="og:url" content="https://findmycareer.co.in/register" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register - findmycareer.co.in" />
        <meta name="twitter:description" content="Create your account on Find My Career to explore job opportunities and post job openings." />
        <meta name="twitter:image" content="https://findmycareer.co.in/path-to-register-image.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://findmycareer.co.in/register" />
        {/* Language */}
        <meta http-equiv="content-language" content="en" />
      </Helmet>
      </HelmetProvider>
        <Header/>
        <div className="form flex items-center justify-center max-w-6xl mx-auto max650:mx-2">
        <form onSubmit={submitHandler} className="w-1/2 border border-grey-200 rounded-md p-4 my-10 max650:w-full">
        <div className="flex items-center justify-between  mx-auto mb-5">
            <h1 className="font-normal text-2xl">Sign Up</h1>
           {/*<button className="text-4xl"><FontAwesomeIcon icon={faRectangleXmark} /></button>  */}  
        </div>
             {/* Role Buttons */}
             <div className="flex gap-4 my-4">
                    <Button
                    
                        type="button"
                        onClick={() => handleRoleSelection("candidate")}
                        className= {`px-4 py-2 ${input.role === "candidate" ? " bg-green-500 text-white" : "register-btn"} max560:w-full`}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        Candidate
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleRoleSelection("employer")}
                        className={`px-4 py-2 ${input.role === "employer" ? " bg-green-500 text-white" : "register-btn"} max560:w-full`}
                    >
                        <FontAwesomeIcon icon={faBriefcase} />
                        Employer
                    </Button>
                </div>
          <div className="my-2">
            <Input
            type="text"
            placeholder="Username"
            
            value={input.username}
            name="username"
            onChange={changeEventHandler}

            />
          </div>
          <div className="my-2">
            <Input
            type="password"
            placeholder="Password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Input
            type="text"
            placeholder="First Name"
            value={input.firstName}
            name="firstName"
            onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Input
            type="text"
            placeholder="Last Name"
            value={input.lastName}
            name="lastName"
            onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Input
            type="email"
            placeholder="Email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            />
          </div>
            <div className="checkbox my-2">
            <input id="html" type="checkbox"/>
            <label htmlFor="html">I agree to the <span>Privacy Policy</span> </label>
            </div>

            <div className="my-5">
                <Button className=" bg-green-500 text-white max560:w-full" type="submit">Register Your Account</Button>
            </div>
        </form>
      </div>
      </>)
}

export default Register;