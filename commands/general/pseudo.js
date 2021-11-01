const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    let webhooks = await message.channel.fetchWebhooks();
    var webhook;
    webhooks.map(item => {if (item.owner.id == 805501084793438247)webhook = item});
    if (!webhook) {
        message.channel.createWebhook(message.channel + "TacoBot");
        webhooks = await message.channel.fetchWebhooks();
        webhooks.map(item => {if (item.owner.id == 805501084793438247)webhook = item});
    }
    const guild = await bot.guilds.fetch(message.guild.id);
    let author = ""; let text = "";
    if (message.mentions.members.first()) {
        author = await bot.users.fetch(message.mentions.members.first().id);
        text = args.slice(1).join(" ");
    } else {
        author = message.author;
        text = args.join(" ");
    }
    const member = guild.members.fetch(author);
    console.log(member)
    await webhook.send(text, {
        username: member ? member.displayName : null,
        avatarURL: member.user.displayAvatarURL({format: 'png'}),
    });
    message.delete();
}

module.exports.help = {
    name:"pseudo",
    aliases: ["psudo", "sudo", "psuedo"],
    help: `BECOME SOMEONE ELSE`,
    usage: 'psudo/sudo/psuedo/pseudo <mention or nothing> <message>'
  }