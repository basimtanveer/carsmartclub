# Email System Setup - Car Smart Club

This document explains the email system implementation for Car Smart Club, including all email addresses and their purposes.

## Email Addresses Configuration

All email addresses use the domain: `@carsmartclub.com`

### Required Email Inboxes

1. **support@carsmartclub.com**
   - Purpose: All subscriber help and support
   - Used for: User questions, account issues, cancellation requests, discount inquiries, card updates

2. **subscriptions@carsmartclub.com**
   - Purpose: Membership billing & lifecycle
   - Used for: Membership renewals, billing failures, refunds, plan reminders, receipts/statements, 7-day trial notifications

3. **no-reply@carsmartclub.com**
   - Purpose: Transactional emails (automated)
   - Used for: Welcome emails, password reset, OTP codes, membership activation confirmations, discount confirmations, deal redemption confirmations

4. **deals@carsmartclub.com**
   - Purpose: Sends discount bundles and Groupon-style offers
   - Used for: Deal bundles, local deals, seasonal promotions

5. **marketing@carsmartclub.com**
   - Purpose: Newsletters & retention campaigns
   - Used for: Monthly savings summaries, new premium guides, new provider notifications, vehicle tips, educational content

6. **community@carsmartclub.com** (optional)
   - Purpose: Member events and engagement
   - Used for: Member events, Car Smart Points Reward Program emails, member-only webinars, loyalty engagement

7. **admin@carsmartclub.com** (optional)
   - Purpose: Internal operations
   - Used for: Admin-level communication, developer communications

## Environment Variables

Add these variables to your `.env` file:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# For production, use your email service provider settings:
# Examples:
# - Gmail: Use App Password (not regular password)
# - SendGrid: SMTP_HOST=smtp.sendgrid.net, use API key as password
# - AWS SES: Use SES SMTP credentials
# - Mailgun: Use Mailgun SMTP settings
```

## Email Service Configuration

The email service is located in `server/services/emailService.js` and uses nodemailer.

### Current Email Integrations

1. **Welcome Email** (`server/routes/auth.js`)
   - Sent when a new user registers
   - From: `no-reply@carsmartclub.com`
   - Template: `getWelcomeEmailTemplate()`

2. **Membership Activation Email** (`server/routes/members.js`)
   - Sent when a user joins as a member
   - From: `no-reply@carsmartclub.com`
   - Template: `getMembershipActivationTemplate()`

3. **Plan Upgrade Email** (`server/routes/plans.js`)
   - Sent when a user upgrades their plan
   - From: `subscriptions@carsmartclub.com`
   - Template: `getMembershipActivationTemplate()`

### Available Email Templates

Located in `server/services/emailTemplates.js`:

- `getWelcomeEmailTemplate(userName)` - Welcome email for new users
- `getMembershipActivationTemplate(userName, planName)` - Membership activation confirmation
- `getRenewalReminderTemplate(userName, daysUntilRenewal, planName)` - Subscription renewal reminder
- `getPasswordResetTemplate(userName, resetToken, resetUrl)` - Password reset email
- `getDiscountConfirmationTemplate(userName, discountAmount, providerName)` - Discount application confirmation
- `getDealRedemptionTemplate(userName, dealTitle, dealDetails)` - Deal redemption confirmation
- `getBillingReceiptTemplate(userName, amount, planName, transactionId, date)` - Payment receipt

### Email Service Functions

Located in `server/services/emailService.js`:

- `sendTransactionalEmail(to, subject, html, text)` - Send from no-reply@carsmartclub.com
- `sendSupportEmail(to, subject, html, text)` - Send from support@carsmartclub.com
- `sendSubscriptionEmail(to, subject, html, text)` - Send from subscriptions@carsmartclub.com
- `sendMarketingEmail(to, subject, html, text)` - Send from marketing@carsmartclub.com
- `sendDealsEmail(to, subject, html, text)` - Send from deals@carsmartclub.com
- `sendCommunityEmail(to, subject, html, text)` - Send from community@carsmartclub.com

## Setting Up SMTP

### Option 1: Gmail (Development/Testing)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the app password as `SMTP_PASS`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

### Option 2: SendGrid (Recommended for Production)

1. Create a SendGrid account
2. Create an API key
3. Use SMTP credentials

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Option 3: AWS SES (Production)

1. Verify your domain in AWS SES
2. Create SMTP credentials in AWS SES console
3. Use provided SMTP settings

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

### Option 4: Mailgun (Production)

1. Create a Mailgun account
2. Verify your domain
3. Use SMTP settings from dashboard

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-smtp-password
```

## Development Mode

In development mode, if SMTP is not configured, emails will be logged to the console instead of being sent. This prevents errors during development.

## Email Template Styling

All email templates use:
- Dark theme matching Car Smart Club branding
- Responsive design
- Car Smart Club colors (slate, blue, indigo gradients)
- Professional HTML structure
- Plain text fallback support

## Future Email Integrations

Additional email integrations can be added:

- Password reset emails (when password reset is implemented)
- Billing receipts (when payment processing is integrated)
- Deal redemption confirmations (when deal redemption is enhanced)
- Renewal reminders (when subscription management is implemented)
- Marketing newsletters (when marketing campaigns are set up)
- Deal bundles (when deal system is enhanced)

## Testing Emails

To test emails in development:

1. Configure SMTP settings in `.env`
2. Register a new user or perform actions that trigger emails
3. Check your email inbox
4. Check server logs for email sending status

## Troubleshooting

### Emails not sending

1. Check SMTP credentials are correct
2. Verify firewall allows SMTP connections
3. Check spam folder
4. Review server logs for error messages
5. For Gmail: Ensure App Password is used, not regular password
6. For production: Ensure domain is verified with email provider

### Emails going to spam

1. Set up SPF, DKIM, and DMARC records for your domain
2. Use a reputable email service (SendGrid, AWS SES, Mailgun)
3. Avoid spam trigger words in subject lines
4. Include unsubscribe links in marketing emails
5. Ensure "from" address matches your domain

## Email Address Setup (Domain Configuration)

To set up these email addresses with your domain provider:

1. **MX Records**: Configure MX records if using a mail server
2. **Catch-all**: Set up catch-all forwarding to handle all @carsmartclub.com emails
3. **Aliases**: Create email aliases for each address that forward to your main inbox
4. **Email Service**: Use an email service (Google Workspace, Microsoft 365, etc.) to manage inboxes

For production, consider using:
- Google Workspace (formerly G Suite)
- Microsoft 365
- Custom email server
- Email forwarding service

