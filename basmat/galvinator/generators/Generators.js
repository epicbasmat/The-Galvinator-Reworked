const { JSONData } = require("../jsonaccess/JSONData");
const { Directories } = require("../dir/Directories");
const { UUID } = require("../uuid/UUID");
const fs = require("fs");
const { FileIOError } = require("../states/Error/Errors");
const { Create } = require("../states/Success/Success");

class Generators extends JSONData {
    constructor(guildID, command) {
        super(new Directories(guildID).data(), guildID, command);
    }

    async createGuildData() { 
        var dir = await new Promise((resolve, reject) => {
            fs.mkdir(`./Guilds/data/${this.guildID}/commands/`, {recursive: true}, (err) => {
                if (err) { 
                    reject (new FileIOError(`Failed to create guild file: ${err}`))
                } else {
                    resolve(new Create(`Created ${this.guildID}'s file structure`));
                }
            });
        })

        if (dir.Type == "Create") {
            let loc = new Directories(this.guildID);
            this.fileLoc = loc.guildTemplate();
            this.data = await this.readJSONData();
            this.fileLoc = loc.data();
            this.writeJSONData();
        }
        return dir.Message
    }

    async createCommandData() {
        let uuid = UUID.uuidv4();
        let dir = new Directories(this.guildID, uuid);
        this.data = await this.readJSONData();
        this.data.commands[this.command] = uuid;
        this.writeJSONData();
        this.fileLoc = dir.commandTemplate();
        this.data = await this.readJSONData();
        this.fileLoc = dir.identity();
        this.writeJSONData();
    }

    async createGameData() { 
        
    }

}


module.exports = {Generators};