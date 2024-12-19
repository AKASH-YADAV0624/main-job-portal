import React, { useState } from "react";
import Header from "../shared/Header";
import './Profile.css'
import Sidebar from "../Sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";

import logo from '@/assets/logouser.png'
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Profile=()=>{
const { user }=useSelector(store=>store.auth);
const [input,setInput]=useState({
    username:user?.username,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills?.map(skill=>skill),
    file:user?.profile?.resume,
    firstName:user?.firstName,
    lastName:user?.lastName,
});

//password change
const[output,setOutput]=useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",  
})

const anotherChangeEventHandler = (e) => {
    setOutput({ ...output, [e.target.name]: e.target.value });
  };

const anotherSubmitHandler = async (e) => {
    e.preventDefault();

    if (output.newPassword !== output.confirmNewPassword) {
      return toast.error("New passwords do not match.");
    }

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/password/change`,
        {
          oldPassword: output.oldPassword,
          newPassword: output.newPassword,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOutput({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    }
  };

// yha tak password change

const dispatch=useDispatch();

const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
}

const fileChangeHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
}

const submitHandler= async(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append("firstName",input.firstName);
    formData.append("lastName",input.lastName);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio);
    if(input.file){
        formData.append("file",input.file);
    }

    try{
        const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
            headers:{
                'content-Type':'multipart/form-data'
            },
            withCredentials:true
        });
        if(res.data.success){
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    } catch(error){
        console.log(error);
        toast.error(error.response?.data?.message);
    }
}

    return(
        <div>
            <Header/>
            <div className="flex">
                <div className="h-full w-1/5 max1024:w-0 ">
                 <Sidebar/>    
                </div>

                <div className="myprofile ">
                    <h1>My Profile</h1>
                    
                    <h3>Home &gt; Dashboard</h3>

                    <div className="profile-info">

                    <div className="profile-detail">
                        <h2>Profile Details</h2>
                        <hr />
                        <h3>Avatar</h3>
                        <Avatar className="h-24 w-24 my-3">
                            <AvatarImage src={logo}/>
                        </Avatar>

                        <form onSubmit={submitHandler}>
                            <label htmlFor="">First Name</label>
                            <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={input.firstName}
                            onChange={changeEventHandler}

                            />
                             <label htmlFor="">Last Name</label>
                            <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={input.lastName}
                            onChange={changeEventHandler}
                            
                            />
                             <label htmlFor="">Phone Number</label>
                            <Input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            
                            />
                             <label htmlFor="">E-mail</label>
                            <Input
                            type="email"
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            
                            />
                             <label htmlFor="">About Me</label>
                             <textarea id="bio" name="bio" rows="8" placeholder="Enter your message" 
                             value={input.bio}
                             onChange={changeEventHandler}
                          
                                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:ring-2 focus:outline-none w-full"></textarea>
                                    <Button className="bg-green-500 text-white my-2" type="submit" >Save Change</Button>
                        </form>

                    </div>
                    <div className="profile-detail h-full">
                        <h2>Change Password</h2>
                        <hr />
                        <p className="my-5 bg-sky-200 text-sky-500 pl-5 pr-10 ">Your password should be at least 12 random characters long to be safe</p>
                        <form onSubmit={anotherSubmitHandler}>
                            <label htmlFor="oldPassword">Current Password</label>
                            <Input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={output.oldPassword}
                            onChange={anotherChangeEventHandler}

                            />
                             <label htmlFor="newPassword">New Password</label>
                            <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={output.newPassword}
                            onChange={anotherChangeEventHandler}
                            
                            />
                             <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <Input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={output.confirmNewPassword}
                            onChange={anotherChangeEventHandler}
                            
                            />       
                            <Button className="bg-green-500 text-white my-2" type="submit" >Save Change</Button>
                        </form>

                    </div>
                    </div>

                </div>

            </div>
      
            
        </div>
    )
}

export default Profile;