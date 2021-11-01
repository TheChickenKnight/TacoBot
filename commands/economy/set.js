const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;
    if (message.author.id != 293352247159422976)return message.channel.send("that's not for you!");
    if (!args[0] || !args[1])message.channel.send("Wrong args!");
    else db.set(args[0], args.slice(1).join(" "));
}

module.exports.help = {
    name:"set",
    aliases: [""],
    help: `Only for admins!`,
    usage: `none!`
  }