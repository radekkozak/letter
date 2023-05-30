import {Config} from "./config.js";
import Email from 'email-templates'
import nodemailer from 'nodemailer'
import {LetterFeed} from "./feeds.js";

class NewsLetter {
    private readonly config: Config

    constructor(config: Config) {
        this.config = config
    }

    /**
     * Send Letter newsletter from provided rss news with template applied.
     *
     * @param letterFeeds Provided news items to be run through template
     * @returns {Promise<*>}
     */
    async sendNewsLetter(letterFeeds: LetterFeed[]): Promise<void> {
        const mailer = this.createEmail()

        mailer.send({
            template: 'letter',
            message: {
                to: this.config.email.to,
            },
            locals: {
                letterFeeds,
                today: (new Date()).toDateString(),
            },
        })
    }

    /**
     * Creates new Email
     *
     * @returns {Email} instance with letter settings set.
     */
    createEmail(): Email {
        return new Email({
            preview: false,
            send: true,
            message: {
                from: this.config.email.from,
            },
            transport: nodemailer.createTransport({
                host: this.config.smtp.host,
                port: parseInt(this.config.smtp.port),
                secure: this.config.smtp.secure === 'true',
                auth: {
                    user: this.config.smtp.user,
                    pass: this.config.smtp.pass,
                },
            }),
            views: {
                options: {
                    map: {
                        html: 'handlebars',
                    },
                    extension: 'html',
                },
            },
        })
    }
}

export {NewsLetter}
