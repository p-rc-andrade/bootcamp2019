export default {
  host: 'smtp.mailtrap.io', // SMTP protocol
  port: 25,
  secure: false,
  auth: {
    user: 'bbe6fac5ddd9d2',
    pass: 'bc056603655ffd',
  },
  default: {
    from: 'Team GoBarber <noreply@gobarber.com>',
  },
};

// Email service host service:
// Amazon SES
// Mailgun
// Sparkpost
// Mandril - Mailchimp users only
// Mailtrap (Works only for Dev Environments)

// Not good to use the SMTP of gmail because it has a limit and so it will
// block us
