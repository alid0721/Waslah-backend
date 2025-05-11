const verifyToken= require('../middleware/verify-token.js');
const JobOffer = require('../models/jobOffer.js');
const router = require('express').Router();
const mongoose = require('mongoose');
const Application = require('../models/Application.js');
const User = require('../models/User.js');


//Retrieve all applications for a specific job offer
router.get('/:offerId/applications', verifyToken, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.params.offerId).populate('applications');
        if (!jobOffer) {
            return res.status(404).json({ message: 'Job offer not found' });
        }
        res.status(200).json(jobOffer.applications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving applications', error });
    }
});
// Retrieve a specific application by ID
router.get('/:offerId/applications/:applicationId', verifyToken, async (req, res) => {
    try {
        // const jobOffer = await JobOffer.findById(req.params.offerId).populate('applications');
        // if (!jobOffer) {
        //     return res.status(404).json({ message: 'Job offer not found' });
        // }
        const application = await JobOffer.findById(req.params.offerId).populate('applications').then(jobOffer => {
            return jobOffer.applications.find(app => app._id.equals(req.params.applicationId));
        });
        // const application = await Application.findById(req.params.applicationId).populate('jobOfferId');
        console.log('app:',application)
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error retrieving application', error });
    }
});
// Create a new application for a specific job offer
router.post('/:offerId/applications', verifyToken, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.params.offerId);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Job offer not found' });
        }
        console.log(jobOffer)
        console.log(jobOffer.applications)

        const foundApplication = await Application.findOne({ traineeName: req.user._id, jobOfferId: jobOffer._id });
        if (foundApplication) {
            return res.status(409).json({ message: 'You have already applied for this job offer' });
        }
        // if (jobOffer.applications.some(app=>app.equals(req.user._id))) {
        //     return res.status(409).json({ message: 'You have already applied for this job offer' });
        // }
        req.body.traineeName = req.user._id; // Set the applicant ID to the logged-in user's ID
        req.body.jobOfferId = jobOffer._id; // Set the job offer ID to the current job offer
        req.body.Corporation = jobOffer.Corporation; // Set the Corporation ID to the current job offer's Corporation
        const newapplicatoin= await Application.create(req.body); // Create a new application
        jobOffer.applications.push(newapplicatoin); // Add the application to the job offer
        await jobOffer.save();
        res.status(201).json(newapplicatoin); // Return the created application
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating application', error });
    }
});

// allow the supervisor to accept or reject the application
router.put('/:offerId/applications/:applicationId', verifyToken, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.params.offerId);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Job offer not found' });
        }
        const application = await Application.findByIdAndUpdate(req.params.applicationId, req.body, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        if (!jobOffer.superVisor.equals(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized to edit this application' });
        }
        // update the status of the applicant from student to trainee
        const trainee = await User.findByIdAndUpdate(application.traineeName, { type: 'trainee' }, { new: true });
        if (!trainee) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        await application.save();
        
        res.status(200).json(application); // Return the updated application
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating application', error });
    }
});
module.exports = router;