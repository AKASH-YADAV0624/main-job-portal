import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faBars,
  faCaretDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "@/assets/ad.png";
import logo from "@/assets/logouser.png";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Header = () => {
  // State to control dropdown visibility
  const { user } = useSelector((store) => store.auth);
  const [candidateDropdown, setCandidateDropdown] = useState(false);
  const [employerDropdown, setEmployerDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const [submenuOpen, setSubmenuOpen] = useState(null); // Tracks which submenu is open

  const toggleSubmenu = (menu) => {
    setSubmenuOpen(menu);
  };

  const closeSubmenu = () => {
    setSubmenuOpen(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <nav className="header-nav">
      <div className="first-half ">
        <div>
          <img src={image} alt="Description" className="w-20 h-auto mr-2" />
        </div>

        <Link to="/">Home</Link>

        {/*for candidate*/}

        <div
          className="dropdown "
          onMouseEnter={() => setCandidateDropdown(true)}
          onMouseLeave={() => setCandidateDropdown(false)}
        >
          <span>
            For Candidate <FontAwesomeIcon icon={faCaretDown} />
          </span>
          {candidateDropdown && (
            <div className="dropdown-menu">
              <Link to="/Jobs">Browse Jobs</Link>
              <Link to="/admin/browsecompanies">Browse Companies</Link>
              <Link to="/browsecategories">Browse Categories</Link>
              <Link to="/addresume">Submit Resume</Link>
            </div>
          )}
        </div>

        {/* For Employer Dropdown */}

        <div
          className="dropdown"
          onMouseEnter={() => setEmployerDropdown(true)}
          onMouseLeave={() => setEmployerDropdown(false)}
        >
          <span>
            For Employer <FontAwesomeIcon icon={faCaretDown} />{" "}
          </span>
          {employerDropdown && (
            <div className="dropdown-menu ">
              <Link to="/browsecandidates">Browse Candidates</Link>
              <Link to="/admin/submitjobs">Submit Job</Link>
              <Link to="/admin/company">Add Company</Link>
            </div>
          )}
        </div>

        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>
      {!user ? (
        <div className="second-half ">
          <Link to="/login">
            {" "}
            <FontAwesomeIcon icon={faLockOpen} className="icons text-black" /> Login
          </Link>
          <Link to="/register">
            <FontAwesomeIcon icon={faCirclePlus} className="icons" /> Register
          </Link>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <div className="second-half">
              <Avatar className="avatar cursor-pointer  ">
                <img src={logo} alt="" />
              </Avatar>
              <h1 className="flex items-center">Hi, {user?.firstName}!</h1>
            </div>
          </PopoverTrigger>
          {user && user.role === "candidate" ? (
            <PopoverContent className="w-60 border-none  p-0">
              <div className="avatar-dash flex">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/messages">Message</Link>
                <Link to="/bookmark">Bookmarks</Link>
                <Link to="/addresume">Add Resume</Link>
                <Link to="/profile">My Profile</Link>
                <Link onClick={logoutHandler}>Logout</Link>
              </div>
            </PopoverContent>
          ) : (
            <PopoverContent className="w-60 border-none  p-0 ">
              <div className="avatar-dash flex ">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/messages">Message</Link>
                <Link to="/admin/managejobs">Manage Jobs</Link>
                <Link to="/admin/managecompanies">Manage Compaines</Link>
                <Link to="/profile">My Profile</Link>
                <Link onClick={logoutHandler}>Logout</Link>
              </div>
            </PopoverContent>
          )}
        </Popover>
      )}
     <div
      className={`fixed top-0 left-0 z-40 w-full bg-[#262626] h-full shadow-md flex flex-col transition-transform duration-300 ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:hidden`}
    >
      {/* Main Menu */}
      {!submenuOpen && (
        <div>
          <div>
            <img src={image} alt="Logo" className="w-20 h-auto mx-5 my-5" />
          </div>
          <div className="mx-9 my-9 gap-4 flex flex-col">
            <Link to="/">Home</Link>
            <button
              className="flex items-center gap-2 text-[#a9a9a9]"
              onClick={() => toggleSubmenu("candidate")}
            >
              For Candidate <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <button
              className="flex items-center gap-2 text-[#a9a9a9]"
              onClick={() => toggleSubmenu("employer")}
            >
              For Employer <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className="flex flex-col gap-4">
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Submenu */}
      {submenuOpen === "candidate" && (
        <div
          className={`fixed top-0 right-0 w-full bg-[#262626] h-full transition-transform duration-300 transform ${
            submenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-4 bg-black mt-16">
            <button onClick={closeSubmenu}>
              <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
            </button>
            <h1 className="text-[#a9a9a9]">For Candidate</h1>
          </div>
          <div className="px-9 py-9 flex flex-col gap-4">
            <Link to="/Jobs">Browse Jobs</Link>
            <Link to="/admin/browsecompanies">Browse Companies</Link>
            <Link to="/browsecategories">Browse Categories</Link>
            <Link to="/addresume">Submit Resume</Link>
          </div>
        </div>
      )}

      {/* Employer Submenu */}
      {submenuOpen === "employer" && (
        <div
          className={`fixed top-0 right-0 w-full bg-[#262626] h-full transition-transform duration-300 transform ${
            submenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-4 bg-black mt-16">
            <button onClick={closeSubmenu}>
              <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
            </button>
            <h1 className="text-[#a9a9a9]">For Employer</h1>
          </div>
          <div className="px-9 py-9 flex flex-col gap-4">
            <Link to="/browsecandidates">Browse Candidates</Link>
            <Link to="/admin/submitjobs">Submit Job</Link>
            <Link to="/admin/company">Add Company</Link>
          </div>
        </div>
      )}
    </div>
      {/* Hamburger Icon */}
      <button
        className="md:hidden text-2xl   z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>
    </nav>
  );
};

export default Header;
