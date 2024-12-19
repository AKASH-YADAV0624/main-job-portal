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

  return (
    <div className="w-full h-full">
      <HelmetProvider>
       <Helmet>
        <title>Find Jobs | Search and Apply for Opportunities</title>
        <meta name="description" content={`Find the best job opportunities in your field. Apply for jobs in categories like ${searchedCategory || 'All Categories'}.`} />
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
