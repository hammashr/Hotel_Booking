import nodemailer from "nodemailer";

const getEmailConfig = () => ({
  host: process.env.EMAIL_HOST || "smtp.office365.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587", 10),
  user: process.env.EMAIL_USER || "",
  pass: process.env.EMAIL_PASS || "",
  to:
    process.env.EMAIL_TO || process.env.EMAIL_USER || "hello@thetinyescape.com",
});

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

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
  } = req.body;

  // Basic validation
  if (!fullName || fullName.trim().length < 2) {
    return res
      .status(400)
      .json({ success: false, message: "Full name is required." });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "A valid email address is required." });
  }

  try {
    const emailConfig = getEmailConfig();

    if (!emailConfig.user || !emailConfig.pass) {
      console.error(
        "Contact form email configuration is incomplete. EMAIL_USER and EMAIL_PASS are required.",
      );
      return res.status(503).json({
        success: false,
        message:
          "Contact form is temporarily unavailable. Please try again shortly.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false, // STARTTLS
      requireTLS: true,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
      },
    });

    // Email to the business
    await transporter.sendMail({
      from: `"The Tiny Escape Website" <${emailConfig.user}>`,
      to: emailConfig.to,
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
    });

    // Auto-reply to guest (best-effort)
    try {
      await transporter.sendMail({
        from: `"The Tiny Escape" <${emailConfig.user}>`,
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
      });
    } catch (_) {
      // Auto-reply failure should not block success response
    }

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message. Please try again.",
      });
  }
}
