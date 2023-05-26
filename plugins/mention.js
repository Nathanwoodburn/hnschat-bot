import events from "events";
export class Plugin {
    constructor(bot) {
        this.bot = bot;

        this.events = new events.EventEmitter();

        this.types = ["MESSAGE"];

        this.init();
    }

    init() {
        this.events.on("MESSAGE", async msg => {
            let id = this.bot.domain;
            let message = msg.message;
            // If message contains a mention of the bot
            if (message.includes(id)) {
                let output = "G'day, To create a meeting just send .call or to create a channel meeting send .channel";
                this.bot.sendMessage(msg, { message: output, reply: 1 });
            }

        });
    }
}