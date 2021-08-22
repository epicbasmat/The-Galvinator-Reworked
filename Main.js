const Discord = require("discord.js");
const { Directories } = require("./basmat/galvinator/dir/Directories");
const { Fetch } = require("./basmat/galvinator/fetch/fetch");
const { Generators } = require("./basmat/galvinator/generators/Generators");
const { JSONData } = require("./basmat/galvinator/jsonaccess/JSONData");
const { JSONError } = require("./basmat/galvinator/states/Error/Errors");
let client = new Discord.Client()
let cache = [];

try {
    client.on("ready",  () => {
        console.log(`Logged in as ${client.user.tag}`);
    }) 

    client.on("guildCreate", guildCreate => {
        new Generators(guildCreate.id).createGuildData();
    })

    client.on("message", message => { 
        if (message.author.id != `451895471305392138`) {
            var content = message.content;
            var author = message.author.id;
            var guild = message.guild.id;
            var prefix = Fetch.fetchValueByKey(cache, author);
            if (prefix == "") { 
                try {
                    let json = await new JSONData(new Directories(guild).data()).readJSONData();
                    prefix = json.config.prefix;
                    cache.push({[guild]: prefix})
                } catch (err) { 
                    message.channel.send(new JSONError(err));
                }
            }
            
        }
    })


} catch (err) { 
    console.log(err);
}