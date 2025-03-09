require('dotenv').config(); 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.error("MongoDB Connection Error:", e.message);
});
