const Discord = require('discord.js');
require("discord-reply");
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(db.get('prefix')))return; 
  let value = "";
  let embed = new Discord.MessageEmbed()
    .setColor("#009933")
  if (!args[0])return message.lineReply(embed
    .setTitle("LeaderBoard options!")
    .setDescription("`money` `exp`"));
  else if (args[0] === "money" || args[0] === "cash" || args[0] === "rich"){
    value = "money";
    title = "֎";
  } else if (args[0] === "exp" || args[0] === "xp"){
    value = "xp";
    title = "exp";
  } else return message.lineReply(embed
    .setDescription("That's not a valid leaderboard!")
    .setColor("#ff0000")
  );
  var dataArray = [];
  if (value === "money")for (const [key, amount] of Object.entries(db.get('users'))) dataArray.push([key, amount.money]);
  else for (const [key, amount] of Object.entries(db.get('users'))) dataArray.push([key, amount.xp]);
  dataArray.sort((a, b) => b[1] - a[1]);   
  let content = "";let datacontent = "";
  let place = "";
  for (let i = 0; i < dataArray.length; i++) {
    let user = message.guild.members.cache.get(dataArray[i][0]);
    if (dataArray[i][1] != 0) {
      if (!i)place = "🥇";
      else if (!(i - 1))place = "🥈";
      else if (!(i - 2))place = "🥉";
      else if (i < 5)place = "🏅";
      else place = (i + 1) + "."
      content += `**${place} ${user}** ~\n`;
      datacontent += `${dataArray[i][1]}\n`;
    }
  }
  message.lineReply(embed
    .addField("User 👤", content, true)
    .addField(title, `\`${datacontent}\``, true)
    .setAuthor(`${message.guild.name} Leaderboard! 📢`, message.guild.iconURL)
  );
}
  
module.exports.help = {
  name:"leaderboard",
  aliases: ["lbd"],
  help: `Allows you to view how low you are compared to others.`,
  usage: 'leaderboard/lbd <something that can get ranked>'
}