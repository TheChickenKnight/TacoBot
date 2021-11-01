const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = (bot, message, args) => {
  if(!message.content.startsWith(db.get('prefix')))return;
  db.set(`users.${message.author.id}.money`, Math.floor(db.get(`users.${message.author.id}.money`)));
  db.set(`users.${message.author.id}.bank`, Math.floor(db.get(`users.${message.author.id}.bank`)));
  const user = message.mentions.members.first() || message.author;
  if(!db.has(`users.${user.id}.money`))db.set(`users.${user.id}.money`, 0);
  if(!db.has(`users.${user.id}.bank`))db.set(`users.${user.id}.bank`, 0);
  message.lineReply(new Discord.MessageEmbed()
    .setColor('#009933')
    .setTitle(`Balance 💰`)
    .setDescription(`👝 Pocket: \`${db.get(`users.${user.id}.money`)}\` ֎\n🏦 Bank: \`${db.get(`users.${user.id}.bank`)}/${Math.floor(db.get(`users.${user.id}.xp`)/2) + 50}\` ֎`)
  );
}

module.exports.help = {
  name:"balance",
  aliases: ["bal"],
  help: `Let\'s you check how poor you are and how rich others are compared to you.`,
  usage: 'bal/balance <@someone if needed>'
}