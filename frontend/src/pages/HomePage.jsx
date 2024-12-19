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
  return (
    <div>
      <HelmetProvider>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Browse job listings and find the perfect career opportunity or hire top talent in various industries. Start your job search today!" />
        <meta name="keywords" content="job portal, job search, find jobs, hiring, careers, job listings, recruitment" />
        
        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:title" content="Job Portal | Find Your Dream Job and Talented Candidates" />
        <meta property="og:description" content="Browse job listings and find the perfect career opportunity or hire top talent in various industries. Start your job search today!" />
        <meta property="og:image" content="https://example.com/job-portal-thumbnail.jpg" />
        <meta property="og:url" content="https://example.com" />
        
        {/* Twitter Card Tags for Twitter Sharing */}
        <meta name="twitter:title" content="Job Portal | Find Your Dream Job and Talented Candidates" />
        <meta name="twitter:description" content="Explore job opportunities and apply for your next job or hire the best candidates through our job portal." />
        <meta name="twitter:image" content="https://example.com/job-portal-thumbnail.jpg" />
        
        {/* Mobile Optimization Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical Link to Avoid Duplicate Content */}
        <link rel="canonical" href="https://example.com" />
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
