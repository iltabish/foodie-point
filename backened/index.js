const express = require('express');
const path = require('path');
require("./db/conn");
const Register = require("./models/register");
const app = express();
const port = process.env.PORT || 3000;
const compression = require('compression');
app.use(compression());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, '../frontend/public'), {
    maxAge: '1d' // Cache files for 1 day
}));


// Routes to serve HTML pages (Now pointing to `frontend/`)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/hello.html'));
});
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/services.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/about.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/contact.html'));
});

// Contact form submission
app.post("/contact", async (req, res) => {
    try {
        const registerStudent = new Register(req.body);
        await registerStudent.save();
        res.status(201).sendFile(path.join(__dirname, '../frontend/hello.html'));
    } catch (error) {
        console.error(error);
        res.status(400).send("Oops, an error occurred!");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
