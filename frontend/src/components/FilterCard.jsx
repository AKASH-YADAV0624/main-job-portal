// components/SearchBar.js
import React, { useState } from 'react';
import './FilterCard.css'
import { setSearchedCategory, setSearchedQuery } from '@/redux/jobSlice';
import { useDispatch } from 'react-redux';
import { Button } from './ui/button';

const FilterCard = () => {
  const[query,setQuery]=useState("");
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState("");
  const dispatch=useDispatch()

  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query));
    dispatch(setSearchedCategory(category));  // Dispatch category
 
  }

  return (
    <div className="">

      {/* Search Bar with Labels */}
      <div className="search-bar">
        <div className="searc-field">
          <input
            type="text"
            placeholder="Job title, skills, etc."
          
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className="searc-field">
          <select
           value={region}
           onChange={(e) => setRegion(e.target.value)}
          >
              <option value="">All Regions</option>
              <option value="India">India</option>
          </select>
        </div>
        
        <div className="searc-fields">
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
        <option value="Restaurant/Food Service">Restaurant/Food Service</option>
        <option value="Sales & Marketing">Sales & Marketing</option>
        <option value="Telecommunications">Telecommunications</option>
        <option value="Transportation / Logistics">Transportation / Logistics</option>
        <option value="Work from home">Work from home</option>
        <option value="others">Others</option>
            {/* Add other categories as needed */}
          </select>
        </div>
        <Button className="bg-green-600"  onClick={searchJobHandler}>Search</Button>
      </div>
    </div>
  );
};

export default FilterCard;
