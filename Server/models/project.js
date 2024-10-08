const mongoose = require('mongoose');

// Schema for Project
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    payment: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['USD', 'INR', 'EUR'],
        default: 'USD'
    },
    isHourly: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true
    },
    // fileUrl: {
    //     type: String,
    //     required: true
    // },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
