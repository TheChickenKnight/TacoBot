const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");
const data = require("./data.json");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;  
    var collected;
    const sections = Object.getOwnPropertyNames(data.shop);
    var embed = new Discord.MessageEmbed().setColor("#ff0000").setTitle("🛒 Shopping INTERFACE");
    if (!args[0])embed.setDescription("You have to specify a section!").setFooter("Try t!shop for a list of sections!");
    else {
        args = args.map(item => item.toLowerCase());
        if (!sections.includes(args[0]))embed.setDescription(`\`${args[0]}\` is not a valid section!`).setFooter("Try t!shop for a list of valid sections!");
        else if (!args[1])embed.setDescription("You need to specify an item from the `" + args[0].charAt(0).toUpperCase() + args[0].slice(1) + "` Section!").setFooter(`try t!shop ${args[0]} for a list of items in said section.`);
        else {
            var count = null;
            if (args[3])count = args[3];
            else count = 1;
            const items = Object.getOwnPropertyNames(data.shop[args[0]]);
            const title = `${args[1].charAt(0).toUpperCase()}${args[1].slice(1)} ${args[0].charAt(0).toUpperCase()}${args[0].slice(1, args[0].length - 1)}`;
            if (!items.includes(args[1]))embed.setDescription(`That's not a valid ${args[0].charAt(0).toUpperCase()}${args[0].slice(1, args[0].length - 1)}!`).setFooter(`Try t!shop ${args[0]} for a list of items in said section or t!shop for a list of other sections!`);
            else if (!data.shop[args[0]][args[1]].cost)embed.setDescription(`${title} isn't currently for sale!`).setFooter(`Try t!shop ${args[0]} ${args[1]} for a description!`);
            else {
                await message.lineReply(new Discord.MessageEmbed()
                    .setColor("#969696")
                    .setTitle("🛒 Shopping INTERFACE")
                    .setDescription(`Are you sure you want to buy ${count} \`${args[1]}\`?\n That'll cost you ${data.shop[args[0]][args[1]].cost * count} ֎!`)
                    .setFooter("Type y or n for response.")
                );
                try {
                    collected = await message.channel.awaitMessages(
                        res => (res.content.toLowerCase() == "y" || res.content.toLowerCase() == "n") && res.author.id == message.author.id,
                        { max: 1, time: 20210, errors: ['time']}
                    );
                } catch { 
                    embed.setDescription("You didn't answer in time, why bother me?");
                } finally {
                    if (!collected)embed.setDescription("You didn't answer in time, why bother me?");
                    else if (collected.first().content == "y") {
                        if (db.get(`users.${message.author.id}.money`) < data.shop[args[0]][args[1]].cost * count)embed.setDescription("You're too poor to buy this LMAO").setFooter("Maybe you can withdraw from your bank?");
                        else {
                            if (db.has(`users.${message.author.id}.inventory.${args[0]}.${args[1]}`)) {
                                if (db.get(`users.${message.author.id}.inventory.${args[0]}.${args[1]}`) + count > data.shop[args[0]][args[1]].limit)embed.setDescription(`You already have ${data.shop[args[0]][args[1]].limit} ${title}(s)! You can't buy that many more!`).setFooter("Maybe you can buy less?");
                                else {
                                    db.add(`users.${message.author.id}.inventory.${args[0]}.${args[0]}`, count);
                                    embed.setDescription(`You have bought ${count} ${title}(s)! You currently have ${db.get(`users.${message.author.id}.inventory.${args[0]}.${args[1]} in total!`)}`).setColor("#00cc00");
                                }
                            } else {
                                if (data.shop[args[0]][args[1]].limit < count)embed.setDescription(`You can't buy ${count} ${title}(s)! That's too many!`);
                                else {
                                    db.set(`users.${message.author.id}.inventory.${args[0]}.${args[1]}`, count);
                                    embed.setDescription(`You have bought ${count} ${title}(s)! You currently have ${count} in total!`)
                                }
                            }
                        }
                    } else embed.setDescription("Well good for you ig. You declined!");
                }
            }
        }
    } message.lineReply(embed);
}

module.exports.help = {
    name:"buy",
    aliases: [""],
    help: `Lets you buy from the shop!`,
    usage: 'but <section> <item>'
}