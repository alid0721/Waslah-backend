const verifyToken = require('../middleware/verify-token');
const message = require('../models/Message');
const router = require('express').Router();
const User = require('../models/User');

router.get('/:userId/', verifyToken, async (req, res) => {
    try {
        const messages = await message.find({ receiverId: req.params.userId }).populate('senderId');
        if (!messages) {
            return res.status(404).json({ message: 'No messages found for this user' });
        }
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
});
router.post('/:receiverId/', verifyToken, async (req, res) => {
    try {
        req.body.senderId = req.user._id; // Set the sender ID to the current user
        req.body.receiverId = req.params.receiverId; // Set the receiver ID to the current user
        const newMessage = await message.create(req.body);
        console.log(newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error });
    }
});

module.exports = router;