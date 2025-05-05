const {Schema, model} = require('mongoose');
const { default: Corporation } = require('./Corporation');
const { application } = require('express');
const JobOfferSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    jobDetail: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    CorporationName:{
        //the name of the corporation that created the job offer obtained from the corporation model
        type: Schema.Types.ObjectId,
        ref: 'Corporation',
        required: true,
    },
    superVisor:{
        //the name of the supervisor that created the job offer obtained from the user model
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    applicationEndDate:{
        type: Date,
        required: true,
    },
});