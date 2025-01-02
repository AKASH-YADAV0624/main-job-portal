import React from 'react';
import SearchBar from '@/components/searchbar/SearchBar';
import PopularCategory from '@/components/popularcategory/PopularCategory';
import RecentJobs from '@/components/Recentjobs/RecentJobs';
import Footer from '@/components/Footer';
import Header from '@/components/shared/Header'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import ExtraContainer from '@/components/ExtraContainer';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const HomePage = () => {
  useGetAllJobs();
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home - findmycareer.co.in",
    "url": "https://findmycareer.co.in",
    "description": "Browse job listings and find the perfect career opportunity in findmycareer or hire top talent in various industries. Start your job search today!",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://findmycareer.co.in"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Find My Career",
      "url": "https://findmycareer.co.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://findmycareer.co.in/#logo",
        "width": 250,
        "height": 60
      }
    },
    "mainEntity": {
      "@type": "JobPosting",
      "title": "Playboy Job ,Asex playboy job , call sex boy job",
      "description": "Explore job opportunities including playboy jobs, asex jobs, and call boy jobs. Apply now on Find My Career.",
      "datePosted": "2025-01-02",
      "employmentType": ["FULL_TIME", "PART_TIME", "FREELANCE"],
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Find My Career",
        "sameAs": "https://findmycareer.co.in"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "India",
          "addressCountry": "IN"
        }
      },
      "jobBenefits": "Competitive salary, flexible hours, and remote opportunities.",
      "industry": "Various",
      "qualifications": "No specific qualifications required for some roles.",
      "responsibilities": "Responsibilities vary by job type.",
      "skills": "Varied based on job requirements.",
      "salary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": "As per job description",
          "unitText": "MONTH"
        }
      }
    }
  };
  return (
    <div>
      <HelmetProvider>
      <Helmet>
        <title>Home - findmycareer.co.in</title>
        <meta name="description" content="Welcome to findmycareer ,Browse job listings and find the perfect career opportunity in findmycareer or hire top talent in various industries. Start your job search today! , find play boy job , asex job , sexjob , call boy job " />
        <meta name="keywords" content=" job search, find jobs, hiring, careers, job listings, recruitment ,play boy job, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986" />
        <meta name="robots" content="index, follow, max-snippet: -1, max-video-preview: -1, max-image-preview: large" />
        
        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:title" content="Job Portal | Find Your Dream Job and Talented Candidates  on findmycareer.co.in" />
        <meta property="og:description" content="Browse job listings and find the perfect career opportunity or hire top talent in various industries. Start your job search today!find play boy job , asex job , sexjob , call boy job " />
        <meta property="og:image" content="https://findmycareer.co.in/job-portal-thumbnail.jpg" />
        <meta property="og:url" content="https://findmycareer.co.in" />
        
        {/* Twitter Card Tags for Twitter Sharing */}
        <meta name="twitter:title" content="Job Portal | Find Your Dream Job and Talented Candidates on findmycareer.co.in" />
        <meta name="twitter:description" content="Explore job opportunities and apply for your next job or hire the best candidates through our job portal ,find play boy job , asex job , sexjob , call boy job " />
        <meta name="twitter:image" content="adpost.svg" />
        
        {/* Mobile Optimization Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical Link to Avoid Duplicate Content */}
        <link rel="canonical" href="https://findmycareer.co.in" />
        <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
      </Helmet>
      </HelmetProvider>
        <Header/>
        <SearchBar />
        <PopularCategory/>
        <RecentJobs/>
        <ExtraContainer/>
        <Footer/>

    </div>
  );
};

export default HomePage;
