const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");
const data = require("./data.json");
const fs = require("fs");
const itemInit = (folder) => {
    let answer = [];
    fs.readdir(folder, (err, files) => {
        files.forEach(item => answer.push(item));
    });
    return answer;
}

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;  
    console.log("2:", itemInit("F:/Workspace/TacoBot/commands/economy/uses/"))
    /*const options = Object.getOwnPropertyNames(data.shop);
    var embed = new Discord.MessageEmbed().setColor("#2bc254").setTitle("🛒 Shopping INTERFACE");
    if (!args[0]) {
        embed.setDescription("**Options!**");
        options.forEach(item => embed.addField(item.charAt(0).toUpperCase() + item.slice(1), `t!shop ${item}`, true));
    } else if (!options.includes(args[0].toLowerCase()))embed.setDescription("You have to specify which section of the interface to access!").setColor("#ff0000").setFooter("Try t!shop for a list of sections!");
    else if (!args[1])embed.addFields( 
        { name: args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase(), value: Object.getOwnPropertyNames(data.shop[args[0].toLowerCase()]).map(item => item.charAt(0).toUpperCase() + item.slice(1) + " " + args[0].charAt(0).toUpperCase() + args[0].slice(1, args[0].length - 1).toLowerCase()), inline: true },
        { name: "Cost", value: Object.getOwnPropertyNames(data.shop[args[0].toLowerCase()]).map(item => {
            if (data.shop[args[0].toLowerCase()][item].cost)return data.shop[args[0].toLowerCase()][item].cost + " ֎";
            return "Not for Sale!";
        }), inline: true } 
        ).setFooter(`Try t!shop ${args[0].toLowerCase()} <name> or t!buy ${args[0].toLowerCase()} <name>!`);
    else { const currItems = Object.getOwnPropertyNames(data.shop[args[0].toLowerCase()]);
        if (currItems.includes(args[1].toLowerCase())) {
            const values = data.shop[args[0].toLowerCase()][args[1].toLowerCase()];
            embed.setDescription(`**${args[1].charAt(0).toUpperCase()}${args[1].slice(1).toLowerCase()} ${args[0].charAt(0).toUpperCase()}${args[0].slice(1, args[0].length - 1).toLowerCase()}**`)
            Object.getOwnPropertyNames(values).forEach(item => {
                if (item == "image")embed.attachFiles(values[item]).setThumbnail(`attachment://${args[1].toLowerCase()}.png`);
                else if (item == "color")embed.setColor(values[item]);
                else embed.addField(item, values[item], true);
            });            
        } else embed.setDescription(`That's not a valid ${args[0].slice(0, args[0].length - 1)}`).setColor("#ff0000").setFooter(`Try t!shop for a list of sections!`);
    } message.lineReply(embed);*/
}

module.exports.help = {
    name:"shop",
    aliases: [""],
    help: `Opens the shop!`,
    usage: 'shop'
}