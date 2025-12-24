const EMAIL_ADDRESSES = require('../config/email');

/**
 * Generate HTML email template with Car Smart Club branding
 */
const getEmailTemplate = (content, title) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0f172a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🚗 Car Smart Club</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px; color: #e2e8f0;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 30px; text-align: center; border-top: 1px solid #334155;">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px;">
                © ${new Date().getFullYear()} Car Smart Club. All rights reserved.
              </p>
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 12px;">
                <a href="mailto:${EMAIL_ADDRESSES.SUPPORT}" style="color: #60a5fa; text-decoration: none;">Support</a> | 
                <a href="https://carsmartclub.com" style="color: #60a5fa; text-decoration: none;">Website</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/**
 * Welcome email template
 */
const getWelcomeEmailTemplate = (userName) => {
  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">Welcome to Car Smart Club, ${userName}! 🎉</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Thank you for joining Car Smart Club! We're excited to help you take better care of your vehicle and save money in the process.
    </p>
    
    <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin-top: 0;">🎁 Welcome Bonus</h3>
      <p style="margin: 0; color: #e2e8f0;">
        You've received <strong style="color: #ffffff;">250 Car Smart Points</strong> as a welcome bonus! Start redeeming them for exclusive deals and rewards.
      </p>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6;">
      As a member, you'll get access to:
    </p>
    <ul style="color: #e2e8f0; line-height: 1.8;">
      <li>💡 Exclusive deals and discounts</li>
      <li>🔧 Trusted provider network</li>
      <li>📊 Vehicle diagnostics and evaluations</li>
      <li>⭐ Car Smart Points rewards program</li>
      <li>🎯 Personalized car care recommendations</li>
    </ul>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://carsmartclub.com/account" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Get Started
      </a>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      If you have any questions, feel free to contact our support team at 
      <a href="mailto:${EMAIL_ADDRESSES.SUPPORT}" style="color: #60a5fa;">${EMAIL_ADDRESSES.SUPPORT}</a>
    </p>
  `;
  
  return getEmailTemplate(content, 'Welcome to Car Smart Club');
};

/**
 * Membership activation email template
 */
const getMembershipActivationTemplate = (userName, planName) => {
  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">Membership Activated! ✅</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Congratulations, ${userName}! Your Car Smart Club membership is now active.
    </p>
    
    <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin-top: 0;">📦 Membership Details</h3>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Plan:</strong> ${planName || 'Free'}</p>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Status:</strong> Active</p>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Member Since:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6;">
      You now have access to exclusive member benefits:
    </p>
    <ul style="color: #e2e8f0; line-height: 1.8;">
      <li>🎁 Member-only discounts and deals</li>
      <li>⭐ Priority booking with verified providers</li>
      <li>💎 Premium features and tools</li>
      <li>🎯 Personalized recommendations</li>
    </ul>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://carsmartclub.com/account" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        View My Account
      </a>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      Questions about your membership? Contact us at 
      <a href="mailto:${EMAIL_ADDRESSES.SUPPORT}" style="color: #60a5fa;">${EMAIL_ADDRESSES.SUPPORT}</a>
    </p>
  `;
  
  return getEmailTemplate(content, 'Membership Activated');
};

/**
 * Subscription renewal reminder email template
 */
const getRenewalReminderTemplate = (userName, daysUntilRenewal, planName) => {
  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">Membership Renewal Reminder</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Hi ${userName},
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Your ${planName} membership will renew in ${daysUntilRenewal} ${daysUntilRenewal === 1 ? 'day' : 'days'}.
    </p>
    
    <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #e2e8f0;">
        No action needed - your membership will automatically renew and you'll continue to enjoy all member benefits.
      </p>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6;">
      If you need to update your payment method or have any questions, please visit your account settings or contact us.
    </p>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://carsmartclub.com/account" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Manage Subscription
      </a>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      Need help? Contact us at 
      <a href="mailto:${EMAIL_ADDRESSES.SUBSCRIPTIONS}" style="color: #60a5fa;">${EMAIL_ADDRESSES.SUBSCRIPTIONS}</a>
    </p>
  `;
  
  return getEmailTemplate(content, 'Membership Renewal Reminder');
};

/**
 * Password reset email template
 */
const getPasswordResetTemplate = (userName, resetToken, resetUrl) => {
  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">Reset Your Password</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Hi ${userName},
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      We received a request to reset your password. Click the button below to create a new password:
    </p>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Reset Password
      </a>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8;">
      Or copy and paste this link into your browser:<br>
      <a href="${resetUrl}" style="color: #60a5fa; word-break: break-all;">${resetUrl}</a>
    </p>
    
    <div style="background-color: #0f172a; padding: 15px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ef4444;">
      <p style="margin: 0; color: #fca5a5; font-size: 14px;">
        <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email or contact support.
      </p>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      Questions? Contact us at 
      <a href="mailto:${EMAIL_ADDRESSES.SUPPORT}" style="color: #60a5fa;">${EMAIL_ADDRESSES.SUPPORT}</a>
    </p>
  `;
  
  return getEmailTemplate(content, 'Reset Your Password');
};

