import events from "events";

import fetch from "node-fetch";
		
export class Plugin {
	constructor(bot) {
		this.bot = bot;

		this.events = new events.EventEmitter();

		this.commands = ["help"];

		this.init();
	}

	init() {
		this.events.on("COMMAND", (msg, command, params) => {
			switch (command) {
				case "help":
					// If no parameters are given, send usage
                    if (params.length === 0) {
                        this.bot.sendMessage(msg, { message: `Usage: ${this.bot.config.trigger}help \<command\>` , reply: 1 });

                        return;
                    }
                    // If one parameter is given, show help for command
                    if (params.length === 1) {
                        let command = params[0];
                        let plugin = false;
                        // for each plugin
                        this.bot.PluginManager.plugins.forEach(p => {
                            // if the plugin has commands
                            if (p.plugin.commands) {
                                // if the command is in the plugin's commands
                                if (p.plugin.commands.includes(command)) {
                                    plugin = p;
                                }
                            }
                        });
                        // If the command is not found
                        if (!plugin) {
                            this.bot.sendMessage(msg, { message: `Command ${command} not found`, reply: 1});
                            return;
                        }
                        let help = plugin.plugin.help;
                        if (!help) {
                            this.bot.sendMessage(msg, { message: `No help found for ${command}`, reply: 1 });
                            return;
                        }
                        console.log(help);
                        this.bot.sendMessage(msg, { message: help, reply: 1 });
                        return;
                    }
                    // If two parameters are given, show usage
                    if (params.length > 1) {
                        this.bot.sendMessage(msg, { message: `Usage: ${this.bot.config.trigger}help \<command\>` , reply: 1 });
                        return;
                    }
					break;
			}
		});
	}
}