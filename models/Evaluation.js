const {Schema, model} = require('mongoose');
const EvaluationSchema = new Schema({
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    supervisorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    jobOfferId: {
        type: Schema.Types.ObjectId,
        ref: 'JobOffer',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Evaluation = model('Evaluation', EvaluationSchema);
module.exports = Evaluation;