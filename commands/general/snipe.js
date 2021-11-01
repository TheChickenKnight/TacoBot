const Discord = require("discord.js");
const db = require("quick.db");


module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(db.get('prefix')))return;
  const snipe = db.get(`snipe.${message.guild.id}`);  
  const guild = await bot.guilds.fetch(snipe.guildID);
  let webhooks = await message.channel.fetchWebhooks();
  var webhook;
  webhooks.map(item => {
    if (item.owner.id == 805501084793438247)webhook = item;
  });
  if (!webhook) {
      message.channel.createWebhook(message.channel + "TacoBot");
      webhooks = await message.channel.fetchWebhooks();
      webhooks.map(item => {if (item.owner.id == 805501084793438247)webhook = item});
  }
  const member = guild.member(snipe.authorID);
  await webhook.send(snipe.cleanContent, {
    username: member.displayName,
    avatarURL: member.user.displayAvatarURL({format: 'png'}),
  });
}

module.exports.help = {
    name:"snipe",
    aliases: [""],
    help: `recover deleted messages!`,
    usage: 'snipe'
  }