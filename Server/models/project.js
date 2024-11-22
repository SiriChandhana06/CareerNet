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
    category: {
        type: String,
        enum: ['Graphic Design', 'Cartoon Animation' , 'Illustration' , 'Web Development', 'Logo Design' , 'Social Graphics' , 'Article Writing' , 'Video Editing' , 'App Development' , 'AI & ML' , 'UI & UX' , 'Digital Marketing', 'Photography' , 'Others'], 
        default:'Others'
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
    fileUrl: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    // userId: {  
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
    
});

module.exports = mongoose.model('Project', projectSchema);
