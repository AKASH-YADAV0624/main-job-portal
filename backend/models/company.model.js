import mongoose from "mongoose";

const companySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    website:{
        type:String 
    },
    location:{
        type:String,
    },
    video:{
        type:String,
    },
    salary:{
        type:String,
    },
    companyContent:{
        type:String,
    },
    logo:{
        type:String,//url to company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',  // Default to pending when a job is first created
      },
},{timestamps:true})

export const Company=mongoose.model('Company',companySchema);