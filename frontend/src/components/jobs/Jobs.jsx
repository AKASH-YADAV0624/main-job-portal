import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import FilterCard from "../FilterCard";
import Job from "../Job";
import './Jobs.css';
import { useDispatch, useSelector } from "react-redux";
import { setSearchedCategory, setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Helmet, HelmetProvider } from "react-helmet-async";


const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedCategory, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
 
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15; // Change this value to control how many jobs are shown per page
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
}
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
      dispatch(setSearchedCategory(""));
    };
  }, []);

  // Filter jobs based on both searchedQuery and searchedCategory
  const filteredJobs = allJobs.filter((job) => {
    const matchesQuery = job.title.toLowerCase().includes(searchedQuery.toLowerCase());
    const matchesCategory = searchedCategory ? job.category === searchedCategory : true;
    return matchesQuery && matchesCategory;
  });

  // Paginate filtered jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Job Posting Schema for ItemList
  const jobListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Job Listings",
    "description": `Find and apply to job opportunities on findmycareer.co.in like ${searchedCategory || 'All Categories'}.`,
    "itemListElement": currentJobs.map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://findmycareer.co.in/description/${job.slug}`,
      "item": {
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "datePosted": job?.createdAt?.split("T")[0] || new Date().toISOString().split("T")[0],
        "employmentType": job.employmentType,
        "hiringOrganization": {
          "@type": "Organization",
          "name": "findmycareer.co.in",
          "sameAs": "https://findmycareer.co.in"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location,
            "addressCountry": "IN"
          }
        },
        "jobBenefits": job.benefits || "Not specified",  // Fallback value for job benefits
        "salary": job.minimumSalary ? {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": job.minimumSalary,
            "unitText": "MONTH"
          }
        } : undefined // Only include salary if minimumSalary is present
      }
    }))
  };
  
  const fallbackSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "findmycareer.co.in",
    "description": "Explore job opportunities in various categories like play boy call boy job sex call boy job. No jobs found for the current filters.",
    "url": "https://findmycareer.co.in/jobs",
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full h-full">
      <HelmetProvider>
        <Helmet>
          <title>Find Jobs | Search and Apply for Opportunities - findmycareer.co.in</title>
          <meta name="description" content={`Find the best job opportunities in your field on findmycareer.co.in. Apply for jobs in categories like ${searchedCategory || 'All Categories'}.`} />
          <meta name="keywords" content={` play boy job, play boy job since yesterday, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs, 8505994986 ,find jobs, job search, careers, job listings, ${searchedCategory || 'all jobs'}`} />
          <meta name="robots" content="index, follow, max-snippet: -1, max-video-preview: -1, max-image-preview: large" />
          <meta property="og:title" content="Find Jobs | Search and Apply for Opportunities  on findmycareer.co.in." />
          <meta property="og:description" content={`Find the best job opportunities in your field findmycareer.co.in. Apply for jobs in categories like ${searchedCategory || 'All Categories'}.`} />
          <meta property="og:image" content="https://findmycareer.co.in/job-portal-thumbnail.jpg" />
          <meta property="og:url" content="https://findmycareer.co.in/jobs" />
          <meta name="twitter:title" content="Find Jobs | Search and Apply for Opportunities  on findmycareer.co.in." />
          <meta name="twitter:description" content={`Find the best job opportunities in your field findmycareer.co.in. Apply for jobs in categories like ${searchedCategory || 'All Categories'}.`} />
          <meta name="twitter:image" content="https://findmycareer.co.in/job-portal-thumbnail.jpg" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://findmycareer.co.in/jobs" />
          {currentJobs.length > 0 && (
            <script type="application/ld+json">
              {JSON.stringify(jobListSchema)}
            </script>
          )}
          {currentJobs.length === 0 && (
            <script type="application/ld+json">
              {JSON.stringify(fallbackSchema)}
            </script>
          )}
         
        </Helmet>
      </HelmetProvider>
      <Header />
      <div className="flex h-screen">
        <div className="w-1/2 overflow-auto max-h-screen max650:w-full">
          <div className="p-9 max560:p-2">
            <span className="text-2xl">Find Job</span>
            <FilterCard />
          </div>
          {currentJobs.length <= 0 ? (
            <div className="text-center">
              <span className="text-2xl">No jobs found in this category.</span>
              <p className="mt-4">
                Try searching for other categories or browse <a href="/browsecategories" className="text-blue-500">all categories</a>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 p-9 gap-2 max1024:grid-cols-1 gap-5 max560:p-2">
              {currentJobs.map((job) => {
                return <Job key={job._id} job={job} />;
              })}
            </div>
          )}
          <div className="pagination-controls flex justify-center mt-4 my-2 ">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mr-4  bg-zinc-500 rounded text-white px-2 py-2">
              Previous
            </button>
            <span className=" flex items-center ">{currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="ml-4 bg-zinc-500 rounded text-white px-2 py-2">
              Next
            </button>
          </div>
        </div>

        <div className="w-1/2 position-static max650:hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1717.4428269796258!2d-1.6242033!3d54.9755502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e7734dc20d87b%3A0x2e911404fa537b88!2sSt.%20James'%20Park!5e0!3m2!1sen!2s!4v1695735567996!5m2!1sen!2s
" className="w-full h-full " loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
