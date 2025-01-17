import events from "events";

import fetch from "node-fetch";
		
export class Plugin {
	constructor(bot) {
		this.bot = bot;

		this.events = new events.EventEmitter();

		this.commands = ["gw", "giveaway"];

		this.init();
	}

	init() {
		this.events.on("COMMAND", (msg, command, params) => {
			switch (command) {
                case "gw":
                case "giveaway":
                    // Check if the message is a reply
                    if (!msg.replying) {
                        this.bot.sendMessage(msg, { message: `Please reply to a message`, reply: 1 });
                        return;
                    }

                    // Get the replying message await
                    this.bot.getMessage(msg.replying).then(msg => {
                        // Get second parameter as emoji
                        if (params.length === 0) {
                            this.bot.sendMessage(msg, { message: `Please specify an emoji`, reply: 1 });
                            return;
                        }
                        let emoji = params[0];
                        let reactions = msg.reactions;
                        // Check if the emoji is in the reactions
                        if (!reactions.includes(emoji)) {
                            this.bot.sendMessage(msg, { message: `The emoji ${emoji} is not in the reactions`, reply: 1 });
                            return;
                        }

                        let reactionsObj = JSON.parse(reactions);
                        let ids = reactionsObj[emoji];
                        // Get a random user
                        let winner = ids[Math.floor(Math.random() * ids.length)];
                        // Get the name of the winner
                        let winnerName = this.bot.userForID(winner).domain;
                        // Send the winner
                        this.bot.sendMessage(msg, { message: `The winner is @${winner}` });
                    });

                    
                break;
			}
		});
	}
    get help() {
        return `Usage:\n\n${this.bot.config.trigger}gw [emoji]\n\nReply to the message which people react to and specify the enter draw emoji`;
    }
}