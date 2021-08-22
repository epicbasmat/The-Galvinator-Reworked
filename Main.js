const { baseAssetProperties } = require("./basmat/galvinator/game/baseData/baseMobData.js");
const {Generators} = require("./basmat/galvinator/generators/Generators.js");
const { Create } = require("./basmat/galvinator/states/Success/Success.js");

//console.log(new Generators("527380164657807378", "hello").createCommandData());

//new baseAssetProperties("hello", "world", "arr", "spongebob", "hmrc", "is", "coming");

console.log(new Generators("321").createGuildData());

/*a = new Create("what the hecky");
if (a) { 
    console.log("whoo")
} else {
    console.log(":(")
}*/