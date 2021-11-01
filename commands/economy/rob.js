const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(db.get(`prefix`)))return;
  let victim = message.mentions.members.first() || `nope`;
  let victimoney = db.get(`users.${victim.id}.money`);
  let robEmbed = new Discord.MessageEmbed().setColor("#ff0000")
  if (victim.id === message.author.id)robEmbed
    .setDescription(`${message.author} smacked himself in his face for 5 hours, until he finally got ${message.author} to give up money. In the end, he realized it was a net neutral. But hey, at least nothing was lost. And the delay wasn't reset either!`);
  else if(victim === `nope`)robEmbed.setDescription(`You have to steal from someone ${message.author}!`);
  else if(db.get(`users.${message.author.id}.money`) < 50)robEmbed.setDescription(`${message.author}, you need at least 50 ֎ to rob somebody.`);
  else if (victimoney < 50 || !victimoney)robEmbed.setDescription(`${victim} is too **POOR** to be worth robbing ${message.author}!`).setFooter("ESPECIALLY IF THEY HAVE EXACTLY 49 ֎");
  else if (Math.floor(Math.random() * 2)) {
    robEmbed.setDescription(`Cringe, you accidently tripped on your foot ${message.author}. Luckily your target didn\`t notice.`);
    db.set(`users.${message.author.id}.delays.rob`, Date.now());
    db.add(`users.${message.author.id}.luck.bad`, 1);
  } else {
    let amount = Math.floor(((Math.floor(Math.random() * 5) + 11) / 100) * victimoney);
    robEmbed
      .setDescription(`${message.author} you robbed ${victim} and got away with \`${amount}\` ֎!`)
      .setColor("#009933");
    db.subtract(`users.${victim.id}.money`, amount);
    db.add(`users.${message.author.id}.money`, amount);
    db.set(`users.${message.author.id}.delays.rob`, Date.now());
    db.add(`users.${message.author.id}.luck.good`, 1);
  }
  message.lineReply(robEmbed);
}

module.exports.help = {
  name:"rob",
  aliases: ["steal", "st"],
  cooldown: 300,
  help: `Allows you to rob whoever you want! You can always trip and fail.`,
  usage: `rob/steal <@someone>`
}