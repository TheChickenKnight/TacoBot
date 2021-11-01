const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;
    if(message.author.id != 293352247159422976)return message.channel.send("stop danny");
    if (!args[0])message.channel.send("Wrong args!");
    else db.delete(args[0]);
}

module.exports.help = {
    name:"delete",
    aliases: ["del"],
    help: `Only for admins!`,
    usage: `none!`
  }