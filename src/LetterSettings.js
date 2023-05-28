import {config} from 'dotenv';

config();

const settings = {
  opmlFile: (process.env.OPML_FEEDS || 'feeds.opml'),
  email: {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
  },
};

export {settings};
