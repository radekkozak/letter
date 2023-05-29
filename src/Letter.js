import RssParser from 'rss-parser'
import { dirname, join } from 'path'
import { getFeedsUrls } from './OpmlParser.js'
import { fileURLToPath } from 'url'
import { settings } from './LetterSettings.js'
import { sendNewsletter } from './NewsLetter.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function run () {
  const opmlFilePath = join(__dirname, '../rss', settings.opmlFile)
  const feedsUrls = await getFeedsUrls(opmlFilePath)
    .catch(error => {
      throw new Error('Problem parsing `feeds.opml`. Please make sure it exists and conforms to OPML format.'
        + error.message)
    })
  if (feedsUrls !== undefined && feedsUrls.length > 0) {
    const letterFeeds = await getFeedsPostsFromYesterday(feedsUrls).catch(error => {
      throw new Error('Problem getting RSS posts: ' + error.message)
    })
    if (letterFeeds !== undefined && letterFeeds.length > 0) {
      await sendNewsletter(letterFeeds)
      console.log('Good news! Letter just sent you some daily readings. Enjoy.')
    } else {
      console.log('No new readings for today. Sad face.')
    }
  }
}

async function getFeedsPostsFromYesterday (feedsUrls) {
  const rssParser = new RssParser()
  const promises = feedsUrls.map(url => rssParser.parseURL(url))
  const successful = (await Promise.allSettled(promises)).filter(
    response => response.status === 'fulfilled')

  return successful.map(response => {
    const feed = response.value
    const items = feed.items.filter(
      feedItem => isFeedItemFromYesterday(new Date(feedItem.isoDate)))
    if (items.length === 0) {
      return undefined
    }
    return {
      ...feed,
      items,
    }
  }).filter(Boolean).sort((a, b) => {
    if (a.title < b.title) {
      return -1
    }
    if (a.title > b.title) {
      return 1
    }
    return 0
  })
}

function isFeedItemFromYesterday (date) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return areTwoDatesSame(yesterday, date)
}

function areTwoDatesSame (date, otherDate) {
  return date.getDate() === otherDate.getDate() && date.getMonth() ===
    otherDate.getMonth() && date.getFullYear() === otherDate.getFullYear()
}