/**
 * Discount confirmation email template
 */
const getDiscountConfirmationTemplate = (userName, discountAmount, providerName) => {
  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">Discount Applied! 💰</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Hi ${userName},
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Your member discount has been successfully applied!
    </p>
    
    <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin-top: 0;">Discount Details</h3>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Provider:</strong> ${providerName}</p>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Discount:</strong> ${discountAmount}</p>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Status:</strong> Active</p>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      Keep enjoying exclusive member benefits! View your account at 
      <a href="https://carsmartclub.com/account" style="color: #60a5fa;">carsmartclub.com/account</a>
    </p>
  `;
  
  return getEmailTemplate(content, 'Discount Confirmation');
};

/**
 * Deal redemption confirmation email template
 */
const getDealRedemptionTemplate = (userName, dealTitle, dealDetails) => {
  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">Deal Redeemed! 🎉</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Hi ${userName},
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      You've successfully redeemed your Car Smart Points for an exclusive deal!
    </p>
    
    <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin-top: 0;">Deal Details</h3>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Deal:</strong> ${dealTitle}</p>
      ${dealDetails ? `<p style="margin: 5px 0; color: #e2e8f0;">${dealDetails}</p>` : ''}
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Status:</strong> Active</p>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      Keep earning and redeeming Car Smart Points for more great deals!
    </p>
  `;
  
  return getEmailTemplate(content, 'Deal Redemption Confirmation');
};

/**
 * Billing receipt email template
 */
const getBillingReceiptTemplate = (userName, amount, planName, transactionId, date) => {
  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">Payment Receipt</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Hi ${userName},
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Thank you for your payment. Here's your receipt:
    </p>
    
    <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin-top: 0;">Transaction Details</h3>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Amount:</strong> $${amount.toFixed(2)}</p>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Plan:</strong> ${planName}</p>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Transaction ID:</strong> ${transactionId}</p>
      <p style="margin: 5px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Date:</strong> ${date}</p>
    </div>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      Questions about your billing? Contact us at 
      <a href="mailto:${EMAIL_ADDRESSES.SUBSCRIPTIONS}" style="color: #60a5fa;">${EMAIL_ADDRESSES.SUBSCRIPTIONS}</a>
    </p>
  `;
  
  return getEmailTemplate(content, 'Payment Receipt');
};

/**
 * Provider booking notification email template
 */
const getProviderBookingTemplate = (providerName, customerName, customerEmail, customerPhone, service, date, time, notes, bookingId) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const content = `
    <h2 style="color: #ffffff; margin-top: 0;">New Booking Request! 📅</h2>
    
    <p style="font-size: 16px; line-height: 1.6;">
      Hi ${providerName},
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      You have received a new booking request from a Car Smart Club member!
    </p>
    
    <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
      <h3 style="color: #3b82f6; margin-top: 0;">Booking Details</h3>
      <p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Customer:</strong> ${customerName}</p>
      <p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Email:</strong> <a href="mailto:${customerEmail}" style="color: #60a5fa;">${customerEmail}</a></p>
      ${customerPhone ? `<p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Phone:</strong> <a href="tel:${customerPhone}" style="color: #60a5fa;">${customerPhone}</a></p>` : ''}
      <p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Service:</strong> ${service}</p>
      <p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Date:</strong> ${formattedDate}</p>
      <p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Time:</strong> ${time}</p>
      <p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Booking ID:</strong> ${bookingId}</p>
      ${notes ? `<p style="margin: 8px 0; color: #e2e8f0;"><strong style="color: #ffffff;">Notes:</strong> ${notes}</p>` : ''}
    </div>
    
    <div style="background-color: #0f172a; padding: 15px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #fbbf24; font-size: 14px;">
        <strong>Action Required:</strong> Please contact the customer to confirm this booking. You can reply directly to this email or call them using the phone number provided above.
      </p>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6;">
      This is an automated notification from Car Smart Club. The customer is expecting to hear from you soon.
    </p>
    
    <p style="font-size: 14px; color: #94a3b8; margin-top: 30px;">
      Questions about this booking? Contact us at 
      <a href="mailto:${EMAIL_ADDRESSES.SUPPORT}" style="color: #60a5fa;">${EMAIL_ADDRESSES.SUPPORT}</a>
    </p>
  `;
  
  return getEmailTemplate(content, 'New Booking Request');
};

module.exports = {
  getWelcomeEmailTemplate,
  getMembershipActivationTemplate,
  getRenewalReminderTemplate,
  getPasswordResetTemplate,
  getDiscountConfirmationTemplate,
  getDealRedemptionTemplate,
  getBillingReceiptTemplate,
  getProviderBookingTemplate,
};

