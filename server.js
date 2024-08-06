const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors());
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, service, message } = req.body;

    // Create transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jakewolfford14@gmail.com', // replace with your email
            pass: 'tbyv qmtb cmuo wngp' // replace with your email password or app password
        }
    });

    // Setup email data
    let mailOptions = {
        from: 'jakewolfford14@gmail.com', // change 'your-email@gmail.com' to the same email as above
        to: 'traciewolfforr@gmail.com', // replace with recipient email
        subject: 'Service Request Form Submission',
        text: `You have a new service request from ${name}:
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}`,
        replyTo: email
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Form submitted successfully! Thank you for contacting us.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

