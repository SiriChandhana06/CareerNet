// const express = require("express");
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// const router = express.Router();


// // Middleware to verify JWT
// // function verifyToken(req, res, next) {
// //   const token = req.headers["authorization"];
  
// //   if (!token) {
// //     return res.status(403).json({ message: "No token provided" });
// //   }

// //   try {
// //     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
// //     req.userId = decoded.id; // store user ID in request for later use
// //     next();
// //   } catch (error) {
// //     return res.status(401).json({ message: "Unauthorized" });
// //   }
// // }

// // @route   POST /api/auth/signup
// // @desc    Register new user
// // router.post("/signup", async (req, res) => {
// //   const { firstName, lastName, email, password } = req.body;

// router.post("/signup", async (req, res) => {

//   const {
//     firstName,
//     lastName,
//     email,
//     password,
//     userName,
//     // bioSkills,
//     // profileSrc,
//     // coverSrc,
//     // dob,
//     // languages,
//     // socialLinks,
//     // education,
//     // currentlyWorkingCompany,
//     // currentlyWorkingRole,
//     // currentlyWorkingDescription,
//     // countryCode,
//     // contactNumber,
//     // portfolioSrc,
//     // portfolioRole,
//     // portfolioLink,
//     // portfolioDomain,
//     // bioTitle,
//     // bio,
//     // experienceCompanyRole,
//     // experienceCompanyName,
//     // experienceStartDate,
//     // experienceEndDate,
//     // isCurrently,
//   } = req.body;



//   if (!firstName || !lastName || !email || !password || !userName) {
//     return res.status(400).json({ message: "Please fill in all fields" });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const existingUserName = await User.findOne({ userName });
//     if (existingUserName) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     const parsedSkills = Array.isArray(bioSkills) ? bioSkills : bioSkills.split(',');

//     const parsedLanguages = Array.isArray(languages) ? languages : languages.split(',') ;

//     const parsedSocialLinks = Array.isArray(socialLinks) ? socialLinks: socialLinks.split(',');

//     const parsedEducation = Array.isArray(education) ? education : education.split(',');

//     const parsedExperienceCompanyRole = Array.isArray(experienceCompanyRole) ? experienceCompanyRole : experienceCompanyRole.split(',');

//     const parsedExperienceCompanyName = Array.isArray(experienceCompanyName) ? experienceCompanyName : experienceCompanyName.split (',');

//     const parsedExperienceStartDate = Array.isArray(experienceStartDate) ? experienceStartDate : experienceStartDate.split(',');

//     const parsedExperienceEndDate = Array.isArray(experienceEndDate) ? experienceEndDate : experienceEndDate.split(',');

//     // Create new user
//     // const newUser = new User({ firstName, lastName, email, password });
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password,
//       userName,
//       bioSkills : parsedSkills,
//       profileSrc,
//       coverSrc,
//       dob,
//       languages : parsedLanguages,
//       socialLinks : parsedSocialLinks,
//       education : parsedEducation,
//       currentlyWorkingCompany,
//       currentlyWorkingRole,
//       currentlyWorkingDescription,
//       countryCode,
//       contactNumber,
//       portfolioSrc,
//       portfolioRole,
//       portfolioLink,
//       portfolioDomain,
//       bioTitle,
//       bio,
//       experienceCompanyRole : parsedExperienceCompanyRole,
//       experienceCompanyName : parsedExperienceCompanyName,
//       experienceStartDate : parsedExperienceStartDate,
//       experienceEndDate : parsedExperienceEndDate,
//       isCurrently:  Boolean (isCurrently),
//     });
//     await newUser.save();

//     // Generate token
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: newUser._id,
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         email: newUser.email,
//         userName: newUser.userName,
//       },
//       token,
//     });
//   // } catch (err) {
//   //   res.status(500).json({ message: "Server error", error: err.message });
//   // }
//   } catch (err) {
//     // Handle unique constraint errors
//     if (err.code === 11000) {
//       const duplicateKey = Object.keys(err.keyValue)[0];
//       return res.status(400).json({ message: `${duplicateKey} already exists` });
//     }

//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // @route   POST /api/auth/login
// // @desc    Login user and get token
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Basic validation
//   if (!email || !password) {
//     return res.status(400).json({ message: "Please fill in all fields" });
//   }

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Check password
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       },
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });


// // // @route   GET /api/auth/getUserEmail
// // // @desc    Get user's email based on token
// // router.get("/getUserEmail", verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select("email");

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }
// //     console.log(user.email);
// //     res.status(200).json({ email: user.email });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // });



// module.exports = router;







const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();


// Middleware to verify JWT
// function verifyToken(req, res, next) {
//   const token = req.headers["authorization"];
  
