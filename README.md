# Scrappy Bot Framework
*A framework that's been built from scraps of various projects*

## Running the Bot
Without docker, edit your `.env` file then run:
```
npm install
npm start
```

With docker, run:
```
docker build -t ScrappyBot .
docker run \
-e "BOT_TOKEN=[the bot's token]" \
-e "BOT_PREFIX=>[the bot's prefix]" \
-e "BOT_ADMINS=[a user id]" \
ScrappyBot
```

## Editing
There are some example commands in the `commands` folder