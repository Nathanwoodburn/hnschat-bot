import events from "events";

import fetch from "node-fetch";
		
export class Plugin {
	constructor(bot) {
		this.bot = bot;

		this.events = new events.EventEmitter();

		this.commands = [];
        this.types = ["READY"];
		this.init();
	}

	init() {
		// Send message to channel when bot starts
        this.events.on("READY", (msg) => {
            this.bot.sendMessage({conversation: `5DkLWHPq`},{ message: `Bot Restarted` })
        });
	}
}