//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//     req.userId = decoded.id; // store user ID in request for later use
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// }

// @route   POST /api/auth/signup
// @desc    Register new user
// router.post("/signup", async (req, res) => {
//   const { firstName, lastName, email, password,userName } = req.body;


//   if (!firstName || !lastName || !email || !password || !userName) {
//     return res.status(400).json({ message: "Please fill in all fields" });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const existingUserName = await User.findOne({ userName });
//     if (existingUserName) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Create new user
//     const newUser = new User({ firstName, lastName, email, password,userName });
//     await newUser.save();

//     // Generate token
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: newUser._id,
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         email: newUser.email,
//         userName: newUser.userName,
//       },
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// @route   POST /api/auth/signup
// @desc    Register new user

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, userName, ...optionalFields } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !userName) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if username already exists
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Parse optional fields only if they are provided
    const optionalData = {
      bioSkills: optionalFields.bioSkills
        ? Array.isArray(optionalFields.bioSkills)
          ? optionalFields.bioSkills
          : optionalFields.bioSkills.split(",")
        : undefined,
      profileSrc: optionalFields.profileSrc || undefined,
      coverSrc: optionalFields.coverSrc || undefined,
      dob: optionalFields.dob || undefined,
      languages: optionalFields.languages
        ? Array.isArray(optionalFields.languages)
          ? optionalFields.languages
          : optionalFields.languages.split(",")
        : undefined,
      socialLinks: optionalFields.socialLinks
        ? Array.isArray(optionalFields.socialLinks)
          ? optionalFields.socialLinks
          : optionalFields.socialLinks.split(",")
        : undefined,
      education: optionalFields.education
        ? Array.isArray(optionalFields.education)
          ? optionalFields.education
          : optionalFields.education.split(",")
        : undefined,
      currentlyWorkingCompany: optionalFields.currentlyWorkingCompany || undefined,
      currentlyWorkingRole: optionalFields.currentlyWorkingRole || undefined,
      currentlyWorkingDescription: optionalFields.currentlyWorkingDescription || undefined,
      countryCode: optionalFields.countryCode || undefined,
      contactNumber: optionalFields.contactNumber || undefined,
      portfolioSrc: optionalFields.portfolioSrc || undefined,
      portfolioRole: optionalFields.portfolioRole || undefined,
      portfolioLink: optionalFields.portfolioLink || undefined,
      portfolioDomain: optionalFields.portfolioDomain || undefined,
      bioTitle: optionalFields.bioTitle || undefined,
      bio: optionalFields.bio || undefined,
      experienceCompanyRole: optionalFields.experienceCompanyRole
        ? Array.isArray(optionalFields.experienceCompanyRole)
          ? optionalFields.experienceCompanyRole
          : optionalFields.experienceCompanyRole.split(",")
        : undefined,
      experienceCompanyName: optionalFields.experienceCompanyName
        ? Array.isArray(optionalFields.experienceCompanyName)
          ? optionalFields.experienceCompanyName
          : optionalFields.experienceCompanyName.split(",")
        : undefined,
      experienceStartDate: optionalFields.experienceStartDate
        ? Array.isArray(optionalFields.experienceStartDate)
          ? optionalFields.experienceStartDate
          : optionalFields.experienceStartDate.split(",")
        : undefined,
      experienceEndDate: optionalFields.experienceEndDate
        ? Array.isArray(optionalFields.experienceEndDate)
          ? optionalFields.experienceEndDate
          : optionalFields.experienceEndDate.split(",")
        : undefined,
      isCurrently: optionalFields.isCurrently ? Boolean(optionalFields.isCurrently) : undefined,
    };

    // Create a new user with required and optional fields
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      userName,
      ...optionalData, // Spread optional fields
    });

    // Save the user
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userName: newUser.userName,
      },
      token,
    });
  } catch (err) {
    // Handle unique constraint errors
    if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${duplicateKey} already exists` });
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post("/check-availability", async (req, res) => {
  const { email, userName } = req.body;

  try {
    if (!email && !userName) {
      return res
        .status(400)
        .json({ message: "Email or username is required for validation." });
    }

    const errors = {};

    // Check email
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        errors.email = "Email already exists.";
      }
    }

    // Check username
    if (userName) {
      const existingUserName = await User.findOne({ userName });
      if (existingUserName) {
        errors.userName = "Username already exists.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(409).json({ message: "Validation errors", errors });
    }

    res.status(200).json({ message: "Email and username are available." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// @route   POST /api/auth/login
// @desc    Login user and get token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// // @route   GET /api/auth/getUserEmail
// // @desc    Get user's email based on token
// router.get("/getUserEmail", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("email");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     console.log(user.email);
//     res.status(200).json({ email: user.email });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });



module.exports = router;
