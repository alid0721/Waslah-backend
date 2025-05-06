const {Schema, model} = require('mongoose');
const { schema } = require('./User');
const { default: Corporation } = require('./Corporation');
const applicationSchema = new Schema({
    traineeName: {
        type: schema.types.ObjectId,
        ref: 'User',
        required: true,
    },
    jobOfferId: {
        type: schema.types.ObjectId,
        ref: 'JobOffer',
        required: true,
    },
    applicationDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    Corporation:{
        //the name of the corporation that created the job offer obtained from the corporation model
        type: Schema.Types.ObjectId,
        ref: 'Corporation',
        required: true,
    },

})

const Application = model('Application', applicationSchema);
module.exports = Application;
