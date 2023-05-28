<div align="center">
  <img src="assets/letter-header-slogan.svg" width="75%" />
<img src="assets/letter-cat.gif" width="75%" />
  
</div><br>

## A minimalistic *cat-like* app that delivers a digest of your RSS feeds as templated newsletter.
<br>

**How this works? Simple!** Every day at 11 am (or at time of your choosing) *letter*  runs on 
the server via `cron` and fetches all RSS feeds from your OPML `feeds.opml` to check whether 
there is anything new from yesterday. After some mapping and rendering newsletter digest is created
and sent via e-mail configuration defined in `.env` file. All in a *cat-like* manner. And right 
into your inbox.

## Quick howto

1. Clone repository to desired location (for example your node server)
    ```sh
    git clone https://github.com/radekkozak/letter.git
    ```
   
2. Install 
    ```sh
    npm install
    ```
   
3. Create `.env` from example file with your own configuration. For your `feed.opml` file it is probably 
   best to export feeds from your preferred service like Feedly or whatever. OPML is de-facto standard for importing and exporting RSS feeds 
   so it should be relatively easy. 

4. Run 
    ```sh
    node index.js
    ```

## Email newsletter template

Letter uses [Handlebars](https://handlebarsjs.com) with html extension as default templating engine. Email is generated from `letter` template inside `emails` directory. You can make it your own as you please. Templating
assumes the structure of `html`, `subject` and `text` html files. Here's how *letter* template looks by default:<br><br>

<div align="center">
    <img src="assets/letter-example.jpg" width="870" height="1250" alt="Default Letter newsletter"/>
</div>

## Notes

### OPML file structure can be flat or nested

Sometimes certain services like i.e Feedly, export OPML feeds in a nested manner. Letter supports both flat 
and categorized notations. Even in the same file. Please see [feeds.opml.example](https://github.com/letter/rss/feeds.xml.example)

### Gmail considerations

If you use Gmail for sending out the newsletter and your account has Two-Factor Authentication (2FA) enabled you 
need to generate app-specific password which then can be used in place of your regular `EMAIL_PASS` variable in `.env` file.

### Running app periodically

As described, letter is meant to be run at specific schedule. This can easily be achieved via `cron` directive
. **Cron tab needs to be created separately by the user**. For example, below settings would run the app every day 
at 11 o'clock (server time)

```bash
0 11 * * * node index.js
```

## License

Meow-what ? Cats don't need no stinking licenses. Just be good and state the source of the original cat [wink]. 

## Cats and credits

**I have tried hard to find original authors of cat gif and cat avatar used in the template and header**. I found those chucklesome pics sitting in my old computer folder one day and they sparked me to make this simple *why-not* weekend project. Funny enough i found myself using it for this day (What can i say - i just love my RSS readings delivered as email - i'm weird that way) Aaanywho - **if you are the original author of any of these lovely cats, please let me know** so i could give credit where credit is due.     
