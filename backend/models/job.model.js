import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
       
    },
    jobType:{
        type:[String],  //change into string
        
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
    }],
    category: {  // Added category field
        type: [String],
        required: true,  // You can set this to false if category is optional
    },
    externalLink:{    // req to external link
        type:String, 
    },
    minimumSalary:{    // salary to minimum
        type:Number,
       
    },
    maximumSalary:{     // expr to this
        type:Number,
      
    },
    minimumRate:{            // position to min
        type:Number,
       
    },
    maximumRate:{              // new    
        type:Number,
       
    },
    applicationEmail:{              //new
        type:String,
       
    },
    jobTags:{            // new
        type:String,
       
    },
    closingDate:{            //new
        type:Date,
       
    },
    jobRegion:{            //new
        type:String,
       
    },
    views: {
        type: Number,
        default: 0, // Initialize views to 0
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',  // Default to pending when a job is first created
      },
      filled: { type: Boolean, default: false }, // Filled status
   

},{timestamps:true})

export const Job=mongoose.model('Job',jobSchema);