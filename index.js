require('dotenv').config()

const path = require('path')
const fs = require('fs')
const xml2js = require('xml2js')
const RSSParser = require('rss-parser')
const EmailTemplate = require('email-templates')
const nodemailer = require('nodemailer')
const config = require('./config')
const { isYesterday } = require('./utils')

async function subscriptionsUrls () {
  const file = path.join(__dirname, 'rss', config.subscriptionsFile)
  const subscriptions = fs.readFileSync(file, 'utf8')
  const { opml } = await xml2js.Parser().parseStringPromise(subscriptions)

  // Parse OPML file, return only urls and remove empty items
  return Array.from(opml.body)
    .map(({ outline }) => outline.map(({ $ }) => $.xmlUrl))
    .flat(1)
    .filter(Boolean)
}

async function sendEmail (feeds) {
  const mailer = new EmailTemplate({
    preview: false,
    send: true,
    message: {
      from: config.email.named
    },
    transport: nodemailer.createTransport(
      {
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        auth: {
          user: config.email.from,
          pass: config.email.pass
        }
      }
    ),
    views: {
      options: {
        map: {
          html: 'handlebars'
        },
        extension: 'html'
      }
    }
  })

  return mailer.send({
    template: 'daily',
    message: {
      to: config.email.to
    },
    locals: {
      feeds,
      today: (new Date()).toDateString()
    }
  })
}

async function yesterdayFeedItems () {
  const rssParser = new RSSParser()

  const urls = await subscriptionsUrls()
  const promises = urls.map(url => rssParser.parseURL(url))

  return (await Promise.allSettled(promises))
    .filter(response => response.status === 'fulfilled')
    .map(response => {
      const feed = response.value
      const items = feed.items.filter(feedItem => isYesterday(new Date(feedItem.isoDate)))

      if (items.length < 1) {
        return undefined
      }

      return {
        ...feed,
        items
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.title < b.title) { return -1 }
      if (a.title > b.title) { return 1 }
      return 0
    })
}

;(async () => {
  const feeds = await yesterdayFeedItems()
  console.log(JSON.stringify(feeds, null, 2))
  await sendEmail(feeds)
})()
