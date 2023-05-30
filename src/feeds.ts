import * as fs from 'fs'
import {parseStringPromise} from 'xml2js'
import {FeedsType, LETTER_CONFIG as config} from "./config.js";
import {dirname, join} from 'path'
import {fileURLToPath} from "url";
import RssParser, {Item} from "rss-parser";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const FEEDS_FILE_NAME = "feeds";

class FeedPost {
    readonly title: string
    readonly link: string
    readonly contentSnippet: string

    constructor(title: string, link: string, contentSnippet: string) {
        this.title = title
        this.link = link
        this.contentSnippet = contentSnippet
    }
}

class LetterFeed {
    readonly title: string
    readonly link: string
    readonly items: FeedPost[]

    constructor(title: string, link: string, items: FeedPost[]) {
        this.title = title
        this.link = link
        this.items = items
    }
}

async function getFeedsUrls(): Promise<Array<string>> {
    const isPlain = config.feeds == FeedsType.PLAIN
    const feedsFile = join(__dirname, '../rss/')
        .concat(FEEDS_FILE_NAME).concat(isPlain ? ".txt" : ".opml")

    return isPlain ? await getFeedsUrlsPlain(feedsFile)
        : await getFeedsUrlsOpml(feedsFile)
}

async function getFeedsUrlsOpml(feedsFilePath: string): Promise<Array<string>> {
    const opmlFeedsContent = fs.readFileSync(feedsFilePath, 'utf8')
    const {opml} = await parseStringPromise(opmlFeedsContent, {})
    const outlineObject = Object(Array.from(opml.body).at(0))
    const outlines = Array.from(outlineObject.outline)

    const inners = outlines.map(({outline}) => {
        if (outline !== undefined) {
            return outline.map(({$}) => $.xmlUrl)
        }
    }).flat(1).filter(Boolean)
    const flats = outlines.map(({$}) => $.xmlUrl).filter(Boolean)

    return [...flats, ...inners]
}

async function getFeedsUrlsPlain(feedsFilePath: string): Promise<Array<string>> {
    return fs.readFileSync(feedsFilePath, 'utf8').toString()
        .split('\n').filter(line => !line.startsWith("#") && line.length !== 0)
}

async function loadFeeds(feedsUrls): Promise<Array<LetterFeed>> {
    const rssParser = new RssParser()
    const promises = feedsUrls.map(url => rssParser.parseURL(url))
    const successful = (await Promise.allSettled(promises)).filter(
        response => response.status === 'fulfilled')

    return successful.map(response => {
        const feed = (response as PromiseFulfilledResult<RssParser.Output<Item>>).value
        const feedPosts: FeedPost[] = feed.items
            .filter(feedPost => isFeedPostFromYesterday(new Date(feedPost.isoDate)))
            .map(item => new FeedPost(item.title, item.link, item.contentSnippet))

        if (feedPosts.length === 0) {
            return undefined
        }

        return new LetterFeed(feed.title, feed.link, feedPosts)
    }).filter(Boolean).sort((a, b) => (a.title > b.title) ? 1 : -1)
}

function isFeedPostFromYesterday(date): boolean {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return areTwoDatesSame(yesterday, date)
}

function areTwoDatesSame(date, otherDate): boolean {
    return date.getDate() === otherDate.getDate() && date.getMonth() ===
        otherDate.getMonth() && date.getFullYear() === otherDate.getFullYear()
}

async function fetchDailyReadings(): Promise<Array<LetterFeed>> {
    const feedsUrls = await getFeedsUrls()

    let letterFeeds = []
    if (feedsUrls !== undefined && feedsUrls.length > 0) {
        letterFeeds = await loadFeeds(feedsUrls).catch(error => {
            throw new Error('Problem fetching feeds posts: ' + error.message)
        })
    }
    return letterFeeds
}

export {fetchDailyReadings, LetterFeed}
