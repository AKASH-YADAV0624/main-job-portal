import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import {
  Select as AntSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import Select from "react-select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import useGetJobById from "@/hooks/useGetJobById";

const DuplicateJob = () => {
  const params = useParams(); // Get the jobId from the URL
  useGetJobById(params.id);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    externalLink: "",
    minimumSalary: "",
    location: "",
    jobType: [],
    maximumSalary: "",
    category: [],
    companyId: "",
    minimumRate: "",
    maximumRate: "",
    applicationEmail: "",
    jobTags: "",
    closingDate: "",
    jobRegion: "",
  });
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const { singleJob } = useSelector((store) => store.job);
  const changeEventHandler = (e, isSelect = false, fieldName = "") => {
    if (isSelect) {
      // Handle React-Select
      const selectedValues = e ? e.map((option) => option.value) : []; // Extract selected values
      setInput((prev) => ({ ...prev, [fieldName]: selectedValues })); // Update the specific field (jobType or category)
    } else {
      // Handle native inputs
      const { name, value } = e.target;
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };
  const jobTypeOptions = [
    { value: "Freelance", label: "Freelance" },
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Internship", label: "Internship" },
    { value: "Temporary", label: "Temporary" },
  ];
  const categoryOptions = [
    { value: "Accounting/Finance", label: "Accounting/Finance" },
    { value: "Automative Jobs", label: "Automative Jobs" },
    { value: "Construction/Facilities", label: "Construction/Facilities" },
    { value: "Customer service", label: "Customer service" },
    { value: "Education Training", label: "Education Training" },
    { value: "Freshers jobs", label: "Freshers jobs" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Part time job", label: "Part time job" },
    {
      value: "Market & Customer Research",
      label: "Market & Customer Research",
    },
    { value: "Others", label: "Others" },
    { value: "Restaurant/Food Service", label: "Restaurant/Food Service" },
    { value: "Sales & Marketing", label: "Sales & Marketing" },
    {
      value: "Transportation / Logistics",
      label: "Transportation / Logistics",
    },
    { value: "Work From Home", label: "Work From Home" },
  ];

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("externalLink", input.externalLink);
    formData.append("minimumSalary", input.minimumSalary);
    formData.append("location", input.location);
    formData.append("jobType", input.jobType);
    formData.append("maximumSalary", input.maximumSalary);
    formData.append("category", input.category);
    formData.append("companyId", input.companyId);
    formData.append("minimumRate", input.minimumRate);
    formData.append("maximumRate", input.maximumRate);
    formData.append("applicationEmail", input.applicationEmail);
    formData.append(" jobTags", input.jobTags);
    formData.append("closingDate", input.closingDate);
    formData.append("jobRegion", input.jobRegion);

    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_END_POINT}/duplicate/${params.id}`,
        input,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/managejobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob.title || "",
      description: singleJob.description || "",
      externalLink: singleJob.externalLink || "",
      location: singleJob.location || "",
      minimumRate: singleJob.minimumRate || "",
      maximumRate: singleJob.maximumRate || "",
      minimumSalary: singleJob.minimumSalary || "",
      maximumSalary: singleJob.maximumSalary || "",
      jobType: singleJob.jobType || "",
      companyId: singleJob.companyId || "",
      category: singleJob.category || "",
      applicationEmail: singleJob.applicationEmail || "",
      jobTags: singleJob.jobTags || "",
      closingDate: singleJob.closingDate || "",
      jobRegion: singleJob.jobRegion || "",
    });
  }, [singleJob]);

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="h-full w-1/5 max1024:w-0">
          <Sidebar />
        </div>
        <div className="w-full p-[25px_20px] bg-gray-100 h-full max1024:w-full max560:p-[20px_10px]">
          <h1 className="text-2xl my-3  ">Post A Job</h1>
          <h3 className="text-gray-500">Home &gt; Dashboard</h3>
          <form className="w-full my-10 p-[20px_20px] bg-[#fff]">
            <div>
              <h1 className="text-xl my-4">Select a company</h1>
              {companies.length === 0 && (
                <p className="text-xs text-red-600 font-bold text-center my-3">
                  Please register a company first , before posting a jobs
                </p>
              )}

              {companies.length > 0 && (
                <AntSelect onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem
                            className="bg-green-500"
                            value={company?.name?.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </AntSelect>
              )}
              <hr />
            </div>
            <h1>Job Details</h1>
            <hr />
            <div className="flex w-full gap-2 max650:flex-wrap">
              <div className="w-4/5 max650:w-full">
                <label>Job Title</label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max650:w-full">
                <label>Location (optional)</label>
                <Input
                  type="text"
                  name="location"
                  placeholder="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>
            </div>
            <div className="flex w-full  gap-2 max650:flex-wrap">
              <div className="w-4/5 max650:w-full">
                <label>Job Type(optional)</label>
                <Select
                  name="jobType"
                  options={jobTypeOptions}
                  isMulti
                  value={jobTypeOptions.filter((option) =>
                    input.jobType.includes(option.value)
                  )} // Sync with state
                  onChange={(selectedOptions) =>
                    changeEventHandler(selectedOptions, true, "jobType")
                  } // Specify fieldName as "jobType"
                  placeholder="Select Job Types"
                />
              </div>
              <div className="w-4/5 items-center max650:w-full">
                <label>Remote Position (optional)</label>
                <RadioGroup defaultValue="option-one">
                  <div className="flex my-2 items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">
                      {" "}
                      Select if this is a remote position.
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex w-full gap-2 max650:flex-wrap">
              <div className="w-4/5 max650:w-full">
                <label>Minimum Salary (optional) </label>
                <Input
                  type="number"
                  name="minimumSalary"
                  value={input.minimumSalary}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max650:w-full">
                <label>Maximum Salary (optional)</label>
                <Input
                  type="number"
                  name="maximumSalary"
                  placeholder="eg :20000"
                  value={input.maximumSalary}
                  onChange={changeEventHandler}
                />
              </div>
            </div>
            {/* Resume Content */}
            <div className="flex flex-col my-2 gap-2">
              <label>Description</label>
              <textarea
                className="border px-2 py-2"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows="8"
                cols="100"
                required
              />
            </div>
            <div className="flex w-full gap-2 max650:flex-wrap">
              <div className="w-4/5 max650:w-full">
                <label>Minimum Rate (optional)</label>
                <Input
                  type="number"
                  name="minimumRate"
                  value={input.minimumRate}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max650:w-full">
                <label>Maximum Rate (optional)</label>
                <Input
                  type="number"
                  name="maximumRate"
                  value={input.maximumRate}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            {/* Location and Title */}
            <div className="flex w-full gap-2 max650:flex-wrap">
              <div className="w-4/5 max650:w-full">
                <label>Job Region</label>
                <Input
                  type="text"
                  name="jobRegion" //mene add kia
                  value={input.jobRegion}
                  placeholder="india"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max650:w-full">
                <label>Job Tags(option)</label>
                <Input
                  type="text"
                  name="jobTags"
                  value={input.jobTags}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            {/* Resume Category and Video */}
            <div className="flex w-full gap-2 max650:flex-wrap">
              <div className="w-4/5 max650:w-full">
                <label>Application Email (optional)</label>
                <Input
                  type="text"
                  name="applicationEmail"
                  value={input.applicationEmail}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max650:w-full">
                <label>Closing Date(optional)</label>
                <Input
                  type="Date"
                  name="closingDate"
                  value={input.closingDate}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            <div className="search-field">
              <label>Job Categories</label>
              <Select
                name="category"
                options={categoryOptions}
                isMulti
                value={categoryOptions.filter((option) =>
                  input.category.includes(option.value)
                )} // Sync with state
                onChange={(selectedOptions) =>
                  changeEventHandler(selectedOptions, true, "category")
                } // Specify fieldName as "category"
                placeholder="Select Categories"
              />
            </div>
            <div className="my-2 max650:w-full">
              <label>External "Apply for Job" link (optional)</label>
              <Input
                type="text"
                name="externalLink"
                value={input.externalLink}
                onChange={changeEventHandler}
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex  mt-5">
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={submitHandler}
                  className="text-white bg-green-600  py-2 rounded max560:w-full"
                >
                  Duplicate Job
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DuplicateJob;
