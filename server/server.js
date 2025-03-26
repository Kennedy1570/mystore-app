require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const multer = require('multer')
const userRoute = require('./routes/UserRoutes');
const productRoute = require('./routes/ProductRoutes');
const loginRoute = require('./routes/LoginRoute');
const registerRoute = require('./routes/RegisterRoute');

// Middleware
app.use(express.json());
app.use(cors ({origin: 'http://localhost:3000', // Your React app's address
  credentials: true}));

app.use('/images', express.static('public/images'));
app.use('/products', express.static('uploads/products'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute)

app.locals.upload = upload;
//app.locals.authenticateToken = authenticateToken;

app.listen(PORT, () => {console.log("Server started on port 5000")})
