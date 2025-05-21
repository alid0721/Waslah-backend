const {Schema, model} = require('mongoose');

const applicationSchema = new Schema({
    traineeName: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,"trainee name is required"],
    },
    jobOfferId: {
        type: Schema.Types.ObjectId,
        ref: 'JobOffer',
        required: [true,'job offer id is required'],
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
    // Corporation:{
    //     //the name of the corporation that created the job offer obtained from the corporation model
    //     type: Schema.Types.ObjectId,
    //     ref: 'Corporation',
    //     required: false,
    // },

},{ timestamps: true });

const Application = model('Application', applicationSchema);
module.exports = Application;
