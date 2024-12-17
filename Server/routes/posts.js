const express = require('express');
const router = express.Router();
const path = require('path');
const Project = require('../models/project');




// @route POST /api/projects
// @desc Post a new project
router.post('/', async (req, res) => {
    try {
        const { projectName, description, skills, payment, currency, isHourly, email, fileUrl , category} = req.body;
        
        // if (!projectName || !description || !skills || !payment || !currency || !email || !category) {
        //     return res.status(400).json({ success: false, message: 'All fields are required except fileUrl' });
        // }
        
        const parsedSkills = Array.isArray(skills) ? skills : skills.split(',');

        // Create a new project with the uploaded file
        const project = new Project({
            projectName,
            description,
            skills: parsedSkills, 
            category,
            payment,
            currency,
            isHourly:  Boolean (isHourly),  
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


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id); // Logging the id to verify it's received correctly
  
    try {
      const post = await Project.findById(id);
      console.log(post); // Logging the retrieved post to verify
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Correct URL to match the Next.js App Router structure
      const postUrl = `https://careernet.vercel.app/${id}`;
      res.status(200).json({ post, postUrl });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// router.get('/posts/:id', (req, res) => {
//     const { id } = req.params;
//     const post = posts.find(p => p.id === id);

//     if (!post) {
//         return res.status(404).json({ error: "Post not found" });
//     }

//     res.json({ url: post.url });
// });


// @route PUT /api/projects/:id
// @desc Edit an existing project
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { projectName, description, skills, payment, currency, isHourly, email, fileUrl, category } = req.body;

        // Find the project by ID
        let project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Parse skills if it's a string
        const parsedSkills = Array.isArray(skills) ? skills : skills.split(',');

        // Update project fields
        project.projectName = projectName || project.projectName;
        project.description = description || project.description;
        project.skills = parsedSkills || project.skills;
        project.payment = payment || project.payment;
        project.currency = currency || project.currency;
        project.isHourly = isHourly !== undefined ? Boolean(isHourly) : project.isHourly;
        project.email = email || project.email;
        project.fileUrl = fileUrl || project.fileUrl;
        project.category = category || project.category;

        // Save the updated project
        await project.save();

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            project
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// @route DELETE /api/projects/:id
// @desc Delete a project by ID

router.delete('/mypost/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the project ID from the request parameters

        // Find and delete the project by ID
        const deletedProject = await Project.findByIdAndDelete(id);

        // If no project is found with the given ID
        if (!deletedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
            deletedProject,
        });
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
