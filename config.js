module.exports = {
  subscriptionsFile: (process.env.OPML_SUBSCRIPTIONS_FILE || 'subscriptions.xml'),
  email: {
    to: process.env.EMAIL_TO,
    namedFrom: process.env.EMAIL_NAMED_FROM,
    from: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
    subject: process.env.EMAIL_SUBJECT
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE
  },
  feedparser: {
    normalize: true,
    addmeta: true
  }
}
