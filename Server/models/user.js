const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ["LinkedIn", "GitHub", "Twitter", "Telegram"], // Valid platforms
  },
  url: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Allow empty or valid URL
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  profileSrc: { type: String },
  coverSrc: { type: String },
  dob: { type: String },
  languages: { type: [String] },
  socialLinks: { type: [socialLinkSchema], default: [], },
  education: { type: [String] },

  currentlyWorking: 
    {
      currentlyWorkingCompany: { type: String, default: ""  },
      currentlyWorkingRole: { type: String, default: ""  },
      currentlyWorkingDescription: { type: String, default: ""  },
    },

  countryCode: {
    type: String,
    enum: ['India', 'USA', 'UK'],
    default: 'India'
  },
  contactNumber: { type: String },

  portfolio: 
    {
      portfolioSrc: { type: String, default: ""  },
      portfolioRole: { type: String, default: ""  },
      portfolioLink: { type: String, default: ""  },
      portfolioDomain: {
        type: String,
        enum: ['Graphic Design', 'Cartoon Animation', 'Illustration', 'Web Development', 'Logo Design', 'Social Graphics', 'Article Writing', 'Video Editing', 'App Development', 'AI & ML', 'UI & UX', 'Digital Marketing', 'Photography', 'Others'],
        default: 'Others'
      },
    },

  bioTitle: { type: String, default: ""  },
  bio: { type: String, default: ""  },
  bioSkills: {
    type: [String],
  },
  
  experiences: [
    {
      title: { type: String, default: "" },
      companyName: { type: String, default: "" },
      startDate: { type: String, default: "" },
      endDate: { type: String, default: "" },
      isCurrently: { type: Boolean, default: false },
    },
  ],
  // experienceCompanyRole: { type: [String] },
  // experienceCompanyName: { type: [String] },
  // experienceStartDate: { type: [String] },
  // experienceEndDate: { type: [String] },
  // isCurrently: {
  //   type: [Boolean],
  //   default: false
  // },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
