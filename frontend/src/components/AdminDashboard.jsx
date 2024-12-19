import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADMIN_API_END_POINT } from "@/utils/constant";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]); // State to store pending jobs
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); // Fetch user from Redux store
  const [companies, setCompanies] = useState([]);

  // Fetch pending jobs for admin approval
  const fetchPendingJobs = async () => {
    try {
      const response = await axios.get(`${ADMIN_API_END_POINT}/pending-jobs`, {
        withCredentials: true, // Send cookies with request
      });
      setJobs(response.data.jobs); // Update jobs state
    } catch (error) {
      console.log("Error fetching pending jobs:", error.response?.data?.message);
    }
  };
   // Fetch pending companies for admin approval
   const fetchPendingCompanies = async () => {
    try {
      const response = await axios.get(`${ADMIN_API_END_POINT}/pending`, {
        withCredentials: true, // Send cookies with request
      });
      setCompanies(response.data.companies); // Update companies state
    } catch (error) {
      console.log(
        "Error fetching pending companies:",
        error.response?.data?.message
      );
    }
  };

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Unauthorized! Admin access only.");
      navigate("/login");
    } else {
      fetchPendingJobs();
       // Fetch jobs if user is an admin
       fetchPendingCompanies(); // Fetch companies if user is an admin
    }
  }, [user, navigate]);

  // Approve a job
  const handleApprove = async (jobId) => {
    try {
      await axios.put(`${ADMIN_API_END_POINT}/approve-job/${jobId}`, null, {
        withCredentials: true,
      });
      alert("Job Approved Successfully!");
      fetchPendingJobs(); // Refresh the job list
    } catch (error) {
      console.log("Error approving job:", error.response?.data?.message);
    }
  };

  // Reject a job
  const handleReject = async (jobId) => {
    try {
      await axios.put(`${ADMIN_API_END_POINT}/reject-job/${jobId}`, null, {
        withCredentials: true,
      });
      alert("Job Rejected Successfully!");
      fetchPendingJobs(); // Refresh the job list
    } catch (error) {
      console.log("Error rejecting job:", error.response?.data?.message);
    }
  };
   // Approve a company
   const handleApproveCompany = async (companyId) => {
    try {
      await axios.patch(`${ADMIN_API_END_POINT}/approve/${companyId}`, null, {
        withCredentials: true,
      });
      alert("Company Approved Successfully!");
      fetchPendingCompanies(); // Refresh the company list
    } catch (error) {
      console.log(
        "Error approving company:",
        error.response?.data?.message
      );
    }
  };

  // Reject a company
  const handleRejectCompany = async (companyId) => {
    try {
      await axios.patch(`${ADMIN_API_END_POINT}/reject/${companyId}`, null, {
        withCredentials: true,
      });
      alert("Company Rejected Successfully!");
      fetchPendingCompanies(); // Refresh the company list
    } catch (error) {
      console.log(
        "Error rejecting company:",
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
    
    {/* Pending Jobs Section */}
    <h2 className="text-xl font-semibold mb-4">Pending Jobs</h2>
    {jobs?.length === 0 ? (
      <p>No pending jobs available.</p>
    ) : (
      jobs?.map((job) => (
        <div
          key={job._id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-gray-100"
        >
          <h3 className="text-2xl font-bold">{job?.title}</h3>
          <p className="text-gray-700">{job?.description}</p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Company:</strong> {job.companyName}
          </p>
          <div className="mt-4">
            <button
              onClick={() => handleApprove(job._id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(job._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))
    )}

    {/* Pending Companies Section */}
    <h2 className="text-xl font-semibold mt-6 mb-4">Pending Companies</h2>
    {companies?.length === 0 ? (
      <p>No pending companies available.</p>
    ) : (
      companies?.map((company) => (
        <div
          key={company._id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-gray-100"
        >
          <h3 className="text-2xl font-bold">{company?.name}</h3>
          <p className="text-gray-700">{company?.description}</p>
          <p>
            <strong>Location:</strong> {company.location}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={company.website} target="_blank" rel="noreferrer">
              {company.website}
            </a>
          </p>
          <div className="mt-4">
            <button
              onClick={() => handleApproveCompany(company._id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleRejectCompany(company._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);
};

export default AdminDashboard;
