const verifyToken = require('../middleware/verify-token');
const Deliverable = require('../models/Deliverable');
const router = require('express').Router();
const Task=require('../models/Task');

router.get('/:userId/', verifyToken, async (req, res) => {
    try {
        const deliverables = await Deliverable.find({ trainee: req.params.userId }).populate('traineeId');
        if (!deliverables) {
            return res.status(404).json({ message: 'No deliverables found for this trainee' });
        }
        res.status(200).json(deliverables);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving deliverables', error });
    }
});
router.post('/:userId/', verifyToken, async (req, res) => {
    try {
        req.body.trainee = req.params.userId; // Set the trainee ID to the current user
        req.body.supervisor = req.user._id; // Set the supervisor ID to the current user
        const newDeliverable = await Deliverable.create(req.body);
        console.log(newDeliverable);
        res.status(201).json(newDeliverable);
    } catch (error) {
        res.status(500).json({ message: 'Error creating deliverable', error });
    }
});

router.put('/:userId/:deliverableId', verifyToken, async (req, res) => {
    try {
        const deliverable = await Deliverable.findById(req.params.deliverableId);
        if (!deliverable) {
            return res.status(404).json({ message: 'Deliverable not found' });
        }
        if (!deliverable.supervisor.equals(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized to edit this deliverable' });
        }
        const updatedDeliverable = await Deliverable.findByIdAndUpdate(req.params.deliverableId, req.body, { new: true });
        res.status(200).json(updatedDeliverable);
    } catch (error) {
        res.status(500).json({ message: 'Error updating deliverable', error });
    }
});


module.exports = router;