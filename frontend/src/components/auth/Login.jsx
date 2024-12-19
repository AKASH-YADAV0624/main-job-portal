import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Link ,useNavigate} from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import Header from "../shared/Header";
import { setLoading, setUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from 'react-redux';

const Login=()=>{
    const dispatch = useDispatch();
    const {user}=useSelector(store=>store.auth)
    const [input,setInput]=useState({
        username:"",
        password:"",
      
    });
    const navigate= useNavigate();
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const submitHandler= async (e)=>{
        e.preventDefault();
      
        try{
            dispatch(setLoading(true));
         
            const res= await axios.post(`${USER_API_END_POINT}/login`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            });
            if(res.data.success){
               dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
    
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (user) {
          // Check if user is already logged in and redirect based on role
          if (user.role === "admin") {
            navigate("/admindashboard");
          } else {
            navigate("/");
          }
        }
      }, [user, navigate]);

    return(
        <>        <Header/>
        <div className="form flex items-center justify-center max-w-7xl mx-auto max650:px-2">
        <form onSubmit={submitHandler} className="w-1/2 border border-grey-200 rounded-md p-4 my-10 max650:w-full ">
            <h1 className="font-bold mb-5 font-normal text-2xl">Log In</h1>
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
          
            <div className="checkbox my-2 items-center">
            <input id="html" type="checkbox"/>
            <label>Remember Me</label>
            </div>

            <div className="my-5">
                <Button className="bg-green-500 text-white max560:w-full" type="submit">Login</Button>
            </div>
            <span className="text-sm ">Don't have an account? <Link to="/register" className="text-green-600">Sign up now</Link></span>
        </form>
      </div>
      </>
)
    
}

export default Login;