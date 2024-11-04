const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
require("dotenv").config();


const app = express();

const allowedOrigins = [
  'https://careernet.vercel.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' })); // Increase to 10 MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Increase to 10 MB


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const authRoutes = require('./routes/auth');

app.use("/api/auth", authRoutes);



// Static folder for file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const projectRoutes = require('./routes/posts');
app.use('/api/projects', projectRoutes);


app.get('/', (req, res) => {
  res.send('Server is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



