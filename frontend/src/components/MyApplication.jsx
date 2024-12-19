import React from "react";
import Header from "./shared/Header";
import Sidebar from "./Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyApplication=()=>{
    useGetAppliedJobs()
    const {allAppliedJobs} = useSelector(store=>store.job);
    const navigate=useNavigate()
    return(
        <div>
            <Header/>
            <div className="flex ">
            <div className="h-full w-1/5 max1024:w-0">
                 <Sidebar/>    
                </div>
                <div className=" w-full h-screen p-[25px_20px] bg-[#d8d8d8]  max560:p-[25px_10px] ">
                    <div>
                <h1 className="text-2xl my-3  ">Past Applications</h1>
                <h3 className="text-gray-500">Home &gt; Dashboard</h3>

                    </div>

                    <div className="my-10 ">
                        <Table>
                            <TableHeader>
                                <TableRow >
                                    <TableHead className="bg-gray-800 text-white border-r border-gray-700">Job</TableHead>
                                    <TableHead className="bg-gray-800 text-white border-r border-gray-700">Date Applied</TableHead>
                                    <TableHead className="bg-gray-800 text-white border-r border-gray-700">Status</TableHead>
                                    <TableHead className="bg-gray-800 text-white border-r border-gray-700">Company</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    allAppliedJobs?.length <= 0? <span>You haven't applied any job yet.</span> : allAppliedJobs?.map((appliedJob)=>(
                                        <TableRow  key={appliedJob._id}>
                                            <TableCell className="cursor-pointer text-green-600" 
                                               onClick={() => navigate(`/description/${appliedJob._id}`)}>
                                                {appliedJob?.job?.title}</TableCell>
                                            <TableCell className="text-gray-500">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                            <TableCell className="text-gray-500">{appliedJob?.status}</TableCell>
                                            <TableCell className="text-gray-500">{appliedJob?.job?.company?.name}</TableCell>
                                            
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyApplication;