const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;  
    var props, embed = new Discord.MessageEmbed().setTitle(args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase()).setColor("#ff0000");
    try { props = require(`F:/Workspace/TacoBot/commands/economy/uses/${args[0].toLowerCase()}/${args[1].toLowerCase()}.js`);
    } catch { embed.setDescription(`${args[0].charAt(0).toUpperCase()}${args[0].slice(1).toLowerCase()} is not a real item!`).setFooter("Perhaps you spelled it wrong?");
    } finally {
        if (!db.has(`users.${message.author.id}.inventory.${props.info.section}.${props.info.name}`) || !db.get(`users.${message.author.id}.inventory.${props.info.section}.${props.info.name}`))embed.setDescription(`You don't have a(n) ${args[0].charAt(0).toUpperCase()}${args[0].slice(1).toLowerCase()} ${props.info.section.charAt(0).toUpperCase()}${props.info.section.slice(1, props.info.section.length - 1)}!`).setFooter("POOR");
        else if (!props.run)embed.setDescription("This item isn't usable!").setFooter(`lmao imagine trying to use ${props.info.name}(s)`);
        else {
            if (!props.info.reusable)db.subtract(`users.${message.author.id}.inventory.${props.info.section}.${props.info.name}`, 1);
            props.run(bot, message, args);
        }
    }
}  

module.exports.help = {
    name:"use",
    aliases: [""],
    help: `Let's you use items!`,
    usage: 'use <item>'
}