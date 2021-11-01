const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");
const disbt = require("discord-buttons");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    let button = new disbt.MessageButton()
        .setLabel("NO")
        .setID("bad")
        .setStyle("red");
    message.channel.send("** **", button);
}

module.exports.help = {
    name:"button",
    aliases: ["bt"],
    help: `Testing out the new Discord buttons`,
    usage: 'button/bt'
}