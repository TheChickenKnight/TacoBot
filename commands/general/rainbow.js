const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    else {
        message.react('🟥'); message.react('🟧'); message.react('🟨'); message.react('🟩'); message.react('🟦'); message.react('🟪'); message.react('🟫');
        db.set(`rb.${message.author.id}`, Date.now());
    }
}

module.exports.help = {
    name:"rainbow",
    aliases: ["rb"],
    help: `R A I N B O W S`,
    usage: 'rb/rainbow'
  }