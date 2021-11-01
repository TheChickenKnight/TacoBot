const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => { 
    let titleEmbed = new Discord.MessageEmbed().setColor("#ebba34").setTitle(`🌮 Title 🌮`)
    if (!args[0])titleEmbed.setDescription(`Your Current Title is \`${db.get(`users.${message.author.id}.title`) || 'none'}\`!`)
    else if (args[0] === 'reset' || args[0] === 'clear') {
        titleEmbed.setDescription(`reset!`)
        db.set(`users.${message.author.id}.title`, null);
    } else if (args[0] === 'set' || args[0] === 'change') {
        if (!args[1])titleEmbed.setDescription("You have to change it to something!");
        else if (args.slice(1).join(' ').length > 10)titleEmbed.setDescription("Title cannot be longer than 10 characters!");
        else {
            db.set(`users.${message.author.id}.title`, args.slice(1).join(' '));
            titleEmbed.setDescription(`Your Title has been changed to \`${db.get(`users.${message.author.id}.title`)}\`!`);
        }
    } else titleEmbed.setDescription("Wrong Arguments!");
    message.channel.send(titleEmbed);
} 


module.exports.help = {
    name:"title",
    aliases: ["tt"],
    help: `Allows you to put a random title to describe you!`,
    usage: 'GET TO LEVEL 25'
}