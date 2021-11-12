const Discord = require("discord.js");
const { Directories } = require("./basmat/galvinator/dir/Directories");
const { Fetch } = require("./basmat/galvinator/fetch/fetch");
const { Generators } = require("./basmat/galvinator/generators/Generators");
const { JSONData } = require("./basmat/galvinator/jsonaccess/JSONData");
const { JSONError } = require("./basmat/galvinator/states/Error/Errors");
const configPath = require("./Data/config/config.json");
let client = new Discord.Client()
let cache = [];

try {
    client.on("ready",  () => {
        console.log(`Logged in as ${client.user.tag}`);
    }) 

    client.on("guildCreate", guildCreate => {
        new Generators(guildCreate.id).createGuildData();
    })

    client.on("message", async message => { 
        if (message.author.id != `451895471305392138`) {
            var content = message.content;
            var contentArr = content.split(" ");
            var author = message.author.id;
            var guild = message.guild.id;
            var prefix = Fetch.fetchValueByKey(cache, author);
            if (prefix == "") { 
                try {
                    let json = await new JSONData(new Directories(guild).data()).readJSONData().Result;
                    prefix = json.config.prefix;
                    cache.push({[guild]: prefix})
                } catch (err) { 
                    message.channel.send(new JSONError(err));
                }
            }

            const jsonData = new JSONData(await new Directories(guild, message).specificCommand(contentArr[0].toString().replace("!", ""))).readJSONData().Type
            if (jsonData.Type == "Read") { 
                console.log(jsonData.Result);
            }

            
        }
    })
    client.login(configPath.discordToken);

} catch (err) { 
    console.log(err);
}