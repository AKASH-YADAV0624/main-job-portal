import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
    <>
      {/* Hamburger Menu */}
      <div className="lg:hidden fixed top-18  z-50">
        <button
          onClick={toggleSidebar}
          className="text-xl px-2 rounded bg-gray-200"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-18 left-0 z-40 w-1/6 max1024:w-64 h-full bg-white shadow-md flex flex-col pl-10 pt-9 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        {/* Main Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-slate-950 font-bold">Main</h3>
          <Link to="/dashboard" className="text-gray-600">
            Dashboard
          </Link>
          <Link to="/messages" className="text-gray-600">
            Messages
          </Link>
          <Link to="/bookmark" className="text-gray-600">
            Bookmarks
          </Link>
        </div>

        {/* Candidate Links */}
        {user && user.role === "candidate" ? (
          <div className="flex flex-col gap-4">
            <h3 className="mt-6 text-slate-950 font-bold">Candidate</h3>
            <Link to="/manageresume" className="text-gray-600">
              Manage Resume
            </Link>
            <Link to="/addresume" className="text-gray-600">
              Add Resume
            </Link>
            <Link to="/myapplication" className="text-gray-600">
              My Application
            </Link>
          </div>
        ) : (
          // Employer Links
          <div className="flex flex-col gap-4">
            <h3 className="mt-6 text-slate-950 font-bold">Employer</h3>
            <Link to="/admin/managejobs" className="text-gray-600">
              Manage Jobs
            </Link>
            <Link to="/admin/submitjobs" className="text-gray-600">
              Submit Job
            </Link>
            <Link to="/admin/managecompanies" className="text-gray-600">
              Manage Companies
            </Link>
            <Link to="/admin/company" className="text-gray-600">
              Add Company
            </Link>
          </div>
        )}

        {/* Account Links */}
        <div className="flex flex-col gap-4">
          <h3 className="mt-6 text-slate-950 font-bold">Account</h3>
          <Link to="/profile" className="text-gray-600">
            My Profile
          </Link>
          <Link onClick={logoutHandler} className="text-gray-600">
            Logout
          </Link>
        </div>
      </div>

      {/* Overlay (for mobile view) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
