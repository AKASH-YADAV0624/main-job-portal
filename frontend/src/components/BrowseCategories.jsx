import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedCategory, setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Header from "./shared/Header";
import Job from "./Job";
import MapComponent from "./MapComponent";
import { Button } from "./ui/button";
const BrowseCategories = () => {
  useGetAllJobs();
  const [category, setCategory] = useState("");
  const { allJobs, searchedCategory } = useSelector((store) => store.job);
  const dispatch = useDispatch();
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

  const searchJobHandler = () => {
    dispatch(setSearchedCategory(category)); // Dispatch category
  };

  return (
    <div>
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
          {filteredJobs.length <= 0 ? (
            <span className="text-2xl pl-4">Job not found</span>
          ) : (
            <div className=" grid grid-cols-2 p-9 gap-2 max1024:grid-cols-1">
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

export default BrowseCategories;
