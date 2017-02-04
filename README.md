# Watch URL
Request specified URL and if it failed, notify to slack

## Env vars

- SLACK_URL: URL for Slack Incoming WebHooks.
- TARGET_URL: URL for check
- SLACK_CHANNEL: channel name of slack. (Prefix is required. e.g. #myChannel, @user1)

## How to setup on Heroku
- git push heroku
- Specify above env vars
- Add scheduler addon
- Register schedule
