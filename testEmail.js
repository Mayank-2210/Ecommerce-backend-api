require('dotenv').config();
const sendEmail = require('./utils.js/sendEmail')

sendEmail({
    to:'mrstranger0314@gmail.com',
    subject:'Nodemailer testing',
    text:'This is a test email sent using Nodemailer in your Project.',
}).then(()=>{
    console.log('Email sent successfully');
}).catch((err)=>{
    console.error("Email Sending Failed",err.message);
})