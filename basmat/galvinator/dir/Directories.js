const {JSONError} = require("../states/Error/Errors.js");
const {JSONData} = require("../jsonaccess/JSONData");
const { Read } = require("../states/Success/Success.js");

class Directories {
    constructor(guildID, uuid) { 
        this.guildID = guildID;
        this.uuid = uuid
        this.baseTemplateLoc = `./basmat/galvinator/template/`
    }

    identity () {
        return `./Guilds/data/${this.guildID}/commands/${this.uuid}.json`;
    }

    data () {
        return `./Guilds/data/${this.guildID}/data.json`;
    }

    commandTemplate() {
        return `${this.baseTemplateLoc}commandTemplate.json`;
    }

    guildTemplate() { 
        return `${this.baseTemplateLoc}guildTemplate.json`;
    }

    mobEntityTemplate() { 
        return `${this.baseTemplateLoc}mobEntityTemplate.json`;
    }

    tileEntityTemplate() { 
        return `${this.baseTemplateLoc}tileEntityTemplate.json`;
    }

    async specificCommand (command) { //Returns UUID path of command issued
        let data = await new JSONData(this.data(this.guildID)).readJSONData().Result;
        return new Promise((resolve, reject) => {
            try { 
                resolve(new Read(`./guilds/data/${this.guildID}/commands/${data.commands[command]}.json`))
            } catch (err) { 
                reject(new JSONError(err));
            }
        })
    }
}


module.exports = {Directories};