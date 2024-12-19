import React from "react";
import image from '@/assets/ad.png'
import CountUp from 'react-countup';
import { faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <footer className="bg-[#282828] text-gray-400 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between max560:flex-wrap ">
        <img src={image} alt="Description" className="w-11  mr-2 max560:my-2 w-11" />
             
        <div className="flex gap-10 cursor-default">
          <div className="flex items-center gap-5">
            <FontAwesomeIcon icon={faBriefcase} className="text-2xl text-white" />
            <div>
             <h3 className="text-white  text-xl"><CountUp start={0} end={1124} duration={2} delay={0}/></h3>
             <h4>Job Listing</h4>
            </div>

          </div>

          <div className="flex items-center gap-5">
            <FontAwesomeIcon icon={faUser} className="text-white  text-2xl" />
            <div>
                 <h3 className="text-white  text-xl"><CountUp start={0} end={421} duration={2} delay={0}/></h3>
                 <h4 >Resume Posted</h4>
            </div>

          </div>

        </div>
      </div>
          {/* Divider */}
          <div className="border-t border-gray-700 my-6 "></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,0.2fr)] gap-2">
          {/* About Section */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">For Candidates</h2>
            <ul className="space-y-2">
              <li>
                <a href="/jobs" className="hover:text-white">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/browsecategories" className="hover:text-white">
                  Browse Categories
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white">
                  Candidate Dashboard
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Job Alerts
                </a>
              </li>
              <li>
                <a href="/bookmark" className="hover:text-white">
                  My Bookmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">For Employers</h2>
            <ul className="space-y-2">
              <li>
                <a href="/browsecandidates" className="hover:text-white">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white">
                  Employer Dashboard
                </a>
              </li>
              <li>
                <a href="/admin/submitjobs" className="hover:text-white">
                  Add Job
                </a>
              </li>
              <li>
                <a href="/admin/company" className="hover:text-white">
                  Add Company
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Other</h2>
            <ul className="space-y-2">
              <li>
                <a href="/jobs" className="hover:text-white">
                  Job Page
                </a>
              </li>
              <li>
                <a href="/jobs" className="hover:text-white">
                  Job Page Alternative
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white">
                  Resume Page
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Legal</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} Findmycareer. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
