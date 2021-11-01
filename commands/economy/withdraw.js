const Discord = require(`discord.js`);
require("discord-reply");
const db = require(`quick.db`);

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(db.get('prefix')))return;  
  let wEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
  if (!args[0])wEmbed
    .setTitle(":bank: ❌")
    .setDescription(`*You goes to the bank. The teller asks, what is your purpose of visit? You go, oh yeah, I just have to withdraw from my bank. The teller goes, of course! And how much would you like to take? You: ... Teller: ... Alright have a good day! You leave. The teller has a mental breakdown.*`)
    .setFooter(`Please. Just please, withdraw something. I am that teller.`);
  else if (args[0] < 0)wEmbed
    .setTitle(":bank: ❌")
    .setDescription(`Why do you have to always be so negative?`)
    .setFooter(`withdraws cannot be negative like ${args[0]}!`);
  else if(args[0] === '0')wEmbed
    .setTitle(":bank: ❌")
    .setDescription(`This is just like saying nothing but worse, except I don't have another monologue ${message.author}.`)
    .setFooter(`withdraw cannot be 0!`);
  else if(args[0] < 1 && args[0] > 0)wEmbed
    .setTitle(":bank: ❌")
    .setDescription(`At this point just go beg or something.`)
    .setFooter(`${args[0]} is too small of a number to be processed.`);
  else if(args[0] === 'all' || args[0] === 'max') {
    var money = db.get(`users.${message.author.id}.bank`);
    if (money === 0)wEmbed
      .setTitle(":bank: ❌")
      .setDescription(`You have literally nothing in ur bank stfu.`)
      .setFooter(`withdraws cannot be 0!`);
    else {
      db.subtract(`users.${message.author.id}.bank`, money);
      db.add(`users.${message.author.id}.money`, money);
      wEmbed
        .setTitle(":bank: ✅")
        .setColor(`#009933`)
        .setDescription(`All the money in you bank is now in your hands! What will you do?`)
        .setFooter(`${money} ֎ has been withdrawn!`);
    }
  } else if (args[0] > db.get(`users.${message.author.id}.bank`))wEmbed
    .setTitle(":bank: ❌")
    .setDescription(`You're underestimating your lack of ֎.`)
    .setFooter(`You tried to take ${args[0]} ֎ from ${db.get(`users.${message.author.id}.bank`)} ֎!`);
  else if (!Number.isNaN(args[0])) {
    args[0] = Math.floor(args[0]); args[0] += 0;
    db.add(`users.${message.author.id}.money`, args[0]);
    db.subtract(`users.${message.author.id}.bank`, args[0]);
    wEmbed
      .setTitle(":bank: ✅")
      .setColor(`#009933`)
      .setDescription(`Money has been withdrawn.`)
      .setFooter(`${args[0]} ֎ was withdrawn!`);
  } else wEmbed
    .setTitle(":bank: ❌")
    .setDescription(`Your kind is even allowed!`)
    .setFooter(`withdraws cannot be anything other than integers unlike ${args[0]}!`);
  message.lineReply(wEmbed);
}

module.exports.help = {
  name:`withdraw`,
  aliases: [`with`, `w`],
  help: `Allows you to take money out of you bank.`,
  usage: 'withdraw/wd <positive amount>'
}