import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import React from "react";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer flex  flex-col gap-4 "
    >
      <div>
        <h4 className="text-base text-gray-500">{job?.company?.name}</h4>
      </div>
      <div>
        <h1 className="font-normal text-lg my-2">{job?.title}</h1>
        <h4 className="text-base text-gray-500">{job?.company?.name}</h4>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className={'bg-blue-700 text-white font-bold'} variant="ghost">
          Full Time
        </Badge>
        <Badge className={'bg-[#F83002] text-white font-bold'} variant="ghost">
          Temporary
        </Badge>
        <Badge className={'bg-[#4CBB17] text-white font-bold'} variant="ghost">
          Freelance
        </Badge>
        <Badge className={'bg-[#FF5733] text-white font-bold'} variant="ghost">
          Part Time
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
