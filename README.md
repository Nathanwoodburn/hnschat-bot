# hnschat-bot
This is an example to get you started making bots for [hnschat](https://hns.chat)

# Setup
```
git clone https://github.com/eskimo/hnschat-bot.git
cd hnschat-bot
npm install
```

# How to use
1. Open your js console while on hnschat.
2. Type `hnschat.session` to get your session id.
3. Type `hnschat.domain` to get your desired domain id.
4. Type `hnschat.conversaion` to get the current conversation id. (Optional)
5. Type `hnschat.keys` to get your key pair for e2ee.
6. Fill in the values in `config.sample.json` and rename to `config.json`.
7. Launch the bot with `node bot.js`.
8. Edit `push.js` to add your Gotify server url with your app token.