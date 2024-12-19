import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Link } from "react-router-dom";


const shortListingStatus=["Accepted","Rejected"];

const ApplicantsTable=()=>{
    const {applicants}=useSelector(store=>store.application);
    const statusHandler =async(status,id)=>{
        try{
            axios.defaults.withCredentials= true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status})
            
            
            if(res.data.success){
                toast.success(res.data.message);
            }
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    
    return(
        <div>
            <Table>
                <TableCaption> A list of your recent applied user </TableCaption>
                <TableRow>
                    <TableHead>fullName</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item)=>(
                            <tr key={item._id}>
                             <TableCell><Link to={`/candidatedescription/${item?.applicant?._id}`} className="text-green-600 hover:underline">{item?.applicant?.username}</Link></TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber} </TableCell>
                           
                            
                            <TableCell>
                                {
                                 item?.applicant?.profile?.resume ?<a href={item?.applicant?.profile?.resume}>{item?.applicant?.profile?.resumeOriginalName}</a>:<span>NA</span>
                                }
                                
                                {}</TableCell>  
                            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                       <MoreHorizontal/> 
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                    {
                                    shortListingStatus.map((status,index)=>{
                                        return(
                                            <div className="cursor-pointer" onClick={()=> statusHandler(status,item?._id)} key={index}>
                                                <span>{status}</span>
    
                                            </div>
                                        )
                                    })
                                }
                                    </PopoverContent>
                                </Popover>
                               
                            </TableCell>
                        </tr>
                        ))
                    }
                   
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;