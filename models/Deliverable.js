const {Schema, model} = require('mongoose');
const DeliverableSchema = new Schema({
    trainee:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    supervisor:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    checklist:[{
        item:String,
        completed:Boolean
    }],
    createdAt:{
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const Deliverable = model('Deliverable', DeliverableSchema);
module.exports = Deliverable;