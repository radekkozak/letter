import {config} from 'dotenv';

config();

const settings = {
  opmlFile: (process.env.LETTER_FEEDS || 'plain'),
  email: {
    from: process.env.SMTP_FROM,
    to: process.env.MAIL_TO,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};

export {settings};
