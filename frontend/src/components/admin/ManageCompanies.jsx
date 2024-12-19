import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import logo from "@/assets/logouser.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "@/utils/constant";
const ManageCompanies = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
    useGetAllCompanies();
  const { companies } = useSelector(store=>store.company);
  const handleDeleteCompany = async (companyId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this company?");
      if (!confirmed) return;
  
      const response = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
        withCredentials: true,
      });
  
      if (response.data.success) {
        toast.success("Company deleted successfully!");
        dispatch({ type: "REMOVE_COMPANY", payload: companyId }); // Remove the company from Redux state
      } else {
        toast.error("Failed to delete the company.");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("An error occurred while deleting the company.");
    }
  };
  

  
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-1/5 max1024:w-0">
          <Sidebar />
        </div>
        <div className="w-full p-[25px_20px] bg-gray-100 h-screen">
          <div>
            <h1 className="text-2xl my-2">Company Dashboard</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>
          </div>
          <Table className="border my-6 bg-[#fff]">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-[#333] text-white">Logo</TableHead>
                <TableHead className="bg-[#333] text-white">Name</TableHead>
                <TableHead className="bg-[#333] text-white">Date</TableHead>
                <TableHead className="bg-[#333] text-white">Status</TableHead>
                <TableHead className="text-right text-white bg-[#333]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies?.map((company) =>(
                <tr>
                    <TableCell>
                      <Avatar>
                        <AvatarImage   src={company.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell className="max560:p-2">{company.name}</TableCell>
                    <TableCell className="max560:p-2">{company.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="max560:p-2">{company.status}</TableCell>
                    <TableCell className="text-right cursor-pointer max560:p-2">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 ">
                          <div onClick={()=>navigate(`/admin/company/${company._id}`)}
                            className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                            <Edit2 className="w-4 cursor-pointer " />
                            <span>Edit</span>
                          </div>
                          <div
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                          onClick={() => handleDeleteCompany(company._id)}
                        >
                          <Trash2 className="w-4 cursor-pointer" />
                          <span>Delete</span>
                        </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    </tr>
                )
              )}
            </TableBody>
          </Table>
          <Button
            onClick={() => navigate("/admin/company")}
            className="bg-green-600 text-white my-1"
          >
            Add Company
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;
