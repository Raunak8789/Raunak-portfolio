const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve HTML files for each route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/education', (req, res) => {
    res.sendFile(__dirname + '/views/education.html');
});

app.get('/projects', (req, res) => {
    res.sendFile(__dirname + '/views/projects.html');
});

app.get('/experience', (req, res) => {
    res.sendFile(__dirname + '/views/experience.html');
});

app.get('/skills', (req, res) => {
    res.sendFile(__dirname + '/views/skills.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

// Handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Message from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        replyTo: email  // Setting the Reply-To to the sender's email address
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('An error occurred while sending your message.');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/contact');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});