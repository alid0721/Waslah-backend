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

router.get('/:userId/:deliverableId', verifyToken, async (req, res) => {
    try {
        const deliverable = await Deliverable.findById(req.params.deliverableId).populate('traineeId');
        if (!deliverable) {
            return res.status(404).json({ message: 'Deliverable not found' });
        }
        res.status(200).json(deliverable);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving deliverable', error });
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

router.get('/task/',verifyToken, async (req,res)=>{
    try {
        const tasks=await Task.find({trainee:req.user._id}).populate('trainee').populate('supervisor');
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found for this trainee' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
})

router.post('/task/:traineeId',verifyToken, async (req,res)=>{
    try {
        req.body.trainee=req.params.traineeId; // Set the trainee ID to the current user
        req.body.supervisor=req.user._id; // Set the supervisor ID to the current user
        const newTask=await Task.create(req.body);
        console.log(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
})
router.put('/task/:taskId',verifyToken, async (req,res)=>{
    try {
        const task=await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (!task.supervisor.equals(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized to edit this task' });
        }
        const updatedTask=await Task.findByIdAndUpdate(req.params.taskId,req.body,{new:true});
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
})

module.exports = router;