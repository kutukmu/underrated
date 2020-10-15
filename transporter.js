const nodemailer = require("nodemailer");
require("dotenv").config({ path: "variables.env" });
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "pastelpack0@gmail.com", // generated ethereal user
    pass: "kerim001", // generated ethereal password
  },
});

module.exports = transporter;
