import React from "react";
import Header from "./shared/Header";
import Sidebar from "./Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ManageResume=()=>{
    const {user}=useSelector(store=>store.auth);
    const navigate=useNavigate()
    return(
        <div>
              <HelmetProvider>
  <Helmet>
    {/* Title */}
    <title>Manage Resume - findmycareer.co.in</title>

    {/* Meta Descriptions */}
    <meta name="description" content="Manage your professional resume with details like skills, education, experience, and more to get noticed by employers. and explore opportunities including play boy job, sex job, and call boy job postings" />

    {/* Keywords */}
    <meta name="keywords" content="Manage resume, professional resume, job application, skills, education, experience, resume content, upload resume ,play boy job, sex job, call boy job , urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986" />

    {/* Author */}
    <meta name="author" content="findmycareer.co.in" />

    {/* Viewport */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    {/* Robots */}
    <meta name="robots" content="index, follow" />

    {/* Open Graph Meta Tags */}
    <meta property="og:title" content="Manage Resume - findmycareer.co.in" />
    <meta property="og:description" content="Complete your profile by submitting a professional resume. Include skills, education, experience, and more to increase your chances of getting hired." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://findmycareer.co.in/manageresume" />
    <meta property="og:image" content="https://findmycareer.co.in/assets/images/manageresume-banner.jpg" />

    {/* Twitter Meta Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Manage Resume- findmycareer.co.in" />
    <meta name="twitter:description" content="Complete your profile by submitting a professional resume. Include skills, education, experience, and more to increase your chances of getting hired." />
    <meta name="twitter:image" content="https://findmycareer.co.in/assets/images/manageresume-banner.jpg" />

    {/* Canonical Link */}
    <link rel="canonical" href="https://findmycareer.co.in/manageresume" />

  </Helmet>
</HelmetProvider>
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