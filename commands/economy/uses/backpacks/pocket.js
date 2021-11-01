const Discord = require("discord.js");
require("discord-reply");

module.exports.info = {
    name: "pocket",
    section: "backpacks",
    reusable: true,
    cost: 100,
    sell: 50,
    description: "Totally not just your pockets.",
    values: {
        size: 10,
        limit: 1,
    }
}

module.exports.run = async (bot, message, args) => {
    
}