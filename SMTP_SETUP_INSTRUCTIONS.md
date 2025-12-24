# SMTP Setup Instructions

## ✅ SMTP Configuration Added

I've added SMTP configuration to your `.env` file. Now you need to **replace the placeholder values** with your actual email credentials.

## 📧 Current Configuration in `.env`:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com        # ⚠️ REPLACE THIS
SMTP_PASS=your-app-password           # ⚠️ REPLACE THIS
```

## 🔧 How to Set Up Gmail SMTP (Recommended for Testing)

### Option 1: Gmail with App Password (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "Car Smart Club" as the name
   - Click "Generate"
   - Copy the 16-character password (no spaces)

3. **Update your `.env` file**:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcdefghijklmnop  # Use the 16-character app password
   ```

### Option 2: Other Email Providers

#### SendGrid (Recommended for Production)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### AWS SES (Production)
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

#### Mailgun (Production)
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-smtp-password
```

## ✅ Verify Configuration

After updating your `.env` file:

1. **Restart your server** (if it's running):
   ```bash
   # Stop the server (Ctrl+C)
   # Then start it again
   npm run dev
   ```

2. **Check the server logs** for:
   ```
   ✅ Email service is ready to send messages
   ```

3. **Test by registering a new user** - you should receive a welcome email!

## ⚠️ Important Notes

- **Never commit `.env` to git** (it should be in `.gitignore`)
- **For production**, use a professional email service (SendGrid, AWS SES, Mailgun)
- **Gmail** has sending limits (500 emails/day for free accounts)
- **App Passwords** are required for Gmail (regular passwords won't work)

## 🧪 Testing Emails

Once configured, test these scenarios:

1. **Register a new user** → Should receive welcome email
2. **Join membership** → Should receive membership activation email  
3. **Upgrade plan** → Should receive plan upgrade email

All emails will be sent from:
- `no-reply@carsmartclub.com` (transactional emails)
- `subscriptions@carsmartclub.com` (subscription emails)

## 🐛 Troubleshooting

### "Authentication failed" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify 2-Factor Authentication is enabled

### "Connection timeout" error
- Check your firewall allows SMTP connections
- Verify SMTP_HOST and SMTP_PORT are correct
- Try using port 465 with SMTP_SECURE=true

### Emails not sending
- Check server logs for error messages
- Verify all SMTP variables are set correctly
- Make sure server was restarted after updating .env

---

**Next Step**: Update `SMTP_USER` and `SMTP_PASS` in your `.env` file with your actual credentials!

