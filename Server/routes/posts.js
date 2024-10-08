const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Project = require('../models/project');

// File storage setup with Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to accept specific formats
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp', 'image/tiff'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only images are allowed!'), false);
    }
};

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// @route POST /api/projects
// @desc Post a new project
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { projectName, description, skills, payment, currency, isHourly, email } = req.body;

        const parsedSkills = Array.isArray(skills) ? skills : skills.split(',');

        // Create a new project with the uploaded file
        const project = new Project({
            projectName,
            description,
            skills: parsedSkills, 
            payment,
            currency,
            isHourly: isHourly === 'true',  // Parse boolean from string
            email,
            // fileUrl: `/uploads/${req.file.filename}`  // Save file path
        });

        // Save project to the database
        await project.save();

        res.status(201).json({
            success: true,
            message: 'Project posted successfully!',
            project
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route GET /api/projects
// @desc Get all posted projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ postedAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
