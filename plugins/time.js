import events from "events";

import fetch from "node-fetch";
const timeZones = [
    "America/Los_Angeles",    // Pacific Standard Time (PST)
    "America/Denver",         // Mountain Standard Time (MST)
    "America/Chicago",        // Central Standard Time (CST)
    "America/New_York",       // Eastern Standard Time (EST)
    "Europe/London",          // Greenwich Mean Time (GMT)
    "Etc/UTC",                // Coordinated Universal Time (UTC)
    "Europe/Paris",           // Central European Time (CET)
    "Europe/Athens",          // Eastern European Time (EET)
    "Australia/Sydney",       // Australian Eastern Standard Time (AEST)
    "Asia/Tokyo"              // Japan Standard Time (JST)
  ];
		
export class Plugin {
	constructor(bot) {
		this.bot = bot;

		this.events = new events.EventEmitter();

		this.commands = ["now", "time"];

		this.init();
	}

	init() {
		this.events.on("COMMAND", (msg, command, params) => {
			switch (command) {
				case "now":
                    // Get UTC time and date
                    let date = new Date();                      
                    
                    let message = "";
                    // Loop through the time zones and add them to the message
                    for (let i = 0; i < timeZones.length; i++) {
                        // Add timezone and local time
                        // Remove the Country name from the timezone
                        let timeZone = timeZones[i].split("/")[1];
                        timeZone = timeZone.replace("_", " ");
                        let formattedDate = date.toLocaleString("en-US", {timeZone: timeZones[i]});
                        message += timeZone + ": " + formattedDate + "\n";
                      
                    }
                    this.bot.sendMessage(msg, { message: message, reply: 1 });
                    break;
                case "time":
                    let timeMessage = "";
                    if (params.length === 0) {
                        timeMessage = "Please enter a time in UTC. Example: !time 12:00";
                        this.bot.sendMessage(msg, { message: timeMessage, reply: 1 });
                        break;                    
                    } 
                    
                    let timeRegex = /^([1-9]|1[0-2]):[0-5][0-9]$/;
                    if (!timeRegex.test(params[0])) {
                        timeMessage = "Please enter a valid time in UTC. Example: !time 12:00";
                        this.bot.sendMessage(msg, { message: timeMessage, reply: 1 });
                        break;
                    }

                    let date1 = new Date();
                    let time = params[0];
                    // Split the time into hours and minutes
                    let timeSplit = time.split(":");
                    // Set the hours and minutes
                    date1.setUTCHours(timeSplit[0]);
                    date1.setUTCMinutes(timeSplit[1]);
                    date1.setSeconds(0);

                    if (params.length === 2) {
                        // get the AM or PM
                        let ampm = params[1];
                        // Set the hours to 12 if it is PM
                        if (ampm === "PM" || ampm === "pm" || ampm === "Pm" || ampm === "pM") {
                            date1.setHours(date1.getHours() + 12);
                        }
                    }

                    // Loop through the time zones and add them to the message
                    for (let i = 0; i < timeZones.length; i++) {
                        // Add timezone and local time
                        // Remove the Country name from the timezone
                        let timeZone = timeZones[i].split("/")[1];
                        timeZone = timeZone.replace("_", " ");

                        // Just time string
                        let formattedTime = date1.toLocaleTimeString("en-US", {timeZone: timeZones[i]});
                        timeMessage += timeZone + ": " + formattedTime + "\n";
                      
                    }
                    this.bot.sendMessage(msg, { message: timeMessage, reply: 1 });
                    break;
			}
		});
	}
    get help() {
        return "Usage:\n\n${this.bot.config.trigger}now\n\n${this.bot.config.trigger}time [time] [AM/PM]";
    }
}