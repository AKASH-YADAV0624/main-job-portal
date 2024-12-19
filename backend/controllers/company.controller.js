import {Company} from "../models/company.model.js"

import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';




export const registerCompany= async(req,res)=>{
    try{
      const {companyName}=req.body;
      if(!companyName){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        });
      }
      let company=await Company.findOne({name:companyName});
      if(company){
        return res.status(400).json({
            message:"You can't register same company",
            success:false
        });
      };
      company=await Company.create({
        name:companyName,
        userId:req.id,
        status:"pending",
      });
      return res.status(201).json({
        message:"Company registered successfully.",
        company,
        success:true
      })



    }catch(error){
          console.log(error);
    }
}

export const getCompany =async(req,res)=>{
    try{
        const userId=req.id; //logged in user id
        const companies= await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                message:"Companies not found.",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
          })

    }catch(error){
        console.log(error);
    }
}

//get company by id

export const getCompanyById =async (req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true 
        })

    }catch(error){
        console.log(error);
    }
}

//update company

export const updateCompany=async(req,res)=>{
    try{
        const {name,description,website,location,video,salary,companyContent}=req.body;
        const file=req.file;
        //idhr cloudinary ayega
        const fileUri= getDataUri(file);
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
        const logo= cloudResponse.secure_url;

        const updateDate={name,description,website,location,video,salary,companyContent,logo};
        const company=await Company.findByIdAndUpdate(req.params.id,updateDate,{new:true});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

// Get all companies
export const getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find({ status: 'approved' }); ; // Fetch all companies
      if (!companies || companies.length === 0) {
        return res.status(404).json({
          message: "No companies found.",
          success: false,
        });
      }
      return res.status(200).json({
        companies,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong.",
        success: false,
      });
    }
  };
  

  // Get all pending companies
export const getPendingCompanies = async (req, res) => {
  try {
    const pendingCompanies = await Company.find({ status: "pending" });

    if (!pendingCompanies || pendingCompanies.length === 0) {
      return res.status(404).json({
        message: "No pending companies found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies: pendingCompanies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching pending companies.",
      success: false,
    });
  }
};
// Admin approves a company
export const approveCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { status: "approved" },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company approved successfully.",
      company: updatedCompany,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error approving company.",
      success: false,
    });
  }
};

// Admin rejects a company
export const rejectCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company rejected successfully.",
      company: updatedCompany,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error rejecting company.",
      success: false,
    });
  }
};


// delete company
export const deleteCompany = async (req, res) => {
  const { id } = req.params; // Extract company ID from request parameters
  try {
      // Find the company by ID
      let company = await Company.findById(id);
      if (!company) {
          return res.status(404).json({
              message: "Company not found.",
              success: false
          });
      }

      // Delete the company
      await company.deleteOne();

      // Return success response
      return res.status(200).json({
          success: true,
          message: "Company deleted successfully"
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message: "Error deleting company.",
          success: false
      });
  }
};
