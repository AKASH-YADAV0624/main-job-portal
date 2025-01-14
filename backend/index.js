import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import adminRoute from './routes/admin.route.js'
import sitemapRoute from './routes/sitemap.route.js'
dotenv.config({});

const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const corsOptions={
  //  origin:'http://localhost:5173',
  origin:(origin,callback)=>{
    const allowedOrigins=[
       'http://localhost:5173',
       'https://findmycareer.co.in',
       'https://www.findmycareer.co.in', 
    ];
    const isAllowed= allowedOrigins.includes(origin);
    callback(null, isAllowed ?origin:false);
  },
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}
app.use(cors(corsOptions));

const PORT= process.env.PORT || 3000;
//api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);
app.use("/api/v1/admin",adminRoute);

// Sitemap Route
app.use("/", sitemapRoute); // Make sitemap accessible at root


app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at port ${PORT}`)
})