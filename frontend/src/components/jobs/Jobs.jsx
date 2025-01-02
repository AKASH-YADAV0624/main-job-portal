import React, { useEffect } from "react";
import Header from "../shared/Header";
import FilterCard from "../FilterCard";
import Job from "../Job";
import MapComponent from "../MapComponent";
import './Jobs.css';
import { useDispatch, useSelector } from "react-redux";
import { setSearchedCategory, setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedCategory, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

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
     // Job Posting Schema for ItemList
  const jobListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Job Listings",
    "description": `Find and apply to job opportunities in findmycareer like ${searchedCategory || 'All Categories'}.`,
    "itemListElement": filteredJobs.map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "datePosted": job.datePosted,
        "employmentType": job.employmentType,
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Find My Career",
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
        "jobBenefits": job.benefits,
        "salary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": job.salary,
            "unitText": "MONTH"
          }
        }
      }
    }))
  };
  return (
    <div className="w-full h-full">
      <HelmetProvider>
       <Helmet>
       <title>Find Jobs | Search and Apply for Opportunities - findmycareer.co.in</title>
          <meta name="description" content={`Find the best job opportunities in your field on findmycareer.co.in. Apply for jobs in categories like ${searchedCategory || 'All Categories'}.`} />
          <meta name="keywords" content={`find jobs, job search, careers, job listings,play boy job, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986  ${searchedCategory || 'all jobs'}`} />
          <meta name="robots" content="index, follow, max-snippet: -1, max-video-preview: -1, max-image-preview: large" />
          
          {/* Open Graph Tags for Social Media Sharing */}
          <meta property="og:title" content="Find Jobs | Search and Apply for Opportunities  on findmycareer.co.in." />
          <meta property="og:description" content={`Find the best job opportunities in your field findmycareer.co.in. Apply for jobs in categories like ${searchedCategory || 'All Categories'}.`} />
          <meta property="og:image" content="https://findmycareer.co.in/job-portal-thumbnail.jpg" />
          <meta property="og:url" content="https://findmycareer.co.in/jobs" />

          {/* Twitter Card Tags for Twitter Sharing */}
          <meta name="twitter:title" content="Find Jobs | Search and Apply for Opportunities  on findmycareer.co.in." />
          <meta name="twitter:description" content={`Find the best job opportunities in your field findmycareer.co.in. Apply for jobs in categories like ${searchedCategory || 'All Categories'}.`} />
          <meta name="twitter:image" content="https://findmycareer.co.in/job-portal-thumbnail.jpg" />
          
          {/* JSON-LD Schema for Job Postings */}
          {filteredJobs.length > 0 && (
            <script type="application/ld+json">
              {JSON.stringify(jobListSchema)}
            </script>
          )}

          {/* Mobile Optimization Viewport */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Canonical Link to Avoid Duplicate Content */}
          <link rel="canonical" href="https://findmycareer.co.in/jobs" />
      </Helmet>
      </HelmetProvider>
      <Header />
      <div className="flex h-screen">
        <div className="w-1/2 overflow-auto max-h-screen max650:w-full">
          <div className="p-9 max560:p-2">
            <h1 className="text-2xl">Find Job</h1>
            <FilterCard />
          </div>
          {filteredJobs.length <= 0 ? (
            <span className="text-2xl pl-3">Job not found</span>
          ) : (
            <div className="grid grid-cols-2 p-9 gap-2  max1024:grid-cols-1 gap-5   max560:p-2 ">
              {filteredJobs.map((job) => {
                return <Job key={job._id} job={job} />;
              })}
            </div>
          )}
        </div>

        <div className="w-1/2 position-static max650:hidden">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
