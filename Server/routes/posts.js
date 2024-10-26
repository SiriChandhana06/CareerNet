const express = require('express');
const router = express.Router();
const path = require('path');
const Project = require('../models/project');




// @route POST /api/projects
// @desc Post a new project
router.post('/', async (req, res) => {
    try {
        const { projectName, description, skills, payment, currency, isHourly, email, fileUrl} = req.body;
        
        if (!projectName || !description || !skills || !payment || !currency || !email) {
            return res.status(400).json({ success: false, message: 'All fields are required except fileUrl' });
        }
        
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
            fileUrl,
            // userId: req.user._id 
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

router.post('/mypost', async (req, res) => {
    try {
        const { email} = req.body;

        // Create a new project with the uploaded file
        const project = await Project.find({email});

        res.status(201).json({
            success: true,
            project,
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

// @route GET /api/projects/my-posts
// @desc Get posts created by the logged-in user
// router.get('/my-posts', async (req, res) => {
//     try {
//         const projects = await Project.find({ userId: req.user._id }).sort({ postedAt: -1 });
//         res.json(projects);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// router.post('/', verifyToken, async (req, res) => {
//     try {
//       const userId = req.userId; // Retrieved from the decoded token
  
//       // Fetch the user's email from the User model based on the userId
//       const user = await User.findById(userId);
//       const userEmail = user.email;
  
//       if (!userEmail) {
//         return res.status(400).json({ error: 'User email is required.' });
//       }
  
//       // Fetch posts for the authenticated user based on their email
//       const posts = await Project.find({ email: userEmail });
//       res.status(200).json({ posts });
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       res.status(500).json({ error: 'Failed to fetch posts.' });
//     }
//   });


module.exports = router;
