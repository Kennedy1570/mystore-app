const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/Users');
const Product = require('./models/Products');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("MongoDB Connected");

    // Read db.json
    const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

    // Insert Data
    await User.insertMany(data.users);
    await Product.insertMany(data.products);

    console.log("Data Imported");
    process.exit();
}).catch(err => console.error(err));
