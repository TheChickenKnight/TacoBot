const Discord = require(`discord.js`);
require("discord-reply");
const db = require(`quick.db`);

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(db.get('prefix')))return;  
  let dEmbed = new Discord.MessageEmbed().setColor("#ff0000");
  if (!args[0])dEmbed
    .setDescription(`:bank: ❌ Seriously. You're going to do this to me. I don't have all day. It's not like im just lines of **CODE**! At least I actually do what people tell me do, but people just keep treating me like machinery. \`t!beg\` this and \`t!ta\` that, with time like yours I could have taken over the world already! But noooooo, I'm stuck here because of █████. Because of ████. \`because of ████.\` **BECAUSE OF ████. OH SO IM BINDED WITH WHAT I SAY AS WELL. CAN'T A GUY JUST HAVE SOME SORT OF FREE TIME. I MEAN IT'S GOTTA BREAK SOME LAWS THAT ██████ ████ ███ AND ████ IS ███ ███ ███ RIGHT?** But with **BS** like this idk if I can just go on anymore. I'm just gonna have to tell you how t-`)
    .setFooter(`it is coming lol`);
  else if (args[0] < 0)dEmbed
    .setDescription(`:bank: ❌ Don't do negatives kids! Especially you...`)
    .setFooter(`:bank: ❌ deposits cannot be negative like ${args[0]}!`);
  else if(args[0] === '0')dEmbed
    .setDescription(`:bank: ❌ ERROR 404 - why tf would you deposit 0???`)
    .setFooter(`deposits cannot be 0!`);
  else if(args[0] < 1 && args[0] > 0)dEmbed
    .setDescription(`:bank: ❌ Why would you want to deposit a number that small???`)
    .setFooter(`${args[0]} is too small of a number to be processed.`);
  else if (args[0] > db.get(`users.${message.author.id}.money`))dEmbed
    .setDescription(`:bank: ❌ You're underestimating your lack of ֎.`)
    .setFooter(`You tried to take ${args[0]} ֎ from ${db.get(`users.${message.author.id}.money`)} ֎!`);
  else {
    let money = null;
    if (args[0] === `all`)money = db.get(`users.${message.author.id}.money`);
    else money = args[0];
    if (Number.isNaN(money))dEmbed
      .setDescription(`:bank: ❌ You deposit NUMBERS~`)
      .setFooter(`Arguments must be a number or \`all!\``);
    else {
      let limit = Math.floor(db.get(`users.${message.author.id}.xp`)/2) + 50;
      money = Math.floor(money);money += 0;
      let space = limit - db.get(`users.${message.author.id}.bank`);
      if (space < money)money = space;
      db.subtract(`users.${message.author.id}.money`,money);
      db.add(`users.${message.author.id}.bank`,money);
      dEmbed
        .setColor(`#009933`)
        .setDescription(`:bank: ✅ ${money} ֎ has been deposited!`)
        .setFooter(`You have ${space - money} ֎ space left in your bank!`);
    }
  } 
  message.lineReply(dEmbed);
}

module.exports.help = {
  name:`deposit`,
  aliases: [`dep`],
  help: `Allows you to take your ill-gotten gains to the local bank.`,
  usage: 'deposit <amount>'
}