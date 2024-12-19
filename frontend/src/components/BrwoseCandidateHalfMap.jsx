import React, { useEffect, useState } from "react";

import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import Header from "./shared/Header";
import CandidateContainer from "./CandidateContainer";
import MapComponent from "./MapComponent";

const BrowseCandidateHalfMap=()=>{
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${USER_API_END_POINT}/candidates`, {
          withCredentials: true,
        });
        const { candidates, totalPages } = response.data;
        setCandidates(candidates);
      
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load candidates.");
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCandidates();
    }, []);
  
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div>
        <div>
          <Header />
          
          <div>
            <div className="p-[45px_40px] bg-gray-200">
              <h1 className="text-2xl my-2">Showing all candidates</h1>
              <div className=" w-1/2">
                  < MapComponent/>
                </div>
  
              <div>
                {candidates.length <= 0 ? (
                  <span className="text-2xl pl-3"> Company not found</span>
                ) : (
                  <div className=" grid grid-cols-2 p-9 gap-2">
                    {candidates.map((candidate) => {
                      return (
                        <CandidateContainer
                          key={candidate._id}
                          candidate={candidate}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  
      </div>
    );
  };
  

export default BrowseCandidateHalfMap;