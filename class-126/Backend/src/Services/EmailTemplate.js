/**
 * Generate email verification HTML template
 * @param {string} username - User's display name
 * @param {string} verificationLink - Email verification URL
 * @returns {string} HTML email template
 */
export function getVerificationEmailTemplate(username, verificationLink) {
  try {
    // Validate required inputs
    if (!username || !verificationLink) {
      throw new Error("Missing required parameters");
    }

    // Sanitize user input to prevent injection
    const safeUsername = sanitizeInput(username);
    const safeLink = sanitizeInput(verificationLink);

    // Get current year dynamically
    const currentYear = new Date().getFullYear();

    // Return structured email template
    return buildEmailTemplate(safeUsername, safeLink, currentYear);

  } catch (error) {
    // Log error without exposing sensitive data
    console.error("Email template generation failed:", error.message);
    return "";
  }
}

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - Raw user input
 * @returns {string} Sanitized string
 */
function sanitizeInput(input) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Build complete HTML email structure
 * @param {string} username - Safe username
 * @param {string} link - Safe verification link
 * @param {number} year - Current year
 * @returns {string} HTML string
 */
function buildEmailTemplate(username, link, year) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">
      
      <!-- Header section -->
      <h2 style="color: #111827;">Welcome to MyPerplexity</h2>
      
      <!-- Greeting section -->
      <p style="color: #374151; font-size: 16px;">
        Hi ${username},
      </p>

      <!-- Message content -->
      <p style="color: #374151; font-size: 16px;">
        Thanks for signing up! Please verify your email address to activate your account.
      </p>

      <!-- Call-to-action button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" 
           style="background-color: #111827; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 16px;">
          Verify Email
        </a>
      </div>

      <!-- Safety notice -->
      <p style="color: #6b7280; font-size: 14px;">
        If you did not create this account, you can safely ignore this email.
      </p>

      <!-- Divider -->
      <hr style="margin: 20px 0;" />

      <!-- Footer section -->
      <p style="color: #9ca3af; font-size: 12px;">
        © ${year} MyPerplexity. All rights reserved.
      </p>

    </div>
  </div>
  `;
}