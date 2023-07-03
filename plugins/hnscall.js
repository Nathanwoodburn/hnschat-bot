import events from "events";

import fetch from "node-fetch";
		
export class Plugin {
	constructor(bot) {
		this.bot = bot;

		this.events = new events.EventEmitter();

		this.commands = ["commands", "call", "hnscall", "hcall", "channel", "ping"];

		this.init();
	}

	init() {
		this.events.on("COMMAND", (msg, command, params) => {
			switch (command) {
				case "commands":
					let commands = [];
					this.bot.PluginManager.plugins.forEach(p => {
						if (p.name !== "admin") {
							if (!p.plugin.commands) {
								p.plugin.commands = [];
							}
							commands = [...commands, ...p.plugin.commands];
						}
					});
					commands = commands.filter(c => {
						return c !== "commands"
					});
					commands.sort();
					commands.forEach((command, k) => {
						commands[k] = `${this.bot.config.trigger}${command}`;
					});
					this.bot.sendMessage(msg, { message: `Here is a list of my available commands:\n${commands.join(", ")}` });
					break;
				case "call":
				case "hnscall":
				case "hcall":
					let user = this.bot.userForID(msg.user).domain;
					if (params.length === 0) {
						let meeting = "https://hcall/" + user;
						this.bot.sendMessage(msg, { message: meeting, reply: 1 });
					} else {
						// Concatenate the parameters into a single string
						let room = params.join("-");
						let meeting = "https://hcall/" + room;
						this.bot.sendMessage(msg, { message: meeting, reply: 1 });
					}
					break;
				case "channel":
					let channelID = this.bot.channelForID(msg.conversation).name;
					let meeting1 = "https://hcall/" + channelID;
					this.bot.sendMessage(msg, { message: meeting1, reply: 1 });
					break;
				case "ping":
					this.bot.sendMessage(msg, { message: "pong", reply: 1 });
					break;
			}
		});
	}
	get help() {
		return `Usage: ${this.bot.config.trigger}commands\n\n${this.bot.config.trigger}call [room]\n\n ${this.bot.config.trigger}channel\n\n ${this.bot.config.trigger}ping`;
	}
}