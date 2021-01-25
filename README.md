<p align="center">
  <img src="https://letter.radekkozak.com/assets/github-letter-logo.png" width="265" />
</p>

## *rss-to-email* that delivers templated newsletter right into your inbox

**How this works ? Simple** ! Every day at 11 am app is run on the server via `cron` and fetches all RSS feeds from an
 OPML `subscriptions.xml` to check whether there is anything new from yesterday. After mapping feed items and
  rendering from template, newsletter is created and sent via e-mail configuration defined in `.env` file.

## Quick howto

1. Clone repository to desired location (for example your node server)
    ```sh
    git clone https://github.com/radekkozak/letter.git
    ```

2. Install 
    ```sh
    npm install
    ```
3. Create `.env` and `subscriptions.xml` from example files with your own configuration

4. Run 
    ```sh
    node index.js
    ```

## Environment variables

| Key | Description | Default |
|---|---|---|
| OPML_SUBSCRIPTIONS_FILE| Name of the OPML file | subscriptions.xml |
| EMAIL_FROM | Email sender | |
| EMAIL_PASS | Email sender password | |
| EMAIL_TO | Who will receive the e-mail | |
| SMTP_HOST | SMTP host | |
| SMTP_PORT | SMTP port | |
| SMTP_SECURE | Is SMTP a secure connection | *true* for 465 port, *false* otherwise|

## Email newsletter template

E-mail template is generated via `daily` template inside `emails` directory. You can make it your own as you please

## Important

### OPML file

**OPML file structure needs to be flat**. See [subscriptions.xml.example](https://github.com/letter/rss/subscriptions.xml.example)

### Gmail considerations

If you use Gmail account for sending out the newsletter that has 2-Factor Authentication enabled you need to generate
 app-specific password which then can be used as your `EMAIL_PASS` variable

### Running app periodically

As described, app is meant to be run at specific schedule. This can easily be achieved via `cron` directive
. **Cron tab needs to be created separately by the user**. For example, below would run the app every day at 11 o'clock
 (server time)

```shell script
0 11 * * * node index.js
```
