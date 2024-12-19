import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./shared/Header";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

const AddResume = () => {
  const { user } = useSelector(store => store.auth);
  const [input, setInput] = useState({
    title: user?.title || '',
    location: user?.location || '',
    photo: user?.photo || null,
    video: user?.video || '',
    category: user?.profile?.category || '',
    skills: user?.skills?.map(skill => skill) || [],
    minRate: user?.minRate || '',
    content: user?.content || '',
    urls: user?.urls || [],
    education: user?.education || [],
    experience: user?.experience || [],
    file:user?.profile?.resume
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", input.title);
    formData.append("location", input.location);
    formData.append("videoLink", input.video);
    formData.append("category", input.category);
    formData.append("minRate", input.minRate);
    formData.append("content", input.content);
    formData.append("skills",input.skills)

 

    if (input.urls) formData.append("urls", JSON.stringify(input.urls));
    if (input.education) formData.append("education", JSON.stringify(input.education));
    if (input.experience) formData.append("experience", JSON.stringify(input.experience));

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDynamicChange = (index, field, value, section) => {
    const updatedSection = [...input[section]];
    updatedSection[index][field] = value;
    setInput({ ...input, [section]: updatedSection });
  };

  const addField = (section) => {
    const newField = section === "education"
      ? { institution: "", degree: "", year: "" }
      : { company: "", position: "", years: "" };
    setInput({ ...input, [section]: [...input[section], newField] });
  };

  const removeField = (index, section) => {
    const updatedSection = [...input[section]];
    updatedSection.splice(index, 1);
    setInput({ ...input, [section]: updatedSection });
  };

  return (
    <div>
      <HelmetProvider>
       <Helmet>
        <title>Submit Resume - Your Profile</title>  {/* Dynamic Title */}
        <meta name="description" content="Submit your resume with all necessary details including skills, education, and experience." />  {/* Meta Description */}
        <meta name="keywords" content="resume, profile, job application, skills, experience, education" />  {/* Meta Keywords */}
      </Helmet>
      </HelmetProvider>
      <Header />
      <div className="flex ">
        <div className="h-full w-1/5 max1024:w-0">
          <Sidebar />
        </div>
        <div className="w-full h-full p-[25px_20px] bg-[#d8d8d8]">
          <h1 className="text-2xl my-3">Submit Resume</h1>
          <h3 className="text-gray-500">Home &gt; Dashboard</h3>

          <form onSubmit={submitHandler} className="w-full my-10 p-[20px_20px] bg-[#fff] ">
            {/* Name and Email Inputs */}
            <div className="flex w-full gap-5 max780:flex-wrap gap-2">
              <div className="w-4/5 max780:w-full">
                <label>Your name</label>
                <Input
                  type="text"
                  placeholder={user?.firstName}
                  name="firstName"
                />
              </div>
              <div className="w-4/5 max780:w-full">
                <label>Your email</label>
                <Input
                  type="email"
                  placeholder={user?.email}
                  name="email"
                />
              </div>
            </div>

            {/* Location and Title */}
            <div className="flex w-full gap-5 max780:flex-wrap gap-2">
              <div className="w-4/5 max780:w-full">
                <label>Location</label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max780:w-full">
                <label>Professional title</label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            {/* Resume Category and Video */}
            <div className="flex w-full gap-5 max780:flex-wrap gap-2">
              <div className="w-4/5 max780:w-full">
                <label>Resume category</label>
                <Input
                  type="text"
                  name="category"
                  value={input.category}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max780:w-full">
                <label>Video (optional)</label>
                <Input
                  type="text"
                  name="video"
                  value={input.video}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            {/* Minimum Rate and Photo */}
            <div className="flex w-full gap-5 max780:flex-wrap gap-2">
              <div className="w-4/5 max780:w-full">
                <label>Minimum rate/h ($) (optional)</label>
                <Input
                  type="number"
                  name="minRate"
                  value={input.minRate}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="w-4/5 max780:w-full">
                <label>Photo (optional)</label>
                <Input
                accept="image/*"
                  type="file"
                  name="photo"
                //  onChange={fileChangeHandler}
                />
              </div>
            </div>

            {/* Resume Content */}
            <div className="flex flex-col my-2 gap-2 ">
              <label>Resume content</label>
              <textarea
                className="border px-2 py-2"
                name="content"
                placeholder="Resume Content"
                value={input.content}
                onChange={changeEventHandler}
                rows="8"
                cols="100"
                required
              />
            </div>
            <div className="flex w-full gap-5 max780:flex-wrap gap-2">
            <div className="w-4/5 max780:w-full">
                <label htmlFor="file">Resume</label>
                <Input
                id="file"
                accept="application/pdf"
                  type="file"
                  name="file"
                  onChange={fileChangeHandler}
                />
              </div>
            

            {/* Dynamic Fields: Skills */}
            <div className="flex w-full gap-5 max780:flex-wrap gap-2">
              <div className="w-4/5 max780:w-full">
                <label>Skills (optional)</label>
                <Input
                  type="text"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                />
              </div>
            </div>
            </div>

            {/* Dynamic Fields: URLs */}
            <div className="flex flex-col w-4/5 bg-gray-100 p-[10px_10px] max780:w-full">
              <label>Url(s)(optional)</label>
              {input.urls.map((url, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-2 items-center max780:grid-cols-1">
                  <div className="flex flex-col max780:w-full">
                    <Input
                      type="text"
                      placeholder="Name"
                      value={url.description}
                      onChange={(e) => handleDynamicChange(index, "description", e.target.value, "urls")}
                    />
                    <Input
                      type="text"
                      placeholder="Url"
                      value={url.url}
                      onChange={(e) => handleDynamicChange(index, "url", e.target.value, "urls")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(index, "urls")}
                    className="text-red-400 bg-red-100 w-1/6 h-fit"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <Button type="button" onClick={() => addField("urls")} className="text-white bg-green-600 w-fit my-2 mx-2 max780:text-xs">
                + Add URL
              </Button>
            </div>

            {/* Dynamic Fields: Education */}
            <div className="flex flex-col w-4/5 bg-gray-100 p-[10px_10px] my-4 max780:w-full">
              <label>Education (optional)</label>
              {input.education.map((edu, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-2 max780:grid-cols-1">
                  <div className="flex flex-col">
                    <Input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleDynamicChange(index, "institution", e.target.value, "education")}

                      />
                      <Input
                      type="text"
                      placeholder="Field of study"
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleDynamicChange(index, "fieldOfStudy", e.target.value, "education")}

                      />
                    <Input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleDynamicChange(index, "degree", e.target.value, "education")}
                    />
                    <Input
                      type="text"
                      placeholder="Start year"
                      value={edu.startYear}
                      onChange={(e) => handleDynamicChange(index, "startYear", e.target.value, "education")}
                    />
                      <Input
                      type="text"
                      placeholder="End year"
                      value={edu.endYear}
                      onChange={(e) => handleDynamicChange(index, "endYear", e.target.value, "education")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(index, "education")}
                    className="text-red-400 bg-red-100 w-1/6 h-fit"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <Button type="button" onClick={() => addField("education")} className="text-white bg-green-600 w-fit my-2 mx-2 max780:text-xs">
                + Add Education
              </Button>
            </div>

            {/* Dynamic Fields: Experience */}
            <div className="flex flex-col w-4/5 bg-gray-100 p-[10px_10px] my-4 max780:w-full">
              <label>Experience (optional)</label>
              {input.experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-2 max780:grid-cols-1">
                  <div className="flex flex-col">
                    <Input
                      type="text"
                      placeholder="employer"
                      value={exp.employer}
                      onChange={(e) => handleDynamicChange(index, "employer", e.target.value, "experience")}
                    />
                    <Input
                      type="text"
                      placeholder="Job title"
                      value={exp.jobTitle}
                      onChange={(e) => handleDynamicChange(index, "jobTitle", e.target.value, "experience")}
                    />
                    <Input
                      type="text"
                      placeholder="Start date"
                      value={exp.startDate}
                      onChange={(e) => handleDynamicChange(index, "startDate", e.target.value, "experience")}
                    />
                     <Input
                      type="text"
                      placeholder="End date"
                      value={exp.endDate}
                      onChange={(e) => handleDynamicChange(index, "endDate", e.target.value, "experience")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(index, "experience")}
                    className="text-red-400 bg-red-100 w-1/6 h-fit "
                  >
                    ✕
                  </button>
                </div>
              ))}
              <Button type="button" onClick={() => addField("experience")} className="text-white bg-green-600  w-fit my-2 mx-2 max780:text-xs ">
                + Add Experience
              </Button>
            </div>

            {/* Submit Button */}
            <div className="w-full flex  mt-5">
              <Button type="submit" className="text-white bg-green-600 px-5 py-2 rounded">
                Submit Resume
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResume;
