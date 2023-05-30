import {Config} from "./config.js";
import {fetchDailyReadings} from "./feeds.js";
import {NewsLetter} from "./mail.js";

class Letter {

    private readonly config: Config;

    constructor(config: Config) {
        this.config = config
    }

    async sent(): Promise<void> {
        const letterFeeds = await fetchDailyReadings()
        if (letterFeeds.length > 0) {
            await new NewsLetter(this.config).sendNewsLetter(letterFeeds)
            console.log('Good news! Letter just sent you some daily readings. Enjoy.')
        } else {
            console.log('No new readings for today. Sad face.')
        }
    }
}

export {Letter}


