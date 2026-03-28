import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

/**
 * Create reusable email transporter using OAuth2
 * Ensures secure authentication with Gmail service
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });
};

// Initialize transporter instance
const transporter = createTransporter();

/**
 * Verify email server connection on startup
 * Helps detect configuration issues early
 */
const verifyTransporter = () => {
  transporter.verify((error) => {
    if (error) {
      console.error("Email server connection failed:", error.message);
    } else {
      console.log("Email server is ready to send messages");
    }
  });
};

// Run transporter verification
verifyTransporter();

/**
 * Validate required email fields before sending
 * Prevents runtime errors and invalid requests
 */
const validateEmailInput = ({ to, subject, html, text }) => {
  if (!to || !subject || (!html && !text)) {
    throw new Error("Missing required email fields");
  }
};

/**
 * Sanitize email input to avoid injection risks
 * Basic trimming and normalization applied
 */
const sanitizeInput = (value) => {
  return typeof value === "string" ? value.trim() : value;
};

/**
 * Send email using configured transporter
 * @param {Object} options - Email configuration object
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} [options.html] - HTML email content
 * @param {string} [options.text] - Plain text fallback
 * @returns {Promise<Object>} Nodemailer response info
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    // Validate required fields before processing
    validateEmailInput({ to, subject, html, text });

    // Sanitize inputs to improve security
    const sanitizedMail = {
      to: sanitizeInput(to),
      subject: sanitizeInput(subject),
      html,
      text,
    };

    // Configure email payload structure
    const mailOptions = {
      from: `"MyPerplexity" <${process.env.GOOGLE_USER}>`,
      ...sanitizedMail,
    };

    // Send email and await response
    const info = await transporter.sendMail(mailOptions);

    // Log success with message identifier
    console.log(`Email sent successfully: ${info.messageId}`);

    return info;
  } catch (error) {
    // Log internal error safely
    console.error("Email sending failed:", error.message);

    // Throw generic error to avoid sensitive leaks
    throw new Error("Failed to send email");
  }
};