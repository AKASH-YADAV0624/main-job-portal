import React, { useEffect, useState } from "react";
import Header from "./shared/Header";
import CompanyContainer from "./ComapnyContainer";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";

const BrowseCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/all`, {
          withCredentials: true,
        });

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
   // JSON-LD ItemList Schema for the Browse Companies page
   const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Browse Companies",
    "description": "A list of companies available for browsing by the admin at findmycareer.",
    "url": "https://findmycareer.co.in/admin/browsecompanies",
    "itemListElement": companies.map((company, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://findmycareer.co.in/companydescription/${company._id}`,
      "name": company.name,
    })),
  };

  return (
    <div>
      <HelmetProvider>
      <Helmet>
        <title>Browse Companies - findmycareer.co.in</title>
        <meta name="description" content="Browse companies and explore job opportunities with FindMyCareer. Discover organizations that are hiring." />
        <meta name="keywords" content="play boy job, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986 " />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Browse Companies -  findmycareer.co.in" />
        <meta property="og:description" content="Browse companies and explore job opportunities with FindMyCareer. Discover organizations that are hiring." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://findmycareer.co.in/admin/browsecompanies" />
        <meta name="twitter:title" content="Browse Companies - findmycareer.co.in" />
        <meta name="twitter:description" content="Browse companies and explore job opportunities with FindMyCareer. Discover organizations that are hiring." />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href="https://findmycareer.co.in/admin/browsecompanies" />
         {/* JSON-LD Schema for the page */}
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        
      </Helmet>
      </HelmetProvider>
      <Header />
      <div>
        <div className="p-[45px_40px] bg-gray-200 max560:p-[20px_10px]">
          <h1 className="text-2xl">Showing all companies</h1>

          <div>
            {companies.length <= 0 ? (
              <span className="text-2xl pl-3"> Company not found</span>
            ) : (
              <div className=" grid grid-cols-2 p-9 gap-2  max1024:grid-cols-1 p-2 max560:p-1">
                {companies.map((company) => {
                  return (
                    <CompanyContainer key={company._id} company={company} />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCompanies;
