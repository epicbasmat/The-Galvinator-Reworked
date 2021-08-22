const fs = require("fs");

class JSONData {
    constructor(fileLoc, guildID, command, data, identifier) { 
        this.fileLoc = fileLoc;
        this.guildID = guildID;
        this.command = command;
        this.data = data;
        this.identifier = identifier;
    }

    async readJSONData () { 
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileLoc, (error, result) => {
                if (error) { 
                    reject(error)
                } else {
                    resolve(JSON.parse(result));
                }
            })
        })
    }

    async writeJSONData () {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileLoc, JSON.stringify(this.data, null, 2), (error) => {
                if (error) { 
                    reject(error);
                } else {
                    resolve("happy")
                }
            })
        })
    }

    /*async deleteJSONData() { 
        return new Promise((resolve, reject) => {
            try {
                let json = await this.readJSONData()
                delete json.commands[command]
                await this.writeJSONData(json)
            //  ^^^^^
       //TODO:  await is only valid in async function 
                resolve("happi")
            } catch (error) {
                reject(error);
            }
        })
    }*/ 
}

module.exports = {JSONData}