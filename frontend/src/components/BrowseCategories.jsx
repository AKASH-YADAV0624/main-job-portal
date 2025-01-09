import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedCategory, setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Header from "./shared/Header";
import Job from "./Job";
import MapComponent from "./MapComponent";
import { Button } from "./ui/button";
import { Helmet, HelmetProvider } from "react-helmet-async";
const BrowseCategories = () => {
  useGetAllJobs();
  const [category, setCategory] = useState("");
  const { allJobs, searchedCategory } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const jobsPerPage = 15; // Number of jobs per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  useEffect(() => {
    return () => {
      dispatch(setSearchedCategory(""));
    };
  }, []);
  // Filter jobs based on both searchedQuery and searchedCategory
  const filteredJobs = allJobs.filter((job) => {
    const matchesCategory = searchedCategory
      ? job.category === searchedCategory
      : true;
    return matchesCategory;
  });
  // Pagination: Calculate jobs to display for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
// Job Posting Schema for ItemList
const jobListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Job Listings",
  "description": `Find and apply to job opportunities in findmycareer like ${searchedCategory || 'All Categories'}.`,
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

const fallbackSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Jobs at Find My Career",
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

  const searchJobHandler = () => {
    dispatch(setSearchedCategory(category)); // Dispatch category
   
  };

  return (
    <div>
       <HelmetProvider>
            <Helmet>
              <title>Browse Categories - findmycareer.co.in</title>
              <meta
                name="description"
                content="Browse through a list of qualified candidates on FindMyCareer. Search for job candidates based on skills, experience, play boy , callboy and location."
              />
              <meta
                name="keywords"
                content="candidates, job seekers, play boy job since yesterday, find candidates, skilled professionals, play boy job, sex job, call boy job , urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986, findmycareer"
              />
              <meta name="author" content="findmycareer.co.in" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta property="og:title" content="Browse Categories - findmycareer.co.in" />
              <meta
                property="og:description"
                content="Browse a wide selection of job categories on FindMyCareer. Find your next hire easily by filtering through qualified candidates."
              />
              <meta property="og:type" content="website" />
              <meta
                property="og:url"
                content="https://findmycareer.co.in/browsecategories"
              />
              <meta
                property="og:image"
                content="https://findmycareer.co.in/assets/categories-preview.png"
              />
              <link
                rel="canonical"
                href="https://findmycareer.co.in/browsecategories"
              />
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
      <div className="flex h-screen ">
        <div className="w-1/2 overflow-auto max-h-screen max650:w-full">
          <div className="p-9">
            <h1 className="text-2xl">Find Job By Category</h1>
            <div className="searc-fields my-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Category</option>
                <option value="Accounting/Finance">Accounting/Finance</option>
                <option value="Automative Jobs">Automative Jobs</option>
                <option value="Construction/Facilities">
                  Construction/Facilities
                </option>
                <option value="Customer service">Customer service</option>
                <option value="Education Training">Education Training</option>
                <option value="Freshers jobs">Freshers jobs</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Part time job">Part time job</option>
                <option value="Market & Customer Research">
                  Market & Customer Research
                </option>
                <option value="Others">Others</option>
                <option value="Restaurant/Food Service">
                  Restaurant/Food Service
                </option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Transportation / Logistics">
                  Transportation / Logistics
                </option>
                <option value="Work from home">Work from home</option>
                <option value="others">Others</option>
                {/* Add other categories as needed */}
              </select>
              <Button  onClick={searchJobHandler} className="my-2 bg-green-600" > Search</Button>
            </div>
          </div>
          {currentJobs.length <= 0 ? (
            <span className="text-2xl pl-4">Job not found</span>
          ) : (
            <div className=" grid grid-cols-2 p-9 gap-2 max1024:grid-cols-1">
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

export default BrowseCategories;
