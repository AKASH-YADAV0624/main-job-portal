import React, { useEffect, useMemo, useState } from "react";
import Header from "./shared/Header";
import { Badge } from "./ui/badge";
import { faBusinessTime, faCalendarDays, faEnvelope, faLink, faMapLocationDot, faMoneyCheckDollar, faStar, faUserTie } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { addBookmark, removeBookmark } from "@/redux/bookmarkSlice";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const JobDescription=()=>{
    const {singleJob}=useSelector(store=>store.job);
  const { bookmarks } = useSelector((store) => store.bookmark);
    const {user}=useSelector(store=>store.auth);
    const isIntiallyApplied=singleJob?.applications?.some(application=>application.applicant ===user?._id) || false;
    const [isApplied,setIsApplied]=useState(isIntiallyApplied)
  
    

    const params = useParams(); // Now we're expecting a 'slug' from the URL
  const {  slug } = params; // Extract the slug from the URL params
 
    const dispatch=useDispatch()
    const applyJobHandler= async()=>{
        try{
            const res= await axios.get(`${APPLICATION_API_END_POINT}/apply/${singleJob._id}`,{withCredentials:true});
            if(res.data.success){
                setIsApplied(true);//update the local state
                const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob))  //helps us to real time ui update
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    
  
    useEffect(()=>{
        const fetchSingleJobs= async()=>{
            try{
                const res= await axios.get(`${JOB_API_END_POINT}/getslug/${slug}`,{withCredentials:true});
              
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id))//ensure the state is in sync with fetch data
                }
            }catch(error){
                console.log(error);
            }
        }
        axios.get(`${JOB_API_END_POINT}/view/${singleJob._id}`, { withCredentials: true })
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


        fetchSingleJobs();
    },[slug,dispatch,user?._id])
 

    const daysAgoFunction=(mongodbTime)=>{
        const createdAt=new Date(mongodbTime);
        const currentTime=new Date();
        const timeDifference=currentTime-createdAt;
        return Math.floor(timeDifference/(1000*24*60*60) );
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const isBookmarked = bookmarks.some((job) => job._id === singleJob?._id);

  const handleBookmarkSubmit = () => {
    if (message.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }

    dispatch(
      addBookmark({
        ...singleJob,
        message,
      })
    );
    toast.success("Job bookmarked successfully.");
    setIsModalOpen(false);
    setMessage("");
  };

  const handleRemoveBookmark = () => {
    dispatch(removeBookmark(singleJob._id));
    toast.success("Bookmark removed successfully.");
  };

  const dynamicDescription = useMemo(() => {
    return `${singleJob?.title || ""} in ${singleJob?.location || ""}. Apply for ${singleJob?.category || ""} Find job opportunities like play boy job, asex job, and more on findmycareer.co.in.`;
  }, [singleJob]);
  
  const dynamicKeywords = useMemo(() => {
    return [
      singleJob?.title,
      singleJob?.category,
      singleJob?.location,
      "play boy job",
      "asex job",
      "findmycareer",
      "job portal",
    ]
      .filter(Boolean)
      .join(", ");
  }, [singleJob]);
  
  const generateSchemaMarkup = () => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: singleJob?.title || "",
    description: singleJob?.description || "",
    employmentType: singleJob?.jobType || "Full-Time",
    industry: singleJob?.category || "General",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: singleJob?.location || "Unknown",
        addressRegion: singleJob?.region || "Unknown",
        addressCountry: singleJob?.country || "Unknown",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: singleJob?.baseSalary || "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: singleJob?.minimumSalary || 0,
        maxValue: singleJob?.maximumSalary || 0,
        unitText: "MONTH",
      },
    },
    datePosted: singleJob?.createdAt?.split("T")[0]  || new Date().toISOString().split("T")[0],
    validThrough: singleJob?.closingDate?.split("T")[0] || "2025-12-31T23:59:59",
    hiringOrganization: {
      "@type": "Organization",
      name: singleJob?.company?.name || "Unknown",
      sameAs: singleJob?.company?.website || "https://findmycareer.co.in",
    },
  });
  
  
    return(
        <div>
         <HelmetProvider>
        <Helmet>
          <title>{singleJob?.title  || "Job Description"} - findmycareer.co.in</title>
          <meta name="description" content={dynamicDescription  || "Find your next career opportunity on findmycareer.co.in"} />
           <meta name="keywords" content={`play boy job, play boy job since yesterday, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986 ,${dynamicKeywords}`} />
          <meta name="robots" content="index, follow, max-snippet: -1, max-video-preview: -1, max-image-preview: large" />
         
          
          <link rel="canonical" href={`https://findmycareer.co.in/description/${slug}`} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={`${singleJob?.title} - findmycareer.co.in`} />
          <meta property="og:description" content={dynamicDescription} />
          <meta property="og:url" content={`https://findmycareer.co.in/description/${slug}`} />
          <meta property="og:site_name" content="findmycareer.co.in" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${singleJob?.title} - findmycareer.co.in`} />
          <meta name="twitter:description" content={dynamicDescription} />
          <script type="application/ld+json">
      {JSON.stringify(generateSchemaMarkup())}
    </script>
        </Helmet>
      </HelmetProvider>
            <Header/> 
        <div className="max-w-7xl mx-40 my-10  max1024:mx-5 ">
            <div className="flex  justify-between items-center max650:flex-wrap gap-3">
                <div>
                    <div>

            <h2 className="flex flex-wrap color-gray-400 text-l my-3">{singleJob?.category || ""}</h2>
                    </div>
            
            <h1 className="color-black text-2xl">{singleJob?.title}</h1> 
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className={'bg-blue-700 text-white font bold'} variant="ghost" >{singleJob?.jobType[0]}</Badge>
                <Badge className={'bg-[#F83002] text-white font bold'} variant="ghost" >{singleJob?.jobType[1]}</Badge>
                <Badge className={'bg-[#4CBB17] text-white font bold'} variant="ghost" >{singleJob?.jobType[2]}</Badge>
                <Badge className={'bg-[#FF5733] text-white font bold'} variant="ghost" >{singleJob?.jobType[3]}</Badge>
                <Badge className={'bg-[#FF5733] text-white font bold'} variant="ghost" >{singleJob?.jobType[4]}</Badge>
            </div>

                </div>

                <div>
      <button
        onClick={isBookmarked ? handleRemoveBookmark : () => setIsModalOpen(true)}
        className={`rounded ${
          isBookmarked
            ? "bg-black text-white py-3 px-3 max650:text-sm"
            : "bg-[#faf1c8] text-[#a38948] py-3 px-3"
        }`}
      >
        {isBookmarked ? "Remove from bookmark" : "Bookmark This Job"}
      </button>

      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 max650:text-sm">
        Bookmark This Job
      </h2>
      <textarea
        placeholder="Enter a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
        rows="4"
      ></textarea>
      <div className="flex justify-end gap-4">
        <button
          onClick={handleBookmarkSubmit}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>


            </div>

            <div className="flex gap-2 flex-wrap my-8 p-4 pl-10 pr-5  justify-between items-center color-[#fff]  border-gray-300 shadow-lg max650:p-0">
                <div className="flex items-center flex-wrap">   
                <div className="flex w-1/5 items-center gap-2 my-2 pr-2.5 max560:w-9/12 px-2 ">
              
              <Avatar>
                  <AvatarImage  src={singleJob?.company?.logo}/>
              </Avatar>
          
      </div>
      <div>

      <h1 className="color-black text-2xl px-2 ">{singleJob?.company?.name}</h1>
                  <p className="text-gray-400 px-2 ">{singleJob?.company?.name}</p>
                  <Button className="my-2 mx-2  bg-gray-300 text-gray-500 cursor-pointer rounded  px-2 py-2"><FontAwesomeIcon icon={faEnvelope} /> {singleJob?.applicationEmail}</Button>
                                    <Button className="my-2 mx-2 bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2"><FontAwesomeIcon icon={faMapLocationDot}/> {singleJob?.jobRegion}</Button>
                                    <Button className="my-2 mx-2  bg-gray-300 text-gray-500 cursor-pointer rounded px-2 py-2"><FontAwesomeIcon icon={faLink} /> {singleJob?.externalLink}</Button>
                                    
      </div>
                  
                
                  
                </div>
                <div>
                    <Button  
                    onClick={isApplied?null :applyJobHandler}
                    disabled={isApplied}
                     className={`rounded-lg m-2 ${isApplied?'bg-gray-400 cursor-not-allowed':'bg-green-600 text-white py-3 px-7 rounded '}`}>{isApplied?'Already Applied':'Apply for Job'}</Button>
                </div>
            </div>
            <div className="flex flex-wrap  gap-10">
                <div  className="w-3/4 max780:w-full">
                 <p  className="my-2 text-lg text-gray-500">{singleJob?.description}</p>
                </div>

                <div >
                    <h2 className="text-2xl text-black">Job overview</h2>
                    <div className="p-[35px_38px_31px_38px] max1024:p-0">
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />
                        <div className="my-2">
                    <h3 className="font-medium text-black ">Date Posted:</h3>
                    <h3 className="text-gray-500">{daysAgoFunction(singleJob?.createdAt)===0?"Today":`${daysAgoFunction(singleJob?.createdAt)} days ago`}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBusinessTime} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">Closing Date:</h3>
                    <h3 className="text-gray-500">{singleJob?.closingDate?.split("T")[0]}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMoneyCheckDollar} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">Rate:</h3>
                    <h3 className="text-gray-500">{singleJob?.minimumRate} - {singleJob?.maximumRate}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapLocationDot} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">location:</h3>
                    <h3 className="text-gray-500">{singleJob?.location}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserTie} className="text-2xl text-green-800 bg-green-100 px-2 py-2" />    
                        <div className="my-2">
                    <h3 className="font-medium text-black">job title:</h3>
                    <h3 className="text-gray-500"> {singleJob?.title}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
  <FontAwesomeIcon
    icon={faMoneyCheckDollar}
    className="text-2xl text-green-800 bg-green-100 px-2 py-2"
  />
  <div className="my-2">
    <h3 className="font-medium text-black">Salary:</h3>
    <h3 className="text-gray-500">
      {singleJob?.minimumSalary
        ? `$${singleJob.minimumSalary} - $${singleJob.maximumSalary}`
        : "Not Specified"}
    </h3>
  </div>
</div>

                    </div>
                  
                </div>
                
            </div>
        </div>
        </div>
    )
}

export default JobDescription;
