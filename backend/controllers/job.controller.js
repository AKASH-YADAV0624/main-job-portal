import { Job } from "../models/job.model.js";

//admin post krega job                             // here i add all job modals replace job modals
export const postJob=async(req,res)=>{
    try{
        const {title,description,location,jobType,externalLink,minimumSalary,maximumSalary,minimumRate,maximumRate,applicationEmail,jobTags,closingDate,jobRegion,companyId,category}=req.body;
        const userId=req.id;
        if(!title || !description  || !companyId  || !category){
            return res.status(400).json({
                message:"Something is missing.",
                success:false
            })
        };
        const job= await Job.create({
            title,
            description,
            externalLink,
            minimumSalary:Number(minimumSalary),
            location,
            jobType,
            maximumSalary:Number(maximumSalary),
            minimumRate,
            maximumRate,
            applicationEmail,
            category,
            jobTags,
            closingDate,

            jobRegion,
            company:companyId,
            created_by:userId,
            status:"pending",
          // Default status set to pending
        })
        return res.status(201).json({
            message:"New job created successfully.",
            job,
            success:true
        })

    }catch(error){
        console.log(error);
    }
}

//candidate
export const getAllJobs= async (req,res)=>{
    try{
        const keyword= req.query.keyword || "";
        const category = req.query.category || "";  // Get category from the query
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ],
            status: 'approved', // Only fetch approved jobs
        };
            // If a category is provided, add it to the query
            if (category) {
                query.category = category;  // Assuming 'category' is a field in your Job model
            }
        const jobs= await Job.find(query).populate({
            path:'company'
        }).sort({createdAt:-1});
        if(!jobs){
            return req.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    }catch(error){
        console.log(error);
    }
}

export const getJobById= async(req,res)=>{
    try{
        const jobId= req.params.id;
        const job= await Job.findById(jobId).populate([
            { path: "company" }, 
            { path: "applications" },
          ]);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        });

    }catch(error){
        console.log(error)
    }
}

//admin kitne job create krta hai abhi tak

export const getAdminJobs= async(req,res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}

// for update  
// for update
export const updateJob = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the job by ID
        let job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Update the job with the new data
        job = await Job.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        // Return success response
        return res.status(200).json({
            success: true,
            job,
            message: "Job updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating job.",
            success: false
        });
    }
};


// Delete job
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the job by ID
        let job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Delete the job
        await job.deleteOne();

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error deleting job.",
            success: false
        });
    }
};

// Duplicate job
export const duplicateJob = async (req, res) => {
    const { id } = req.params; // Get the jobId from the request parameters
    try {
        // Find the job by ID
        let job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create a new job object with the modified fields
        const duplicatedJob = new Job({
            ...job.toObject({ versionKey: false, transform: (doc, ret) => { delete ret._id; return ret; } }), // Remove _id from the copied job
            title: req.body.title || job.title,  // Modify the title from request or default
            description: req.body.description || job.description, // Modify description if provided
            location: req.body.location || job.location,  // Modify location if provided
            jobType: req.body.jobType || job.jobType, // Modify jobType if provided
            company: req.body.companyId || job.company,  // Modify company if provided
            minimumSalary: req.body.minimumSalary || job.minimumSalary,  // Modify minimum salary if provided
            maximumSalary: req.body.maximumSalary || job.maximumSalary,  // Modify maximum salary if provided
            minimumRate: req.body.minimumRate || job.minimumRate,  // Modify minimumRate if provided
            maximumRate: req.body.maximumRate || job.maximumRate,  // Modify maximumRate if provided
            applicationEmail: req.body.applicationEmail || job.applicationEmail, // Modify applicationEmail if provided
            jobTags: req.body.jobTags || job.jobTags, // Modify jobTags if provided
            closingDate: req.body.closingDate || job.closingDate, // Modify closingDate if provided
            jobRegion: req.body.jobRegion || job.jobRegion,
            category: req.body.category || job.category, // Modify jobRegion if provided
            // Set the new job status to 'pending'
            created_by: req.id, // Set the same user who created the original job
            applications: [], // Reset the applications array to avoid copying over old applications
        });

        // Save the duplicated job
        await duplicatedJob.save();

        return res.status(201).json({
            message: "Job duplicated successfully.",
            job: duplicatedJob,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error duplicating job.",
            success: false
        });
    }
};


// Increment the view count for a specific job
export const incrementJobViews = async (req, res) => {
    try {
        const { id } = req.params; // Use 'id' as defined in the route

        // Find the job and increment the view count by 1
        const job = await Job.findByIdAndUpdate(
            id, // Use 'id' here
            { $inc: { views: 1 } }, // Increment the view count
            { new: true } // Return the updated job document
        );

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, message: "Job views updated successfully", job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Admin fetches all pending jobs
// Admin fetches all pending jobs
export const getPendingJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "pending" }).populate("company");
    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching pending jobs.",
      success: false
    });
  }
};

  
  // Admin approves a job
// Admin approves a job
export const approveJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { status: "approved" },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found.",
        success: false
      });
    }

    return res.status(200).json({
      message: "Job approved successfully.",
      job: updatedJob,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error approving job.",
      success: false
    });
  }
};

  
  // Admin rejects a job
// Admin rejects a job
export const rejectJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found.",
        success: false
      });
    }

    return res.status(200).json({
      message: "Job rejected successfully.",
      job: updatedJob,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error rejecting job.",
      success: false
    });
  }
};


// Toggle filled status
export const toggleFilledStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    job.filled = !job.filled; // Toggle the filled status
    await job.save();

    res.status(200).json({ success: true, message: `Job marked as ${job.filled ? "filled" : "not filled"}`, job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update job status" });
  }
};