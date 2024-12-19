import React from "react";
import Header from "./shared/Header";
import Sidebar from "./Sidebar";

const Messages=()=>{
    return(
        <div>
            <Header/>
            <div className="flex">
            <div className="h-full w-1/5 max1024:w-0">
                 <Sidebar/>    
                </div>
                <div className="p-[45px_40px]  w-full bg-[#d8d8d8] h-screen max780:p-[20px_20px] ">
                    <h1 className="text-2xl text-black">Messages</h1>
                    <h3 className="text-gray-400 my-2">Home &gt; Dashboard</h3>

                    <div className="bg-[#fff] my-9">
                        <h1 className="pl-8 py-3">Inbox</h1>
                        <hr />
                        <p className="pl-8 py-3">You don't have any message yet</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messages;