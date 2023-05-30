import {Letter} from './letter.js'
import {LETTER_CONFIG} from "./config.js";

(async ():Promise<void> => {
    new Letter(LETTER_CONFIG).sent().catch(error => {
        console.error("Letter encountered an error: " + error.message)
    })
})()
