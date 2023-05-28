import * as fs from 'fs';
import {parseStringPromise} from 'xml2js';

class OpmlParser {
  async getFeedUrls(opmlFilePath) {
    const opmlFileContent = fs.readFileSync(opmlFilePath, 'utf8');
    const {opml} = await parseStringPromise(opmlFileContent, {});
    const outlineObject = Object(Array.from(opml.body).at(0));
    const outlines = Array.from(outlineObject.outline);
    // @ts-ignore
    let inners = outlines.map(({outline}) => {
      if (outline !== undefined) {
        return outline.map(({$}) => $.xmlUrl);
      }
    }).flat(1).filter(Boolean);
    // @ts-ignore
    let flats = outlines.map(({$}) => $.xmlUrl).filter(Boolean);
    return [...flats, ...inners];
  }
}

export {OpmlParser};
