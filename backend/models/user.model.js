import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type: String,
        required:true,
       
    },
    lastName:{
        type: String,
        required:true,
    },
    role:{
        type:String,
        enum:['candidate','employer'],
        default:'candidate',
        required:true,
    },
    phoneNumber:{
        type:Number,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        photo:{
            type: String,
            default:""
        },
        title: { type: String },
        location: { type: String },
        videoLink: { type: String }, // Optional video link for candidate introduction
        category: { type: String }, // Resume category (e.g., Web Dev, IT)
        content: { type: String },
        minRate: { type: Number }, // Minimum rate expected
        urls: [
          {
            url: { type: String },
            description: { type: String }, // Optional description for the link
          },
        ],
        education: [
          {
            institute: { type: String },
            degree: { type: String },
            fieldOfStudy: { type: String },
            startYear: { type: Number },
            endYear: { type: Number },
          },
        ],
        experience: [
          {
            employer: { type: String },
            jobTitle: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
           
          },
        ],
      
    },
    
},{timestamps:true});

export const User=mongoose.model('User',userSchema);