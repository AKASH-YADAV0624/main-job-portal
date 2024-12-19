import React from "react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { faFile, faMountainSun, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// yha pr check lgana hai ki if candidate h toh yeh ayega dashboard me or employer hai toh yehhhhh
const Dashboard=()=>{
    
    const {applicants}=useSelector(store=>store.application);
    const {user}=useSelector(store=>store.auth);
return(
    <div>
        <Header/>
        <div className="flex max1024:flex-none">
            <div className="h-full w-1/5 max1024:w-0">
                <Sidebar/>
            </div>
            <div className="p-[40px_45px] w-full max1024:w-full max560:p-[20px_20px] ">
                <h1 className="text-black-500 text-2xl"> hawdy {user?.firstName}</h1>
                <h3 className="my-3 text-gray-500 ">Home &gt; Dashboard</h3>

                {
              user && user.role==='candidate' ?(
                <div className="flex gap-10 my-10 max903:w-full flex-wrap ">
                <div className="flex items-center max903:w-full justify-between w-1/5 bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.2)] bg-green-600 h-36 text-white rounded p-[20px_20px] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                    <div>
                    <h2 className="text-2xl">0</h2>
                    <h2 className="text-lg">Active Resume</h2>

                    </div>
                    <FontAwesomeIcon icon={faFile} className="text-4xl" />
                </div>
                <div  className=" flex items-center max903:w-full justify-between w-1/5 bg-[#363841] bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.1)] bg-[#363841] h-36 text-white rounded p-[20px_20px] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                <div>
                    <h2 className="text-2xl">0</h2>
                    <h2 className="text-lg">Resumes view</h2>

                    </div>
                    <FontAwesomeIcon icon={faMountainSun}  className="text-4xl"/>
                </div>
                <div  className="flex items-center max903:w-full justify-between w-1/5 bg-[#117bbf] bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.3)] bg-[#117bbf] h-36 text-white rounded p-[20px_20px] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                <div>
                    <h2 className="text-2xl">0</h2>
                    <h2 className="text-lg">Your Applications</h2>

                    </div>
                    <FontAwesomeIcon icon={faUsers} className="text-3xl "  />
                </div>
                <div  className="flex items-center max903:w-full justify-between w-1/5 bg-[#ffae00] h-36 text-white rounded p-[20px_20px] bg-[#ffae00] bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.1)] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                <div>
                    <h2 className="text-2xl">0</h2>
                    <h2 className="text-lg">Bookmarks</h2>
                    </div>
                </div>
            </div>
              ):(
                <div className="flex gap-10 my-10 max903:w-full flex-wrap ">
                <div className="flex items-center max903:w-full justify-between w-1/5 bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.2)] bg-green-600 h-36 text-white rounded p-[20px_20px] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                    <div>
                    <h2 className="text-2xl">0</h2>
                    <h2 className="text-lg">Active Job Listings</h2>

                    </div>
                    <FontAwesomeIcon icon={faFile} className="text-4xl" />
                </div>
                <div  className=" flex items-center max903:w-full justify-between w-1/5 bg-[#363841] bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.1)] bg-[#363841] h-36 text-white rounded p-[20px_20px] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                <div>
                    <h2 className="text-2xl">0</h2>
                    <h2 className="text-lg">Total Jobs Views</h2>

                    </div>
                    <FontAwesomeIcon icon={faMountainSun}  className="text-4xl"/>
                </div>
                <div  className="flex items-center max903:w-full justify-between w-1/5 bg-[#117bbf] bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.3)] bg-[#117bbf] h-36 text-white rounded p-[20px_20px] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                <div>
                    <h2 className="text-2xl">{applicants?.applications?.length}</h2>
                    <h2 className="text-lg">Total Applications</h2>

                    </div>
                    <FontAwesomeIcon icon={faUsers} className="text-3xl "  />
                </div>
                <div  className="flex items-center max903:w-full justify-between w-1/5 bg-[#ffae00] h-36 text-white rounded p-[20px_20px] bg-[#ffae00] bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.1)] shadow-lg transition-transform duration-300 ease-out transform hover:translate-y-[-5px] hover:shadow-xl">
                <div>
                    <h2 className="text-2xl">0</h2>
                    <h2 className="text-lg">Time Bookmarked</h2>
                    </div>
                </div>
            </div>
              )
            }
              
            <div className="bg-[#fff]">
                <h1 className="text-2xl">Recent Activities</h1>
                <hr />
                <p>You don't have any activity logged yet.</p>
            </div>
            </div>

        </div>
    </div>
)
}

export default Dashboard;