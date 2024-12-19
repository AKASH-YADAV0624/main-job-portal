import React from 'react';
import CountUp from 'react-countup';
import {faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './PopularCategory.css';
import { Link } from 'react-router-dom';


const PopularCategory=()=>{
  
    return(
        <div className="category-container">
        <h1>Popular Categories</h1>
        <div className='all-category-boxes'>
           
            
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas} className='icon' />
           <h2>Accounting/Finance</h2>
           </div>
           <h3><CountUp start={0} end={4591} duration={2} delay={0}/></h3>
           </Link>
           
        </div>
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas} className='icon'/>
           <h2>Automative Jobs</h2>
           </div>
           <h3><CountUp start={0} end={7562} duration={2} delay={0}/></h3>
           </Link>
        </div>
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas}className='icon' />
           <h2>Construction/Facilities</h2>
           </div>
           <h3><CountUp start={0} end={3991} duration={2} delay={0}/></h3>
           </Link>
        </div>
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas}className='icon' />
           <h2>Customer Service</h2>
           </div>
           <h3><CountUp start={0} end={8764} duration={2} delay={0}/></h3>
           </Link>
        </div>
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas}className='icon' />
           <h2>Education Training</h2>
           </div>
           <h3><CountUp start={0} end={3333} duration={2} delay={0}/></h3>
           </Link>
        </div>
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas} className='icon'/>
           <h2>Fresher Jobs</h2>
           </div>
           <h3><CountUp start={0} end={9115} duration={2} delay={0}/></h3>
           </Link>
        </div>
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas} className='icon'/>
           <h2>Healthcare</h2>
           </div>
           <h3><CountUp start={0} end={3504} duration={2} delay={0}/></h3>
           </Link>
        </div>
        <div className="category-box">
        <Link to="/jobs">
            <div className='category-head'>
        <FontAwesomeIcon icon={faEarthAmericas} className='icon'/>
           <h2>Market & Customer Research</h2>
           </div>
           <h3><CountUp start={0} end={4487} duration={2} delay={0}/></h3>
           </Link>
        </div>
        
        </div>
        <div className='browse'>
        <button className='browse-button'> <Link to="/jobs" >Browse All Categories</Link> </button>
        </div>
        </div>
    )
}

export default PopularCategory;