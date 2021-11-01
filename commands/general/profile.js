const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    if (message.mentions.members.first()) var user = await bot.users.fetch(message.mentions.members.first().id) 
    else var user = message.author;
    let embed = new Discord.MessageEmbed()
    if (user.bot) return message.channel.send(embed.setDescription("Bots don't have profiles lmao"));
    var level = Math.floor(db.get(`users.${user.id}.xp`) / 100);
    var xpnum = Math.floor(db.get(`users.${user.id}.xp`) / 10) - (level * 10);
    var xpbar = ''; let title = '';
    title = db.get(`users.${user.id}.title`) || " ";
    for (let i = 0; i < xpnum; i++)xpbar += '⬜';
    for (let i = 0; i < (10 - xpnum); i++)xpbar += '🔳'; 
    let luck = (Math.round((db.get(`users.${user.id}.luck.good`) / (db.get(`users.${user.id}.luck.good`) + db.get(`users.${user.id}.luck.bad`)) * 100) * 100) / 100) + '%';
    if (luck === 'NaN%')luck = "Zero Data";
    message.channel.send(embed
        .setThumbnail(user.displayAvatarURL({format: 'png'}))
        .addFields(
            { 
                name: `__${user.username}__`, 
                value: `**🎲Luck:** \`${luck}\``, 
                inline: true
            },
            { 
                name: `\`${title}\``, 
                value: `**🗓️Streak:** \`${db.get(`users.${user.id}.streak`)}\``, 
                inline: true
            },
            { 
                name: `__                                                           __`, 
                value: `#️⃣ \`${db.get(`users.${user.id}.command#`)}\` total Commands Issued!`
            },
            { 
                name: `Level:__                                           __\`${level}\``, 
                value: xpbar
            },
        )
    );
}

module.exports.help = {
    name:"profile",
    aliases: ["p"],
    help: "GET TO LEVEL 40",
    usage: 'profile/p <nothing or @mention>'
  }