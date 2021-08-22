const { DiscordAPIError } = require("discord.js");
const { DiscordJSError } = require("../states/Error/Errors");

class Fetch { 
    static fetchValueByKey(arr, ID) {
        for (var i = 0; i < arr.length; i++){ 
            if (arr[i] && arr[i].hasOwnProperty(ID)) {
                return arr[i][ID];
            }
        } return "";
    }

    static async fetchURL() { //Used for grabbing a list of messages from a channel.
        return new Promise((resolve, reject) => {
            var loadBar = new LoadBar(0, 10).loadBarGeneric();
            var fetchMessage = `Fetching ${this.dataCount} data instances in channel ${this.channel}. [${loadBar}]`;
            try {
                message.guild.channels.cache.get(channel).channel.send(fetchMessage).then(sentMessage => {
                    ({limit: this.dataCount}).then((collectedMessages) => {
                        LoadBar.current = this.dataCount;
                        sentMessage.edit(fetchMessage).then(() => {
                            resolve (collectedMessages);
                        })
            
                    })
                });
            } catch (err) { 
                reject(new DiscordJSError(err));
            }
        })
    }
}

module.exports = {Fetch}