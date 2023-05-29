import * as fs from 'fs'
import { parseStringPromise } from 'xml2js'

export async function getFeedsUrls (opmlFilePath) {
  const opmlFileContent = fs.readFileSync(opmlFilePath, 'utf8')
  const { opml } = await parseStringPromise(opmlFileContent, {})
  const outlineObject = Object(Array.from(opml.body).at(0))
  const outlines = Array.from(outlineObject.outline)

  const inners = outlines.map(({ outline }) => {
    if (outline !== undefined) {
      return outline.map(({ $ }) => $.xmlUrl)
    }
  }).flat(1).filter(Boolean)
  const flats = outlines.map(({ $ }) => $.xmlUrl).filter(Boolean)

  return [...flats, ...inners]
}
