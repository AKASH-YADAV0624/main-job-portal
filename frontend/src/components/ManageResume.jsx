import React from "react";
import Header from "./shared/Header";
import Sidebar from "./Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ManageResume=()=>{
    const {user}=useSelector(store=>store.auth);
    const navigate=useNavigate()
    return(
        <div>
        <Header/>
        <div className="flex ">
        <div className="h-full w-1/5 max1024:w-0 ">
             <Sidebar/>    
            </div>
            <div className=" w-full h-screen p-[25px_20px] bg-[#d8d8d8]  ">
                <div>
            <h1 className="text-2xl my-3  ">Manage Resume</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>

                </div>

                <div className="my-10 ">
                    <Table >
                        <TableHeader>
                            <TableRow >
                                <TableHead className="bg-gray-800 text-white border-r border-gray-700">Name</TableHead>
                                <TableHead className="bg-gray-800 text-white border-r border-gray-700">Title</TableHead>
                                <TableHead className="bg-gray-800 text-white border-r border-gray-700">Location</TableHead>
                                <TableHead className="bg-gray-800 text-white border-r border-gray-700">Category</TableHead>
                                <TableHead className="bg-gray-800 text-white border-r border-gray-700">Date Posted</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                
                                    <TableRow  >
                                        <TableCell className="bg-white text-green-600">{user?.firstName}</TableCell>
                                        <TableCell className="bg-white text-gray-500">{user?.profile?.title}</TableCell>
                                        <TableCell className=" bg-white text-gray-500">{user?.profile?.location}</TableCell>
                                        <TableCell className="bg-white text-gray-500">{user?.profile?.category}</TableCell>
                                        <TableCell className="bg-white text-gray-500">{user?.createdAt?.split("T")[0]}</TableCell>
                                        
                                    </TableRow>
                               
                            }
                        </TableBody>
                    </Table>
                    <Button  onClick={() => navigate("/addresume")} className="my-5 bg-green-500">Add Resume</Button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ManageResume;