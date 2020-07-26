const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bitlyAPI = require("node-bitlyapi");
const config = require("./Data/config/globalconfig.json");
const path = require("path");
const mkdirp = require("mkdirp");
const directory = path.dirname(require.main.filename);
require("dotenv").config();
console.log("Loaded all required modules");
var workingDirectory = directory + "/data/guilds/";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const guildTemplate = {
    "config": {
        "dadChance": 0,
        "dadMode": true,
        "updateChannel": true,
        "prefix": "!"
    },
    "commands": {

    }, 
    "metadata": {
        "amountOfCommands": 0 //TODO implement this lol
    }
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sarcasm(message) {
    message.shift();
    message = message.join(" ").split("")
    for (let i = 0; i < message.length; i++) {
        let rng = randomInt(2)
        if (rng === 0) {
            message[i] = message[i].toUpperCase();
        }
    }
    return message.join("");
}

function dadMode(content) {
    for (let i = 0; i < content.length; i++) {
        if (content[i] === "im" || content[i] === "i'm") {
            RNG = randomInt(config.dadChance);
            if (RNG === 1) {
                let dadQuote = msgSplit.splice(i + 1);
                dadQuote = dadQuote.join(" ");
                return dadQuote;
            }
        }
    }
}
//                        message  , true/false, location of guild file
function JSONManipulation(contentArgs, command, guildDir) {
    contentArgs[0] = contentArgs[0].replace("!", "");
    jsonDir = guildDir + "/data.json"; 
    dataDir = guildDir + "/data/"
    try {
        var json = JSON.parse(fs.readFileSync(jsonDir));
    } catch (err) {
        return `An error has occured: ${err}`;
    }
    let length = Object.keys(json).length;
    if (command === true) { //TODO Deny null requests and repeat requests
        if (contentArgs[1] === "add") {
            UUID = uuidv4();
            json.commands[contentArgs[2]] = UUID + ".json"; //Creating new element within json NOTE: APPENDS .JSON TO THE END OF THE FILE NAME
            fs.writeFileSync(jsonDir, JSON.stringify(json, null, 2));
            dataDir = dataDir + UUID + ".json";
            fs.writeFile(dataDir, "{}", function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Custom command created");
                }
            })
            return `Added "${contentArgs[2]}" to commands`;
        } else if (contentArgs[1] === "delete") {
            try {
                delete json.commands[contentArgs[2]]
                return `Deleted "${contentArgs[2]}" from commands list`
            } catch (err) {
                console.log(err);
                return `Failed to delete "${contentArgs[2]}" from commands list, it either does not exist or you mistyped. If you think this is an error please contact an administrator.`
            }
        } else if (contentArgs[1] === "edit") {
            let UUID = json.commands[contentArgs[2]]
            dataDir = dataDir + UUID
            console.log(dataDir);
            try {
                let customCommand = JSON.parse(fs.readFileSync(dataDir)); //Reads command json
                console.log(customCommand);
                if (contentArgs[3] === "add") {
                    let length = Object.keys(customCommand).length;
                    customCommand[length + 1] = contentArgs[4];
                    fs.writeFileSync(dataDir, JSON.stringify(customCommand, null, 2));
                    return `Added ${contentArgs[4]} to ${contentArgs[2]}`
                } else if (contentArgs[3] === "remove") {
                    
                }
            } catch (err) {
                console.log(err);
                return `Failed to find command "${contentArgs[2]}", it either does not exist or you mistyped. If you think this is an error please contact an administrator.`;
            }
            
        } else {
            return `Invalid Syntax`;
        }
    } else if (command === false) {
        let UUID = json.commands[contentArgs[0]]; //Reads UUID of command from data.json
        console.log(`UUID: ${UUID}`);
        dataDir = dataDir + UUID
        try {
            /*if (typeof contentArgs[1] === "undefined" || parseInt(contentArgs[1]) > Object.keys(json).length || isNaN(contentArgs[1]) === true || contentArgs[1] === null) {
                contentArgs[1] = Math.floor(Math.random() * length) + 1;
            }*/
            let jsonCommand = JSON.parse(fs.readFileSync(dataDir));
            return jsonCommand[contentArgs[1]];
        } catch (err) {
            console.log(err);
        }
    }
}

try {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setPresence({ game: { name: config.status }, status: "online" });
    });
    client.on("guildCreate", guildCreation => {
        console.log(`Joined ${guildCreation.name}`);
        let guildDir = workingDirectory + guildCreation.id;
        let commands = guildDir + "/data.json";
        let data = guildDir + "/data/"
        guildJSON = JSON.stringify(guildTemplate, null, 2)
        mkdirp(data).then(made =>
            fs.writeFile(commands, guildJSON, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Data JSON Created");
                }
            }),
        ),
        guildCreation.roles.create({
            data: {
                name: "The Overlord",
            },
            reason: "The Galvinator needs to knows who he can interact with."
        })
    });
    client.on("message", message => {
        var content = message.content;
        var contentArgs = content.split(" ");
        var authorID = message.author.id;
        var guildID = message.guild.id;
        var guildDir = workingDirectory + guildID;
        var dataJSON = JSON.parse(fs.readFileSync(guildDir + "/data.json")); //TODO Cache this 
        var found = false;
        if (authorID !== 451895471305392138) {
            content = content.toLowerCase();
            /*if (dataJSON.config["dadMode"] === true) {
                message.channel.send(dadMode(contentArgs));
            }*/
            if (dataJSON.config["commandMode"] === true) {
                let length = Object.keys(dataJSON).length
                if (length === 0) {
                    length = 1;
                }
                //console.log(length);
                for (let i = 0; i < 3; i++) { //TODO Update how it calculates the length of the json file.
                    let prefixStripped = contentArgs[0].replace(dataJSON.config["prefix"], "");
                    if (prefixStripped in dataJSON.commands) {
                        found = true;
                    }
                }
                if (found === true) {
                    message.channel.send(JSONManipulation(contentArgs, false, guildDir));
                    found = false;
                }
            }
            if (dataJSON.config["createCommands"] === true /*&& (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === "The Overlord")) === true*/ && content.startsWith(dataJSON.config["prefix"] + "command"))/*)*/ {
                message.channel.send(JSONManipulation(contentArgs, true, guildDir));
            }
            if (contentArgs[0] === ((dataJSON.config["prefix"]) + "help")) {
                message.channel.send(`The list of integrated commands:
!command (WIP)
    - add | Adds a new command that people can use 
    - delete | Removes a command that people can use 
    - list | Lists commands
    - edit <command> | Allows the command to be edited using the two sub commands
        - add | Adds data to the specified command
        - delete | Removes data from the specified command.`)
            }
        } else {
            console.log("what the fuck");
        }
    });
    client.login(config.discordToken);
} catch (err){
    console.error(err);
}