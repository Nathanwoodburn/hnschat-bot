import fs from "fs";
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export class PluginManager {
	constructor(bot) {
		this.bot = bot;

		this.dir = `plugins`;
		this.plugins = [];
	}

	async loadPlugins() {
		let output = new Promise(resolve => {
			fs.readdir(this.dir, (err, files) => {
				if (files.length) {
					files.forEach((file, k) => {
						let name = file.split(".")[0];
						import(`${url.pathToFileURL(`${this.dir}/${file}`).href}?t=${Date.now()}`).then(p => {
							this.plugins.push({
								name: name,
								plugin: new p["Plugin"](this.bot)
							});
							console.log(`LOADED PLUGIN: ${name}`);

							if (k == files.length - 1) {
								resolve();
							}
						});
					});
				}
				else {
					resolve();
				}
			});
		});
		return await output;
	}

	async reloadPlugins() {
		this.plugins.forEach(plugin => {
			let name = plugin.name;
			plugin.plugin = null;
			console.log(`UNLOADED PLUGIN: ${name}`);
		});
		this.plugins = [];
		return await this.loadPlugins();
	}

	emit(command, msg) {
		switch (command) {
			case "COMMAND":
				let split = msg.message.split(" ");
				let cmd = split[0].substring(1);
				split.shift();
				let params = split;

				this.pluginsForCommand(cmd).forEach(p => {
					p.plugin.events.emit(command, msg, cmd, params);
				});
				break;

			case "MESSAGE":
				this.pluginsForType(command).forEach(p => {
					p.plugin.events.emit(command, msg);
				});
				break;

			case "ERROR":
			case "SUCCESS":
				this.pluginsForResponses(msg.type).forEach(p => {
					p.plugin.events.emit(command, msg);
				});
				break;
		}
	}

	pluginsForCommand(command) {
		return this.plugins.filter(p => {
			return p.plugin.commands && p.plugin.commands.includes(command);
		});
	}

	pluginsForType(type) {
		return this.plugins.filter(p => {
			return p.plugin.types && p.plugin.types.includes(type);
		});
	}

	pluginsForResponses(type) {
		return this.plugins.filter(p => {
			return p.plugin.responses && p.plugin.responses.includes(type);
		});
	}
}