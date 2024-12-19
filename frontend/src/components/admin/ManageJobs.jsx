import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import logo from "@/assets/logouser.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Copy, Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import useGetJobById from "@/hooks/useGetJobById";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ManageJobs = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const params = useParams(); // Get the jobId from the URL
  const [selectedJob, setSelectedJob] = useState(null);
  useGetJobById(params.id);
   useGetAllAdminJobs(); 
  const { allAdminJobs  } = useSelector(store=>store.job);

  const handleDelete = async (jobId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this job?");
      if (!confirmed) return;
  
      const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });
  
      if (response.data.success) {
        toast.success("Job deleted successfully!");
        dispatch({ type: "REMOVE_JOB", payload: jobId }); // Remove the job from Redux state
      } else {
        toast.error("Failed to delete the job.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("An error occurred while deleting the job.");
    }
  };
  const handleDuplicate = (jobId) => {
    navigate(`/admin/duplicatejob/${jobId}`);
  };
    // Fetch and increment views when a job is viewed
    useEffect(() => {
      const jobId = params.id; // get the jobId from URL params
      if (jobId) {
        // Increment views when viewing the job
        axios.get(`${JOB_API_END_POINT}/view/${jobId}`, { withCredentials: true })
          .then((response) => {
            if (response.data.success) {
              console.log("Views incremented");
            } else {
              toast.error("Failed to increment views.");
            }
          })
          .catch((error) => {
            console.error("Error incrementing views:", error);
            toast.error("An error occurred while incrementing views.");
          });
      }
    }, [params.id]);

  // Toggle the job's filled status
  const handleToggleFilled = async (jobId, isFilled) => {
    try {
      const response = await axios.patch(
        `${JOB_API_END_POINT}/toggle-filled/${jobId}`,
        {},
        { withCredentials: true }
      );
  
      if (response.data.success) {
        toast.success(`Job marked as ${isFilled ? "not filled" : "filled"}!`);
  
        // Dispatch an action to update the job status in Redux store
        dispatch({
          type: "UPDATE_JOB_STATUS",
          payload: { jobId, filled: !isFilled },
        });
  
        // Dynamically update selectedJob if it matches the current job
        setSelectedJob((prevJob) => 
          prevJob?._id === jobId ? { ...prevJob, filled: !isFilled } : prevJob
        );
      } else {
        toast.error("Failed to update job status.");
      }
    } catch (error) {
      console.error("Error toggling filled status:", error);
      toast.error("An error occurred while updating job status.");
    }
  };


  return (
    <div>
      <Header />
      <div className="flex ">
        <div className="w-1/5 max1024:w-0">
          <Sidebar />
        </div>
        <div className="w-full p-[25px_20px] bg-gray-100 h-screen max1024:w-full">
          <div>
            <h1 className="text-2xl my-2">Job Dashboard</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>
          </div>
            {/* Display selected job title and status */}
            {selectedJob && (
            <div className="bg-white p-4 mb-4 shadow-md rounded-md my-2">
              <h2 className="text-l font-medium text-gray-800">{selectedJob?.title}   {selectedJob?.filled ? "Has been filled" : "Has been not filled"}</h2>
            
              
             
            </div>
          )}

          <Table className="border my-6 bg-[#fff]">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-[#333] text-white">Title</TableHead>
                <TableHead className="bg-[#333] text-white">Date</TableHead>
                <TableHead className="bg-[#333] text-white">Views</TableHead>
                <TableHead className="text-right text-white bg-[#333]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {allAdminJobs?.map((job) =>(
                <tr  >
                    <TableCell  >
                      {job?.title}
                    </TableCell>
                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                    {/* Displaying views count */}
                    
                    <div className="flex flex-col gap-0  ">
                       <TableCell className="pb-0" >
                   {job?.views || 0} views
                 </TableCell> 
                  <TableCell className="text-xs py-0" >
                   {job?.views || 0} impressions 
                 </TableCell> 

                    </div>
                
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div className="flex gap-2 cursor-pointer"
                           onClick={()=>navigate(`/admin/updatejob/${job._id}`)} >
                         
                            <Edit2 className="w-4 " />
                            <span>Edit</span>
                          </div>
                          <div className="flex gap-2 cursor-pointer"
                             onClick={() => handleDuplicate(job._id)}
                           >
                         
                            <Copy className="w-4 " />
                            <span>Duplicate</span>
                          </div>
                          <div
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                          onClick={() => handleDelete(job._id)}
                        >
                          <Trash2 className="w-4" />
                          <span>Delete</span>
                        </div>
                          <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2 ">
                            <Eye className="w-4"  />
                            <span>Applications</span>
                          </div>
                           {/* Only "Mark Filled" or "Mark Not Filled" should be clickable */}
                        <div
                          className="flex gap-2 cursor-pointer"
                          onClick={() => {
                            handleToggleFilled(job._id, job.filled);
                            setSelectedJob(job); // Set the clicked job as selected
                          }}
                        >
                          <button className="flex items-center">

                          <FontAwesomeIcon icon={faCheck} /> 
                             <span>{job.filled ?  "Mark Not Filled" : "Mark Filled"}</span>
                          </button>
                        </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    </tr>
                )
              )}
            </TableBody>
          </Table>
          <Button
            onClick={() => navigate("/admin/submitjobs")}
            className="bg-green-600 text-white my-1 max560:w-full"
          >
            Add Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
