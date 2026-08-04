const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});



// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"LEDGER-BANKING" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function SendRegistrationEmail(userEmail , name) {
  const subject = 'WELLCOME TO BACKEND LEDGER';
  const text  = `HELLO ${name} , \n\ THANKYOU FOR JOINING US`;
  const html = `<p>Hello ${name},</p>
  <p>Thank you for registration. We are excited to onboard you!</p>`;
  await sendEmail(userEmail,subject,text,html)
}

async function SendLoginEmail(userEmail , name) {
  const subject = `${name}, YOU ARE SUCCESSFULLY LOGIN `;
  const text  = `HELLO ${name} , \n\ THIS IS ALERT MESSAGE PLEASE DONT REPLY IF YOU HAVENT LOGIN PLEASE CALL 02111222333`;
  const html = `<p>Hello ${name},</p>
  <p>Thank you for using ledger-banking</p>`;
  await sendEmail(userEmail,subject,text,html)
}

module.exports = {SendRegistrationEmail,SendLoginEmail};