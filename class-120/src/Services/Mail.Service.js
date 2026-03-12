// src/Services/Mail.Service.js
import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Google OAuth2 setup
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// 🔹 Create transporter
export const createTransporter = async () => {
  try {
    const accessTokenObj = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenObj?.token;

    if (!accessToken) throw new Error("Failed to generate Gmail access token");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    // Verify transporter
    await transporter.verify();
    console.log("✅ Mail transporter verified successfully");

    return transporter;
  } catch (error) {
    console.error("❌ Failed to create transporter:", error);
    throw error;
  }
};

// 🔹 Send Email function
export const sendMail = async (to, subject, text, html = "") => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: `My-App-Perplexity <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", result.response);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};