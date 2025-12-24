const nodemailer = require('nodemailer');
const EMAIL_ADDRESSES = require('../config/email');

// Create reusable transporter
let transporter = null;

const createTransporter = () => {
  if (transporter) {
    return transporter;
  }

  // SMTP configuration from environment variables
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Verify connection in development
  if (process.env.NODE_ENV === 'development') {
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email service configuration error:', error.message);
      } else {
        console.log('✅ Email service is ready to send messages');
      }
    });
  }

  return transporter;
};

/**
 * Send email with proper routing based on email type
 */
const sendEmail = async (options) => {
  try {
    // Don't send emails in development if SMTP is not configured
    if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
      console.log('📧 Email would be sent (development mode, SMTP not configured):', {
        to: options.to,
        subject: options.subject,
        from: options.from,
      });
      return { success: true, message: 'Email skipped (development mode)' };
    }

    const mailTransporter = createTransporter();

    const mailOptions = {
      from: options.from || EMAIL_ADDRESSES.NO_REPLY,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      replyTo: options.replyTo,
    };

    const info = await mailTransporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    // Don't throw error - email failures shouldn't break the app
    return { success: false, error: error.message };
  }
};

/**
 * Send transactional email (from no-reply@carsmartclub.com)
 */
const sendTransactionalEmail = async (to, subject, html, text) => {
  return sendEmail({
    to,
    from: EMAIL_ADDRESSES.NO_REPLY,
    subject,
    html,
    text,
    replyTo: EMAIL_ADDRESSES.SUPPORT, // Users can reply to support
  });
};

/**
 * Send support-related email
 */
const sendSupportEmail = async (to, subject, html, text) => {
  return sendEmail({
    to,
    from: EMAIL_ADDRESSES.SUPPORT,
    subject,
    html,
    text,
    replyTo: EMAIL_ADDRESSES.SUPPORT,
  });
};

/**
 * Send subscription/billing email (from subscriptions@carsmartclub.com)
 */
const sendSubscriptionEmail = async (to, subject, html, text) => {
  return sendEmail({
    to,
    from: EMAIL_ADDRESSES.SUBSCRIPTIONS,
    subject,
    html,
    text,
    replyTo: EMAIL_ADDRESSES.SUPPORT,
  });
};

/**
 * Send marketing email (from marketing@carsmartclub.com)
 */
const sendMarketingEmail = async (to, subject, html, text) => {
  return sendEmail({
    to,
    from: EMAIL_ADDRESSES.MARKETING,
    subject,
    html,
    text,
    replyTo: EMAIL_ADDRESSES.MARKETING,
  });
};

/**
 * Send deals email (from deals@carsmartclub.com)
 */
const sendDealsEmail = async (to, subject, html, text) => {
  return sendEmail({
    to,
    from: EMAIL_ADDRESSES.DEALS,
    subject,
    html,
    text,
    replyTo: EMAIL_ADDRESSES.SUPPORT,
  });
};

/**
 * Send community email (from community@carsmartclub.com)
 */
const sendCommunityEmail = async (to, subject, html, text) => {
  return sendEmail({
    to,
    from: EMAIL_ADDRESSES.COMMUNITY,
    subject,
    html,
    text,
    replyTo: EMAIL_ADDRESSES.COMMUNITY,
  });
};

module.exports = {
  sendEmail,
  sendTransactionalEmail,
  sendSupportEmail,
  sendSubscriptionEmail,
  sendMarketingEmail,
  sendDealsEmail,
  sendCommunityEmail,
  EMAIL_ADDRESSES,
};

