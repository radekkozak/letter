import {config} from 'dotenv';

config()

export enum FeedsType {
    PLAIN = "plain",
    OPML = "opml"
}

const LETTER_CONFIG = {
    feeds: (process.env.LETTER_FEEDS || FeedsType.PLAIN),
    email: {
        from: process.env.MAIL_FROM,
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

export type Config = typeof LETTER_CONFIG
export {LETTER_CONFIG}
