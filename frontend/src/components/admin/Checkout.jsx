import React from "react";
import Sidebar from "../Sidebar";
import Header from "../shared/Header";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Checkout=()=>{
    const navigate=useNavigate();

    const submitHandler=(e)=>{
        e.preventDefault();
    }
    return(
        <div>
        <Header/>
        <div className="flex">
        
            <div className="w-full p-[40px_60px] bg-gray-100 max780:p-[25px_20px] ">
            <h1 className="text-2xl my-3  ">Checkout</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>


            <div className="w-full flex gap-9 max780:flex-wrap">
                <div className="my-9 w-3/5 max780:w-full"> 
                    <div>
                        <h1 className="my-2 text-xl">Contact information</h1>
                        <p className="my-2">We'll use this email to send you details and updates about your order.</p>
                        <Input className="border-2 border-black"
                        type="email"
                        placeholder="Email id"
                        />
                    </div>
                    <form onSubmit={submitHandler} className="my-5" action="">
                        <h1  className="text-xl my-2">Biling address</h1>
                        <p className="my-2">Enter the billing address that matches your payment method.</p>
                        <Input className="border-2 border-black"
                        type="text"
                        placeholder="First name"
                        
                        />
                         <Input className="border-2 border-black"
                        type="text"
                        placeholder="Last name"
                        
                        />
                         <Input className="border-2 border-black"
                        type="text"
                        placeholder="Address"
                        
                        />
                         <Input className="border-2 border-black"
                        type="Number"
                        placeholder="Zip code"
                        
                        />
                         <Input className="border-2 border-black"
                        type="Number"
                        placeholder="Phone number"
                        
                        />
                         <Input className="border-2 border-black"
                        type="text"
                        placeholder="State"
                        
                        />
                        <Button type="submit"onClick={() => navigate("/admin/managejobs")} className="bg-green-600 w-full text-gray-700 my-4">Place order</Button>
                    </form>

                </div>

                <div className="w-2/5 border-2 p-[15px_20px] max780:w-full">
                <h3 >Order summary</h3>
                  <h4 className="my-4 text-gray-500 tex-sm">1. Start up</h4>
                <ul className="p-[0px_20px]">
                    <li className="my-2 text-gray-500">One Time Fee</li>
                    <li className="my-2 text-gray-500">This Plan Includes 1 Job</li>
                    <li className="my-2 text-gray-500">Non-Highlighted Post</li>
                    <li className="my-2 text-gray-500">Posted For 30 Days</li>
                </ul>
                <p className=" text-gray-500 px-5 my-3">Job Listing:
                     work with uss this is our job title</p>
                       <hr />
                     <div className="flex justify-between">
                        <h3 className=" text-gray-500">Subtotal</h3>
                        <h3 className=" text-black-500">$0.00</h3>
                     </div>
                     <hr />
                     <div className="flex justify-between">
                        <h3 className="text-xl font-bold">Total</h3>
                        <h3 className="text-xl font-bold">$0.00</h3>
                     </div>

                </div>
            </div>



            </div>
        </div>
    </div>
    )
}

export default Checkout;