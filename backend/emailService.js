require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendStatusEmail = async (userEmail, userName, listingName, status) => {
  try {
    const mailOptions = {
      from: `"Skillbridge Notifications" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Application Status Update: ${listingName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${userName},</h2>
          <p>There has been an update regarding your application for <strong>${listingName}</strong>.</p>
          <p>Your current status is now: <span style="font-size: 18px; font-weight: bold; color: #007bff;">${status.toUpperCase()}</span></p>
          <br>
          <p>Log in to your dashboard for more details.</p>
          <p>Best regards,<br>The Skillbridge Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${userEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendClosingReminderEmail = async (userEmail, userName, listingName) => {
  try {
    const mailOptions = {
      from: `"Skillbridge Notifications" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Reminder: ${listingName} Closes in 3 Days!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${userName || 'there'},</h2>
          <p>This is a quick reminder that the listing <strong>${listingName}</strong> you saved is closing in 3 days.</p>
          <p>Don't miss out! Log in to your dashboard to view the details.</p>
          <br>
          <p>Best regards,<br>The Skillbridge Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Closing reminder email sent successfully to ${userEmail}`);
  } catch (error) {
    console.error("Error sending closing reminder email:", error);
  }
};

module.exports = { sendStatusEmail, sendClosingReminderEmail };