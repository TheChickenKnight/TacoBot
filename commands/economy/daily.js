const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(db.get('prefix')))return;  
  let dailyEmbed = new Discord.MessageEmbed().setColor("#009933");
  const lastime = new Date(db.get(`users.${message.author.id}.delays.daily`));
  lastime.setHours(0,0,0,0);
  if (isToday(lastime))dailyEmbed
  .setDescription(`📆 you already get free money, why don't you just wait until tomorrow?`)
  .setColor("#ff0000");
  else {
    if ((Date.now() - db.get(`users.${message.author.id}.delays.daily`)) / 86400000 < 2)
    db.add(`users.${message.author.id}.streak`, 1);
    else db.set(`users.${message.author.id}.streak`, 0);
    let streak = db.get(`users.${message.author.id}.streak`);
    let amount = ((streak || 1) - 1) * 15 + 50;
    dailyEmbed
      .setDescription(`📆 Fine take your damn money, but get away from me quick. Take ${amount} ֎!`)
      .setFooter(`Streak: ${streak || 0}`);
    db.set(`users.${message.author.id}.delays.daily`, Date.now());
    db.add(`users.${message.author.id}.money`, amount)
  } 
  message.lineReply(dailyEmbed);
}

function isToday(today) {
  let dateParameter = new Date(Date.now());
  dateParameter.setHours(0,0,0,0);
  return dateParameter.getDate() === today.getDate() && dateParameter.getMonth() === today.getMonth() && dateParameter.getFullYear() === today.getFullYear();
}

module.exports.help = {
  name:"daily",
  aliases: ["day"],
  cooldown: -1,
  help: `Allows you to get free cash every 24 hours. Use it wisely!`,
  usage: 'daily/day'
}