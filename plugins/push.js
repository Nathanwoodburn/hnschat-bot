import events from "events";
import axios from "axios";
import { SlowBuffer } from "buffer";
export class Plugin {
    constructor(bot) {
        this.bot = bot;

        this.events = new events.EventEmitter();

        this.types = ["MESSAGE"];

        this.init();
    }

    init() {
        this.events.on("MESSAGE", async msg => {
            if (this.bot.userIsActive("VXGCrUxV1VtctnDM")){
                console.log("Ignoring message as user is active");
                return;
            }
            let channelID = msg.conversation;
            let channel = "No Channel";
            switch (channelID) {
                case "T4McaFXy":
                    channel = "Test";
                    break;
                case "P8xEzhTP":
                    channel = "General";
                    break;
                case "iwn6wouI":
                    channel = "Hard Fork";
                    break;
                default:
                    channel = channelID;
                    break;
            }
            if (!this.bot.isChannel(channelID)) {
                channel = "DM";
            }
            
            let user = this.bot.userForID(msg.user).domain;
            let message = msg.message;
            let title = channel + ": " + user;
            

            const url = "https://push.woodburn.au/message?token=Ad0psJDKG2a.FBX";
            const bodyFormData = {
                title: title,
                message: message,
                priority: 5,
            };

            axios({
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                url: url,
                data: bodyFormData,
              })
                .then((response) => console.log(response.data))
                .catch((err) => console.log("ERROR: " + err));

            console.log("Pushed: " + title + " " + message);

        });
    }
}