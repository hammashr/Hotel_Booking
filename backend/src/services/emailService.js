const nodemailer = require("nodemailer");
const { env } = require("../config/env");
const { logger } = require("../utils/logger");

// Create reusable transporter using GoDaddy / Office 365 SMTP
const createTransporter = () =>
  nodemailer.createTransport({
    host: env.EMAIL_HOST, // smtp.office365.com
    port: env.EMAIL_PORT, // 587
    secure: false, // STARTTLS (not SSL)
    requireTLS: true,
    auth: {
      user: env.EMAIL_USER, // hello@thetinyescape.com
      pass: env.EMAIL_PASS, // GoDaddy email password
    },
  });

/**
 * Send contact form submission to hello@thetinyescape.com
 */
const sendContactEmail = async (formData) => {
  const {
    fullName,
    email,
    phone,
    countryCode,
    numberOfTravelers,
    travelType,
    stayInterest,
    preferredMonth,
    message,
  } = formData;

  if (!env.EMAIL_USER || !env.EMAIL_PASS) {
    throw new Error(
      "Email configuration is incomplete. EMAIL_USER and EMAIL_PASS are required.",
    );
  }

  const transporter = createTransporter();

  // Email to the business — full form details
  const businessMail = {
    from: `"The Tiny Escape Website" <${env.EMAIL_USER}>`,
    to: env.EMAIL_TO,
    replyTo: email,
    subject: `New Contact Inquiry from ${fullName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1F3A2A;">
        <div style="background:#2F5D3A;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h2 style="color:#ffffff;margin:0;font-size:22px;">New Inquiry – The Tiny Escape</h2>
        </div>
        <div style="padding:28px 32px;background:#f9fafb;border:1px solid #D4E8D4;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;">
            <tr><td style="padding:8px 0;color:#5A7A5A;width:180px;font-weight:600;">Full Name</td><td style="padding:8px 0;">${fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#2F5D3A;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Phone</td><td style="padding:8px 0;">${countryCode || ""} ${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Number of Guests</td><td style="padding:8px 0;">${numberOfTravelers || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Occasion</td><td style="padding:8px 0;">${travelType || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Preferred Stay</td><td style="padding:8px 0;">${stayInterest || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Preferred Month</td><td style="padding:8px 0;">${preferredMonth || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;vertical-align:top;">Message</td><td style="padding:8px 0;">${message || "—"}</td></tr>
          </table>
        </div>
        <p style="font-size:12px;color:#9ca3af;text-align:center;margin-top:16px;">Sent from thetinyescape.com contact form</p>
      </div>
    `,
  };

  // Auto-reply to the guest
  const guestMail = {
    from: `"The Tiny Escape" <${env.EMAIL_USER}>`,
    to: email,
    subject: `We received your message, ${fullName}!`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1F3A2A;">
        <div style="background:#2F5D3A;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h2 style="color:#ffffff;margin:0;font-size:22px;">Thanks for reaching out!</h2>
        </div>
        <div style="padding:28px 32px;background:#f9fafb;border:1px solid #D4E8D4;border-top:none;border-radius:0 0 8px 8px;">
          <p style="font-size:15px;">Hi ${fullName},</p>
          <p style="font-size:15px;">Thank you for contacting <strong>The Tiny Escape</strong>. We've received your message and will get back to you as soon as possible — usually within 24 hours.</p>
          <p style="font-size:15px;">In the meantime, feel free to browse our stays at <a href="https://tinyescape.vercel.app" style="color:#2F5D3A;">thetinyescape.com</a>.</p>
          <p style="font-size:15px;margin-top:24px;">Warm regards,<br/><strong>The Tiny Escape Team</strong></p>
        </div>
        <p style="font-size:12px;color:#9ca3af;text-align:center;margin-top:16px;">The Tiny Escape · Bruceville-Eddy, TX</p>
      </div>
    `,
  };

  // Send both emails
  await transporter.sendMail(businessMail);
  logger.info(`Contact email sent to ${env.EMAIL_TO} from ${email}`);

  // Best-effort auto-reply — don't fail the request if it errors
  try {
    await transporter.sendMail(guestMail);
    logger.info(`Auto-reply sent to ${email}`);
  } catch (err) {
    logger.warn(`Auto-reply failed for ${email}: ${err.message}`);
  }
};

module.exports = { sendContactEmail };
