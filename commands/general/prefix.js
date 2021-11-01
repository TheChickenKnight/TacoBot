const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    let prefixEmbed = new Discord.MessageEmbed().setColor("#ebba34").setTitle(`🌮 Prefix 🌮`)
    if(!args[0])prefixEmbed.setDescription(`The prefix is \`${db.get('prefix')}\`!`);
    else if(args[0].length > 2)prefixEmbed.setDescription(`❌ You can't have a prefix that's that long!`);
    else if(args[1])prefixEmbed.setDescription(`❌ Wrong arguments!`).setFooter('You only can have one prefix at a time!');
    else if(/\d/.test(args[0]))prefixEmbed.setDescription(`❌ L A M E`)
    .setFooter('You can\'t have numbers in your prefix!');
    else { prefixEmbed.setDescription(`✅ Got it! The prefix has been changed to \`${args[0]}\`!`);
        db.set('prefix', args[0]); } message.channel.send(prefixEmbed);}

module.exports.help = {
    name:"prefix",
    aliases: ["pf"],
    help: `Let's you view or change the prefix!`,
    usage: 'prefix/pf <nothing or prefix>'
  }