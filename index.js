import * as Letter from './src/Letter.js'

(async () => {
  Letter.run().catch(error => {
    console.error("Letter encountered an error: " + error.message)
  })
})()
