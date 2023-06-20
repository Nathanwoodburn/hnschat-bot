import events from "events";

import fetch from "node-fetch";
		
export class Plugin {
	constructor(bot) {
		this.bot = bot;

		this.events = new events.EventEmitter();

		this.commands = [];
		this.init();
	}

	init() {
		// Send message to channel when bot starts
        // wait 5 seconds to allow other plugins to load
        setTimeout(() => {
        this.bot.sendMessage({conversation: `5DkLWHPq`},{ message: `Bot Restarted` })
        }, 10000);
	}
}