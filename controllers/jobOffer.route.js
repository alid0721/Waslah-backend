const verifyToken= require('../middleware/verify-token.js');
const JobOffer = require('../models/jobOffer.js');
const router = require('express').Router();
const mongoose = require('mongoose');
// Retrieve all job offers
router.get('/', async (req, res) => {
    try {
        const jobOffers = await JobOffer.find().populate(['title', 'jobDetail', 'requirements', 'CorporationName', 'superVisor', 'startDate', 'applicationEndDate']);
        res.status(200).json(jobOffers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving job offers', error });
    }
});

// Retrieve a specific job offer by ID
router.get('/:offerId', async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.params.offerId).populate(['title', 'jobDetail', 'requirements', 'CorporationName', 'superVisor', 'startDate', 'applicationEndDate']);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Job offer not found' });
        }
        res.status(200).json(jobOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving job offer', error });
    }
}
);


// Create a new job offer (Supervisor only)
router.post('/', verifyToken, async (req, res) => {
    //check if the user is a supervisor
    if (req.user.type !== 'supervisor') {
        return res.status(403).json({ message: 'Only supervisors can create job offers' });
    }
    try {
        req.body.superVisor = req.user._id; // Set the supervisor ID to the logged-in user's ID
        console.log(req.body);
        const newJobOffer = await JobOffer.create(req.body);
        console.log(newJobOffer);
        res.status(201).json(newJobOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job offer', error });
    }
});

// Edit a job offer (Supervisor only, must be creator)
router.put('/:offerId', verifyToken, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.params.offerId);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Job offer not found' });
        }
        if (!jobOffer.superVisor.equals(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized to edit this job offer' });
        }
        const updatedJobOffer = await JobOffer.findByIdAndUpdate(req.params.offerId, req.body, { new: true });
        res.status(200).json(updatedJobOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating job offer', error });
    }
});

// Delete a job offer (Supervisor only, must be creator)
router.delete('/:offerId', verifyToken, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findById(req.params.offerId);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Job offer not found' });
        }
        if (!jobOffer.superVisor.equals(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized to delete this job offer' });
        }
        await JobOffer.findByIdAndDelete(req.params.offerId);
        res.status(200).json({ message: 'Job offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job offer', error });
    }
});

module.exports = router;