const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if (!message.content.startsWith(db.get('prefix')))return;
    const money = db.get(`users.${message.author.id}.money`);
    let embed = new Discord.MessageEmbed().setColor("#009933");
    if (args[0] === 'all')args[0] = money;
    else if (!args[0])description = `🎲 ❌ You're supposed to bet SOMETHING!`;
    else if (args[0] > money)description = `🎲 ❌ You can't bet more than you have!`;
    else if (args[0] < 10)description = `🎲 ❌ You have to bet more than 10 dollars!`;
    if (!args[0] || args[0] > money || args[0] < 10)return message.lineReply(embed.setDescription(description).setColor("#ff0000"));
    else {
        message.lineReply(embed
            .setDescription("🎲 🔄 Betting...")
        ).then(msg => {
            setTimeout(() => {
                if (Math.floor(Math.random()*2)) {
                    msg.edit(embed
                        .setDescription(`🎲 ❌ Well you lost. ${args[0]} ֎!`)
                        .setColor("#ff0000")
                    );
                    db.subtract(`users.${message.author.id}.money`, args[0]);
                    db.add(`users.${message.author.id}.luck.bad`, 1);
                } else {
                    msg.edit(embed
                        .setDescription(`🎲 ✅ Nice you bet and won ${args[0]} ֎!`)
                    );
                    db.add(`users.${message.author.id}.money`, args[0]);
                    db.add(`users.${message.author.id}.luck.good`, 1);
                }
                db.set(`users.${message.author.id}.delays.bet`, Date.now());
            }, 3000)
        })
    }
}

module.exports.help = {
    name:"bet",
    aliases: ["gamble"],
    cooldown: 60,
    help: `Allows you to gamble your filthy money to your heart\'s content.`,
    usage: 'gamble/bet <amount>'
}