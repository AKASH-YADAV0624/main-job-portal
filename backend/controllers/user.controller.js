import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

export const register= async(req,res)=>{
    try{
        const {username,email,password,firstName,lastName,role,phoneNumber}=req.body;
        if(!username || !email || !password || !firstName || !lastName || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        const user=await User.findOne({ email });
        if(user){
            return res.status(400).json({
                message:'User already exist with this email'
            })
        }
        const hashedPassword= await bcrypt.hash(password,10);

        await User.create({
            username,
            email,
            password:hashedPassword,
            firstName,
            lastName,
            role,
            phoneNumber
        });
        return res.status(201).json({
            message:"Account created successfully.",
            success:true,
        })
    } catch(error){
        console.log(error);

    }
}

export const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        let user=await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"Incorrect username or password.",
                success:false,
            })
        }
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect username or password.",
                success:false,
            })
        };
        const tokenData={
            userId:user._id
        }
        const token= await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});
         user={
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        
        
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            message:`hello ${user.firstName}`,
            user,
            success:true
        })
    } catch(error){
        console.log(error);
    }
}

export const logout = async(req,res)=>{
    try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logout successfully",
        success:true
      })
    }catch(error){
         console.log(error);
    }
}

export const updateProfile= async(req,res)=>{
    try{
        const{username,phoneNumber,firstName,lastName,email,bio}=req.body;
        const file=req.file;
       
      
        //cloudinary ayega idhr
           
            const userId=req.id;//middleware authentication
            let user=await User.findById(userId);

            if(!user){
                return res.status(400).json({
                    message:"User not found.",
                    success:false
                })
            }

            //updating data
            if(username) user.username=username
            if(email) user.email=email
            if(phoneNumber) user.phoneNumber=phoneNumber
            if(bio) user.profile.bio=bio
            if(firstName) user.firstName=firstName
            if(lastName) user.lastName=lastName

       //resume comes later here.......

      await user.save();

      user={
        _id:user._id,
        fullname:user.fullnmame,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
          return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
          })
    }catch(error){
        console.log(error);
    }
}
// The submit route to handle the resume submission
export const submit = async (req, res) => {
  try {
    const {
      title,
      location,
      videoLink,
      category,
      content,
      minRate,
      urls,
      education,
      experience,
      skills,
    } = req.body;

    const file = req.file; // File (photo) uploaded with the form
    const userId = req.id; // User ID from the authentication middleware


     const fileUri = getDataUri(file);
     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
     
   

   let skillsArray;
   if(skills){
    skillsArray=skills.split(",");
   }

    // Handle file upload
 

    
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    

    // Parse fields if they exist
    const urlsArray = urls ? JSON.parse(urls) : []; // Parse URLs if they are provided
    const educationArray = education ? JSON.parse(education) : []; // Parse Education if provided
    const experienceArray = experience ? JSON.parse(experience) : []; // Parse Experience if provided

    // Update user profile with resume data
    if(skills) user.profile.skills=skillsArray;
    if (location) user.profile.location = location;
    if (title) user.profile.title = title;
    if (videoLink) user.profile.videoLink = videoLink;
    if (category) user.profile.category = category;
    if (content) user.profile.content = content;
    if (minRate) user.profile.minRate = minRate;

    // Optional fields (only update if they are provided)
    if (urlsArray.length) user.profile.urls = urlsArray;
    if (experienceArray.length) user.profile.experience = experienceArray;
    if (educationArray.length) user.profile.education = educationArray;
    

    //resume
    if(cloudResponse){
      user.profile.resume=cloudResponse.secure_url
      user.profile.resumeOriginalName=file.originalname
    }

    // Handle the uploaded file (photo) only if file is present
 

    // Save the updated user data
    await user.save();
    // Fetch the updated user
    const updatedUser = await User.findById(userId);

    // Prepare the response with the updated user data
    

    res.status(200).json({
      message: "Resume submitted successfully.",
      user:updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error submitting resume:", error.message);
    res.status(500).json({
      message: "Error submitting resume.",
      error: error.message,
    });
  }
};


export const changePassword = async (req, res) => {
    try {
      const userId = req.id; // `isAuthenticated` middleware sets `req.id`
      const { oldPassword, newPassword } = req.body;
  
      // Validate inputs
      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Both old and new passwords are required.",
        });
      }
  
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Check if the old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect.",
        });
      }
  
      // Hash and update the new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };



  // get all candidate

  export const getAllCandidates = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
  
      // Search query
      const query = {
        role: "candidate",
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { "profile.bio": { $regex: search, $options: "i" } },
          { "profile.skills": { $regex: search, $options: "i" } },
          { "profile.title": { $regex: search, $options: "i" } },
          { "profile.location": { $regex: search, $options: "i" } },
        ],
      };
  
      // Pagination logic
      const candidates = await User.find(query)
        .select(
          "firstName lastName email phoneNumber profile.bio profile.skills profile.resume profile.title profile.location profile.photo profile.urls profile.education profile.experience"
        )
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const total = await User.countDocuments(query);
  
      if (!candidates || candidates.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No candidates found.",
        });
      }
  
      return res.status(200).json({
        success: true,
        candidates,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  //get user by id
  

  export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Extract candidate ID from request params
  
      // Find the candidate by ID and ensure the role is 'candidate'
      const candidate = await User.findById(userId)
       

      if (!candidate || candidate.role !== "candidate") {
        return res.status(404).json({
          success: false,
          message: "Candidate not found.",
        });
      }
  
      return res.status(200).json({
        candidate,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
  