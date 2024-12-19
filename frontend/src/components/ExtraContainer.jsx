import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ExtraContainer=()=>{
    return(<>        <div className="h-full w-full bg-[url('assets/banner.png')] bg-cover bg-center items-center flex flex-col p-[40px_20px] my-5">
            <h1 className="text-3xl items-center text-white my-2">Explore a faster, easier, and better job search</h1>
            <p className="text-gray-400 text-2xl ">Unmatched quality of remote, hybrid, and flexible jobs</p>
            <p className="text-gray-400 text-2xl ">Premium skills tests, remote courses, career coaching, and more</p>
            <p className="text-gray-400 text-2xl ">Unmatched quality of remote, hybrid, and flexible jobs</p>
            <Button className="bg-green-500 my-4"><Link to="/Jobs" >Browse Jobs</Link></Button>
        </div>

        <div className="border px-5 py-5 my-10 flex  flex-col items-center">
            <div className=" flex  flex-col items-center ">
            <h1 className="text-3xl my-2">Our Blog</h1>
            <p className="text-gray-400 my-2">See how you can up your career status</p>
            </div>
                
                <h1 className="text-2xl my-2 text-center">Discovering Opportunities: How a Job Portal Can Transform Your Job Search</h1>
                <div className="flex-wrap text-center  gap-2 text-gray-400">
                   <h3 >By call4jobs.com@gmail.com</h3>
                   <h3>October 17, 2024</h3>
                   <h3 >Uncategorized</h3>
                </div>
                <p className="my-2 text-lg text-gray-500 my-2 flex flex-col items-center text-center">In the digital age, job portals have emerged as essential tools for job seekers, providing a centralized platform that simplifies the often overwhelming process of searching for employment opportunities. These online platforms host a vast array of job listings that cater to various industries, skill levels, and geographical locations. By leveraging a job portal, candidates can access a diverse range of opportunities that they may not discover through traditional methods such as newspaper listings or word-of-mouth referrals.</p>
                <p className="my-2 text-lg text-gray-500 my-2  flex-col items-center text-center">One of the significant advantages of utilizing a job portal is the user-friendly search functionality it offers. Job seekers can use filters to narrow down listings by criteria such as job title, location, salary range, or employment type. This enhanced search capability saves valuable time and increases the efficiency of the job search process. Furthermore, many portals provide personalized job alerts, notifying users via email or app notifications when new positions that match their preferences become available. This feature not only keeps seekers informed but also allows them to act promptly, which is crucial in a competitive job market.</p>
                <Button className="bg-green-500 my-4"><Link to="/Blog" >Read More</Link></Button>
             </div>
    </>
    )
}

export default ExtraContainer;