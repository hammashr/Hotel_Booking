import nodemailer from "nodemailer";

// ── HTML escaping ─────────────────────────────────────────────────────────────
// Prevents user-supplied values from injecting HTML/links into email bodies.
const escapeHtml = (value) => {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

// ── SMTP header sanitisation ──────────────────────────────────────────────────
// Strips CR / LF to prevent header injection in Subject lines.
const sanitizeHeader = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[\r\n]+/g, " ").trim();
};

const getEmailConfig = () => ({
  host: process.env.EMAIL_HOST || "smtp.office365.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587", 10),
  user: process.env.EMAIL_USER || "",
  pass: process.env.EMAIL_PASS || "",
  to:
    process.env.EMAIL_TO || process.env.EMAIL_USER || "hello@thetinyescape.com",
});

// Field length limits — reject payloads that are unreasonably large
const FIELD_LIMITS = {
  fullName: 120,
  email: 200,
  phone: 40,
  countryCode: 10,
  numberOfTravelers: 10,
  travelType: 100,
  stayInterest: 100,
  preferredMonth: 50,
  message: 2000,
};

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
  } = req.body || {};

  // ── Required field validation ────────────────────────────────────────────
  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
    return res
      .status(400)
      .json({ success: false, message: "Full name is required." });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "A valid email address is required." });
  }

  // ── Length validation ────────────────────────────────────────────────────
  const fields = { fullName, email, phone, countryCode, numberOfTravelers, travelType, stayInterest, preferredMonth, message };
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    const val = fields[field];
    if (val && String(val).length > limit) {
      return res.status(400).json({
        success: false,
        message: `Field '${field}' exceeds maximum allowed length.`,
      });
    }
  }

  // ── Escape all user input before embedding in HTML ───────────────────────
  const safeName         = escapeHtml(fullName);
  const safeEmail        = escapeHtml(email);
  const safePhone        = escapeHtml(phone);
  const safeCode         = escapeHtml(countryCode);
  const safeTravelers    = escapeHtml(numberOfTravelers);
  const safeTravelType   = escapeHtml(travelType);
  const safeStayInterest = escapeHtml(stayInterest);
  const safeMonth        = escapeHtml(preferredMonth);
  const safeMessage      = escapeHtml(message);

  // Sanitize values used in Subject headers
  const safeSubjectName  = sanitizeHeader(fullName);

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
      subject: `New Contact Inquiry from ${safeSubjectName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1F3A2A;">
          <div style="background:#2F5D3A;padding:24px 32px;border-radius:8px 8px 0 0;">
            <h2 style="color:#ffffff;margin:0;font-size:22px;">New Inquiry &#x2013; The Tiny Escape</h2>
          </div>
          <div style="padding:28px 32px;background:#f9fafb;border:1px solid #D4E8D4;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr><td style="padding:8px 0;color:#5A7A5A;width:180px;font-weight:600;">Full Name</td><td style="padding:8px 0;">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#2F5D3A;">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Phone</td><td style="padding:8px 0;">${safeCode ? safeCode + " " : ""}${safePhone || "&#x2014;"}</td></tr>
              <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Number of Guests</td><td style="padding:8px 0;">${safeTravelers || "&#x2014;"}</td></tr>
              <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Occasion</td><td style="padding:8px 0;">${safeTravelType || "&#x2014;"}</td></tr>
              <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Preferred Stay</td><td style="padding:8px 0;">${safeStayInterest || "&#x2014;"}</td></tr>
              <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;">Preferred Month</td><td style="padding:8px 0;">${safeMonth || "&#x2014;"}</td></tr>
              <tr><td style="padding:8px 0;color:#5A7A5A;font-weight:600;vertical-align:top;">Message</td><td style="padding:8px 0;white-space:pre-wrap;">${safeMessage || "&#x2014;"}</td></tr>
            </table>
          </div>
          <p style="font-size:12px;color:#9ca3af;text-align:center;margin-top:16px;">Sent from thetinyescape.com contact form</p>
        </div>
      `,
    });

    // Auto-reply to guest (best-effort) — only safeName used, no other user input
    try {
      await transporter.sendMail({
        from: `"The Tiny Escape" <${emailConfig.user}>`,
        to: email,
        subject: `We received your message, ${safeSubjectName}!`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1F3A2A;">
            <div style="background:#2F5D3A;padding:24px 32px;border-radius:8px 8px 0 0;">
              <h2 style="color:#ffffff;margin:0;font-size:22px;">Thanks for reaching out!</h2>
            </div>
            <div style="padding:28px 32px;background:#f9fafb;border:1px solid #D4E8D4;border-top:none;border-radius:0 0 8px 8px;">
              <p style="font-size:15px;">Hi ${safeName},</p>
              <p style="font-size:15px;">Thank you for contacting <strong>The Tiny Escape</strong>. We&#x27;ve received your message and will get back to you as soon as possible &mdash; usually within 24 hours.</p>
              <p style="font-size:15px;">In the meantime, feel free to browse our stays at <a href="https://thetinyescape.com" style="color:#2F5D3A;">thetinyescape.com</a>.</p>
              <p style="font-size:15px;margin-top:24px;">Warm regards,<br/><strong>The Tiny Escape Team</strong></p>
            </div>
            <p style="font-size:12px;color:#9ca3af;text-align:center;margin-top:16px;">The Tiny Escape &middot; Bruceville-Eddy, TX</p>
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
    console.error("Contact form error:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message. Please try again.",
      });
  }
}
