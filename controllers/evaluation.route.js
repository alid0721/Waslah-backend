const verifyToken = require('../middleware/verify-token');
const Evaluation = require('../models/Evaluation');
const router = require('express').Router();
const User = require('../models/User');
const JobOffer = require('../models/jobOffer');
// retrieve all evaluations for a specific job offer
router.get('/:offerId/evaluations', verifyToken, async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ jobOfferId: req.params.offerId }).populate('traineeName');
        if (!evaluations) {
            return res.status(404).json({ message: 'No evaluations found for this job offer' });
        }
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving evaluations', error });
    }
});
// retrieve a specific evaluation by ID
router.get('/:offerId/evaluations/:evaluationId', verifyToken, async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.evaluationId).populate('applicantId');
        if (!evaluation) {
            return res.status(404).json({ message: 'Evaluation not found' });
        }
        res.status(200).json(evaluation);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving evaluation', error });
    }
}
);
// create a new evaluation for a specific job offer
router.post('/:offerId/evaluations', verifyToken,async (req, res) => {
    try {
        
        const jobOffer = await JobOffer.findById(req.params.offerId);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Job offer not found' });
        }
        req.body.supervisorId = req.user._id; // Set the supervisor ID to the current user
        req.body.jobOfferId = jobOffer._id; // Set the job offer ID to the current job offer
        const newEvaluation = await Evaluation.create(req.body);
        console.log(newEvaluation);
        res.status(201).json(newEvaluation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating evaluation', error });
    }
})

module.exports = router;