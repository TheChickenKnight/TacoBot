const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    var embed = new Discord.MessageEmbed().setColor("#ffdb4d").setTitle("Coin Flip Toss 🪙!").setDescription("Flipping...\nMake your guesses now!");
    message.lineReply(embed).then(msg => {
        setTimeout(() => {
            if (Math.round(Math.random()))embed.setDescription("It was heads :slight_smile:!");
            else embed.setDescription("It was tails! :upside_down:");
            msg.edit(embed);
        }, 3000);
    });
}

module.exports.help = {
    name:"coinflip",
    aliases: ["cf"],
    help: `Flip coins for stuff!`,
    usage: 'coinflip/cf'
}