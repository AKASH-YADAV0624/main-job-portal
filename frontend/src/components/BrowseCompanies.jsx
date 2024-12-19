import React, { useEffect, useState } from "react";
import Header from "./shared/Header";
import CompanyContainer from "./ComapnyContainer";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const BrowseCompanies=()=>{
    const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response= await axios.get(`${COMPANY_API_END_POINT}/all`,{withCredentials:true});
                
              
                  
       
        setCompanies(response.data.companies);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load companies.");
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
    return(
        <div>
            <Header/>
            <div>
                <div className="p-[45px_40px] bg-gray-200 max560:p-[20px_10px]">
                    <h1 className="text-2xl">Showing all companies</h1>

                    <div>
                    {
                      companies.length <= 0?<span className="text-2xl pl-3"> Company not found</span>:(
                        
                       <div className=" grid grid-cols-2 p-9 gap-2  max1024:grid-cols-1 p-2 max560:p-1">
                          {
                          companies.map((company)=>{
                              return(
                            
                             
                                <CompanyContainer key={company._id} company={company} />
                               
                        )
                          
})}
                       </div>
                      )
                      }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default BrowseCompanies;