import mongoose from "mongoose";
import slugify from "slugify"; // Import slugify for creating slugs

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    jobType: {
      type: [String], // Change into an array of strings
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    category: {
      type: [String], // Category is now an array of strings
      required: true,
    },
    externalLink: {
      type: String,
    },
    minimumSalary: {
      type: Number,
    },
    maximumSalary: {
      type: Number,
    },
    minimumRate: {
      type: Number,
    },
    maximumRate: {
      type: Number,
    },
    applicationEmail: {
      type: String,
    },
    jobTags: {
      type: String,
    },
    closingDate: {
      type: Date,
    },
    jobRegion: {
      type: String,
    },
    views: {
      type: Number,
      default: 0, // Initialize views to 0
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Default to pending when a job is first created
    },
    filled: { type: Boolean, default: false }, // Filled status
    slug: {
      type: String,
      unique: true, // Ensure slug is unique
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug based on the title
jobSchema.pre("save", async function (next) {
  if (this.title && !this.slug) {
    // Create a slug from the title
    let slug = slugify(this.title, { lower: true, strict: true });

    // Check for duplicate slugs
    let existingJob = await Job.findOne({ slug });
    let counter = 1;

    // If the slug already exists, append a number to make it unique
    while (existingJob) {
      slug = `${slugify(this.title, { lower: true, strict: true })}-${counter}`;
      existingJob = await Job.findOne({ slug });
      counter++;
    }

    this.slug = slug;
  }
  next();
});



export const Job = mongoose.model("Job", jobSchema);
