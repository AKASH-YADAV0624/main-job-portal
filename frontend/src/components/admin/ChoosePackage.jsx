import React from "react";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";

const choosePackage=()=>{
    return(
        <div>
        <Header/>
        <div className="flex">
        <div className="w-1/5 max1024:w-0">
                <Sidebar/>
    
            </div>
            <div className="w-full p-[25px_20px] bg-gray-100 h-screen">
            <h1 className="text-2xl my-3  ">Post A Job</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>


            <div className="my-3 bg-white p-[15px_15px]">
                <div className="flex justify-between my-3 ">
                <h1 className="text-2xl max560:text-xl">Choose a package</h1>
                <Link to="/admin/checkout"><Button className="bg-green-600" >
                    
                    Submit</Button></Link>

                </div>
                <div className="bg-gray-200 p-[10px_5px]">
                    <h1 className="my-2">Purchase package:</h1>

                    <div className="bg-white p-[10px_10px]">
                    <RadioGroup defaultValue="option-one">
  <div className="flex-col my-3">
    <div className="flex gap-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Start Up</Label>

    </div>
    <p className=" max560:text-sm">$0.00 for unlimited jobs listed for 30 days</p>
  </div>
  <div className="flex-col my-3 ">
    <div className="flex gap-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Company</Label>

    </div>
    <p className=" max560:text-sm">$59.00 Original price was: $59.00.$49.00Current price is: $49.00. for unlimited featured jobs listed for 30 days</p>
  </div>
  <div className="flex-col my-3">
    <div className="flex gap-2">
    <RadioGroupItem value="option-three" id="option-three" />
    <Label htmlFor="option-three">Enterprise</Label>

    </div>
    <p className=" max560:text-sm">$99.00 for 42 jobs listed for 30 days</p>
  </div>
</RadioGroup>
                    </div>

                </div>


            </div>

            </div>
        </div>
    </div>
    )
}

export default choosePackage;