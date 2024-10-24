const express = require('express');
const router = express.Router();
const path = require('path');
const Project = require('../models/project');

// @route POST /api/projects
// @desc Post a new project
router.post('/', async (req, res) => {
    try {
        const { projectName, description, skills, payment, currency, isHourly, email, fileUrl} = req.body;

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

router.post('/', async (req, res) => {
    try {
      const { userEmail } = req.body;
      console.log(userEmail);
      if (!userEmail) {
        return res.status(400).json({ error: 'User email is required.' });
      }
      const posts = await Project.find({ email: userEmail });
      console.log(posts);
      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts.' });
    }
  });


module.exports = router;
