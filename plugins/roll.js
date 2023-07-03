import events from "events";

import fetch from "node-fetch";

const dice = ["⚀","⚁","⚂","⚃","⚄","⚅"]
		
export class Plugin {
	constructor(bot) {
		this.bot = bot;

		this.events = new events.EventEmitter();

		this.commands = ["roll"];

		this.init();
	}

	init() {
		this.events.on("COMMAND", (msg, command, params) => {
			switch (command) {
				case "roll":
					// If no parameters are given, roll a 6-sided die
                    if (params.length === 0) {
                        let roll = Math.floor(Math.random() * 6) + 1;
                        let emoji = dice[roll - 1];
                        this.bot.sendMessage(msg, { message: `You rolled a`, reply: 1 });
                        // Wait for it to send
                        setTimeout(() => {
                            this.bot.sendMessage(msg, { message: `${emoji}`});
                        }, 100);
                        return;
                    }
                    // If one parameter is given, roll a die with that many sides
                    if (params.length === 1) {
                        let sides = params[0];
                        let roll = Math.floor(Math.random() * sides) + 1;
                        if (roll < 7) {
                            let emoji = dice[roll - 1];
                            this.bot.sendMessage(msg, { message: `You rolled a`, reply: 1 });
                            // Wait for it to send
                            setTimeout(() => {
                                this.bot.sendMessage(msg, { message: `${emoji}`});
                            }, 100);
                        } else {
                            this.bot.sendMessage(msg, { message: `You rolled a ${roll}`, reply: 1 });
                        }
                        return;
                    }
                    // If two parameters are given, roll a die with that many sides that many times
                    if (params.length === 2) {
                        let sides = params[0];
                        let rolls = params[1];
                        let results = [];
                        for (let i = 0; i < rolls; i++) {
                            let roll = Math.floor(Math.random() * sides) + 1;
                            results.push(roll);
                        }
                        let total = results.reduce((a, b) => a + b, 0);
                        if (sides < 7) {
                            let emoji = results.map(r => dice[r - 1]);
                            this.bot.sendMessage(msg, { message: `You rolled`, reply: 1 });
                            // Wait for it to send
                            setTimeout(() => {
                                this.bot.sendMessage(msg, { message: `${emoji.join("")}`});
                            }, 100);
                            // Wait for it to send
                            setTimeout(() => {
                                this.bot.sendMessage(msg, { message: `for a total of ${total}`});
                            }, 200);
                        }
                        else {
                            this.bot.sendMessage(msg, { message: `You rolled ${results.join(", ")} for a total of ${total}`, reply: 1 });
                        }
                        return;
                    }
                    // If more than two parameters are given, return usage
                    this.bot.sendMessage(msg, { message: `Usage: ${this.bot.config.trigger}roll [sides (6)] [rolls (1)]`, reply: 1 });
					break;
			}
		});
	}
}