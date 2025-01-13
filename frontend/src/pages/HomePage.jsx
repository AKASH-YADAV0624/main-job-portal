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
  


    // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "findmycareer.co.in",
    "url": "https://findmycareer.co.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://findmycareer.co.in/logo.png",
      "width": 250,
      "height": 60
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8505994986",
      "contactType": "Customer Support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/findmycareer",
      "https://www.twitter.com/findmycareer",
      "https://www.linkedin.com/company/findmycareer"
    ]
  };

  // WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home - findmycareer.co.in",
    "url": "https://findmycareer.co.in",
    "description": "Browse job listings and find the perfect career opportunity or hire top talent in various industries. Start your job search today find play boy jobs , call boy jobs , urgent hiring for men to work as play boy ,",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://findmycareer.co.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Jobs",
          "item": "https://findmycareer.co.in/jobs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Job Description",
          "item": "https://findmycareer.co.in/description/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Browse companies",
          "item": "https://findmycareer.co.in/browsecompanies"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Browse categories",
          "item": "https://findmycareer.co.in/browsecategories"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "findmycareer.co.in",
      "url": "https://findmycareer.co.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://findmycareer.co.in/logo.png",
        "width": 250,
        "height": 60
      }
    }
  }

const searchActionSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://findmycareer.co.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://findmycareer.co.in/jobs?query={search_term_string}&category={category}",
    "query-input": [
      "required name=search_term_string",
      "optional name=category"
    ]
  }
};

  return (
    <div>
      <HelmetProvider>
      <Helmet>
        <title>Home - findmycareer.co.in</title>
        <meta name="description" content="Welcome to findmycareer ,Browse job listings and find the perfect career opportunity in findmycareer or hire top talent in various industries. Start your job search today! , find play boy job , asex job , sexjob , call boy job " />
        <meta name="keywords" content="play boy job, asex job, call boy job, findmycareer, job portal, urgent hiring, freelance jobs, full-time jobs, part-time jobs,8505994986 , job search, find jobs, hiring, careers, job listings, recruitment " />
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
        <link rel="canonical" href="https://findmycareer.co.in/" />
        <script type="application/ld+json">
      {JSON.stringify([organizationSchema, webpageSchema, searchActionSchema])}
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
