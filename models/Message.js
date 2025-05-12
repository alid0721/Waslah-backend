const{Schema, model} = require('mongoose');
const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // read: {
    //     type: Boolean,
    //     default: false,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });