import { Job } from "../models/job.model.js";
import xml from "xml";

export const generateSitemap = async (req, res) => {
    try {
        const baseUrl = 'https://findmycareer.co.in';

        // Fetch job listings from the database
        const jobs = await Job.find();

        // Create an array for sitemap URLs
        const urls = [
            { url: [{ loc: `${baseUrl}/` }, { priority: 1.0 }] },
            { url: [{ loc: `${baseUrl}/jobs` }, { priority: 0.8 }] },
            { url: [{ loc: `${baseUrl}/browsecompanies` }, { priority: 0.6 }] },
            { url: [{ loc: `${baseUrl}/blog` }, { priority: 0.5 }] },
            { url: [{ loc: `${baseUrl}/contact` }, { priority: 0.5 }] },
            { url: [{ loc: `${baseUrl}/browsecategories` }, { priority: 0.6 }] },
        ];

        // Add individual job URLs
        jobs.forEach(job => {
            urls.push({
                url: [
                    { loc: `${baseUrl}/description/${job.slug}` }, // Assuming 'slug' is a unique identifier for the job
                    { lastmod: job.updatedAt.toISOString() }, // Assuming 'updatedAt' is present in your schema
                    { priority: 0.6 }
                ]
            });
        });

        // Generate XML
        const sitemap = xml({ urlset: [{ _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } }, ...urls] });

        // Set the content type to XML
        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('An error occurred while generating the sitemap.');
    }
};
