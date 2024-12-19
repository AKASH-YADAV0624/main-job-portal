// components/SearchBar.js
import React, { useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

import {Link} from 'react-router-dom';
import './SearchBar.css'
import { useDispatch } from 'react-redux';
import { setSearchedCategory, setSearchedQuery } from '@/redux/jobSlice';

const SearchBar = () => {
  const[query,setQuery]=useState("");
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [text] = useTypewriter({
    words: [ ' automotive', ' sales & marketing ', ' healthcare'],
    loop: 3,
    onLoopDone: () => console.log(`loop completed after 3 runs.`)
  })
  const dispatch=useDispatch();
 
  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query));
    dispatch(setSearchedCategory(category));  // Dispatch category
    navigate("/jobs")
  }

 
  return (
    <div className="search-bar-container">
      {/* Heading and Introductory Paragraph */}
      <h2>Find Job</h2>
      <p>Hire Experts or be hirded in{text}</p>

      {/* Search Bar with Labels */}
      <div className="search-bar">
        <div className="search-field">
          <label>What job are you looking for?</label>
          <input
            type="text"
            placeholder="Job title, skills, etc."
            
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className="search-field">
          <label>Where?</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
              <option value="">All Regions</option>
              <option value="India">India</option>
          </select>
        </div>
        
        <div className="search-field">
          <label>Categories</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
             <option value="">All Category</option>
        <option value="Accounting/Finance">Accounting/Finance</option>
        <option value="Automative Jobs">Automative Jobs</option>
        <option value="Construction/Facilities">Construction/Facilities</option>
        <option value="Customer service">Customer service</option>
        <option value="Education Training">Education Training</option>
        <option value="Freshers jobs">Freshers jobs</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Part time job">Part time job</option>
        <option value="Market & Customer Research">Market & Customer Research</option>
        <option value="Others">Frontend developer</option>
        <option value="Restaurant/Food Service">Restaurant/Food Service</option>
        <option value="Sales & Marketing">Sales & Marketing</option>
        <option value="Transportation / Logistics">Transportation / Logistics</option>
        <option value="Work from home">Work from home</option>
        <option value="others">Others</option>
            {/* Add other categories as needed */}
          </select>
        </div>
        
        <button className='search-button' onClick={searchJobHandler}>Search</button>
      </div>
      <h3>Need more such options?  <Link to="/Jobs">Advance Search</Link></h3>
    </div>
  );
};

export default SearchBar;
