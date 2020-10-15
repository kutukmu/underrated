const nodemailer = require("nodemailer");
require("dotenv").config({ path: "variables.env" });
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

module.exports = transporter;
