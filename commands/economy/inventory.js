const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");
const data = require("./data.json");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;  
    var embed = new Discord.MessageEmbed().setTitle("Inventory 📥")
    const inventory = db.get(`users.${message.author.id}.inventory`);
    const sections = Object.getOwnPropertyNames(inventory);
    var page = null;
    if (args[0]) {
        if (isNaN(args[0])) {
            args[0] = args[0].toLowerCase();
            if (sections.includes(args[0]))page = sections.indexOf(args[0]);
        } else { 
            if (args[0] <= sections.length)page = args[0] - 1; 
        }
    } else page = 0;
    if (page == null && sections.length)embed.setDescription("Something went wrong. Perhaps invalid number or section?").setColor("#ff0000");
    else if (!sections.length)embed.setDescription("You don't have anything in your inventory lmao");
    else embed.addFields(
        { name: sections[page].charAt(0).toUpperCase() + sections[page].slice(1), value: Object.getOwnPropertyNames(inventory[sections[page]]).map(item => item.charAt(0).toUpperCase() + item.slice(1) + " " + sections[page].charAt(0).toUpperCase() + sections[page].slice(1, sections[page].length - 1)), inline: true},
        { name: "Amount", value: Object.getOwnPropertyNames(inventory[sections[page]]).map(item => inventory[sections[page]][item]), inline: true }
        ).setFooter(`Pg. ${page + 1}/${sections.length}`);
    message.lineReply(embed);
}

module.exports.help = {
    name:"inventory",
    aliases: ["inv"],
    help: `Allows you to access your inventory!`,
    usage: 'inventory/inv'
  }