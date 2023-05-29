import Email from 'email-templates'
import { settings } from './LetterSettings.js'
import nodemailer from 'nodemailer'

/**
 * Send Letter newsletter from provided rss news with template applied.
 *
 * @param feeds Provided news items to be run through template
 * @returns {Promise<*>}
 */
export async function sendNewsletter (letterFeeds) {
  const mailer = createEmail()

  return mailer.send({
    template: 'letter',
    message: {
      to: settings.email.to,
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
function createEmail() {
  return new Email({
    preview: false,
    send: true,
    message: {
      from: settings.email.from,
    },
    transport: nodemailer.createTransport({
      host: settings.smtp.host,
      port: parseInt(settings.smtp.port),
      secure: settings.smtp.secure === 'true',
      auth: {
        user: settings.email.user,
        pass: settings.email.pass,
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
