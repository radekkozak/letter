<div align="center">
  <img src="https://letter.radekkozak.com/assets/letter-header-slogan.svg" width="75%" />
<img src="assets/letter-cat.gif" width="75%" />
  
</div><br>

## A minimalistic *cat-like* app that delivers a digest of your RSS feeds as templated newsletter.
<br>

**How this works? Simple!** Every day at 11 am (or at time of your choosing) *letter*  runs on the server via `cron` and fetches all RSS feeds from your
 OPML `subscriptions.xml` to check whether there is anything new from yesterday. After mapping feed items and
  rendering from template, newsletter digest is created and sent via e-mail configuration defined in `.env` file. All in a *cat-like* manner. And right into your inbox.

## Quick howto

1. Clone repository to desired location (for example your node server)
    ```sh
    git clone https://github.com/radekkozak/letter.git
    ```
   
2. Install 
    ```sh
    npm install
    ```
   
3. Create `.env` and `subscriptions.xml` from example files with your own configuration<br><br>

4. Run 
    ```sh
    node index.js
    ```

## Email newsletter template

Letter uses [Handlebars](https://handlebarsjs.com) with html extension as default templating engine. Email template is generated from `daily` template inside `emails` directory.  You can make it your own as you please. Default settings assume the structure of `html`, `subject` and `text` html files. Here's how it looks by default:<br><br>

<div align="center">
    <img src="assets/letter-example.jpg" width="870" height="1250" alt="Default Letter newsletter"/>
</div>

## Important

### OPML file structure needs to be flat

Please see [subscriptions.xml.example](https://github.com/letter/rss/subscriptions.xml.example)

### Gmail considerations

If you use Gmail account for sending out the newsletter that has 2-Factor Authentication enabled you need to generate
 app-specific password which then can be used as your `EMAIL_PASS` variable

### Running app periodically

As described, app is meant to be run at specific schedule. This can easily be achieved via `cron` directive
. **Cron tab needs to be created separately by the user**. For example, below would run the app every day at 11 o'clock
 (server time)

```bash
0 11 * * * node index.js
```
## License

Meow-what ? Cats don't need no stinking licenses. Just be good and state the source of the original cat [wink]. 

## Cats and credits

**I have tried hard to find original authors of cat gif and cat avatar used in the template and header**. I found those chucklesome pics sitting in my old computer folder one day and they sparked me to make this simple *why-not* weekend project. Funny enough i found myself using it for this day (What can i say - i just love my RSS readings delivered as email - i'm weird that way) Aaanywho - **if you are the original author of any of these lovely cats, please let me know** so i could give credit where credit is due.     