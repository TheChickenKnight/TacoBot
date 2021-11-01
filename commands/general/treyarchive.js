const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;
    if (message.author.id === '488852814903377921')return message.channel.send('sike you thought');
    let treyArchiveEmbed = new Discord.MessageEmbed().setTitle(`🌮 Trey Archive 🌮`).setColor("#ebba34")
    if (!args[0])treyArchiveEmbed.setDescription(await db.get('treyArchive.messoge')); else if (args[0] === 'reset') {
    treyArchiveEmbed.setDescription('treyArchive was reset!');db.set('treyArchive', { messoge: ['']});
    } else if (args[0] === 'bet')db.set(`bet.${message.author.id}`, Date.now());
    else treyArchiveEmbed.setDescription('That was the wrong arguments!');
    message.channel.send(treyArchiveEmbed);}

module.exports.help = {
    name:"treyarchive",
    aliases: ["ta"],
    help: `t r e y a r c h i v e`,
    usage: 'treyarchive/ta <none, reset>'
  }