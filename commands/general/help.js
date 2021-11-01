const Discord = require('discord.js');
require("discord-reply");
const db = require('quick.db');
const fs = require('fs');
const index = require(`F:/Workspace/TacoBot/index.js`);

module.exports.run = async (bot, message, args, commandfile) => {
  if(!message.content.startsWith(db.get('prefix')))return;  
  bot.help = new Discord.Collection();
  if (!args[0]) {
    fs.readdir("F:/Workspace/TacoBot/commands/economy/", (err, files) => {
      if(err) console.log(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0) return console.log("Couldn't find commands.");
      let economy = '';
      jsfile.forEach((f, i) => {
        economy += ` \`${jsfile[i].slice(0,-3)}\` `;
      });
      fs.readdir("F:/Workspace/TacoBot/commands/general/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if(jsfile.length <= 0) return console.log("Couldn't find commands.");
        let general = '';
        jsfile.forEach((f, i) => {
          general += ` \`${jsfile[i].slice(0,-3)}\` `;
        });
      let HelpEmbed = new Discord.MessageEmbed().setColor("#ebba34").setTitle(`🌮 **TACOBOT** Help! 🌮`)
      .addField("💸 Economy Commands", economy)
      .addField("📄 General Commands", general)
      .setFooter(`type \`${db.get('prefix')}help <command>\` for more specific help!`); 
      message.lineReply(HelpEmbed);
    })
  })
 } else {
      fs.readdir("F:/Workspace/TacoBot/commands/economy/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if(jsfile.length <= 0) {console.log("Couldn't find commands."); return;}
        jsfile.forEach((f, i) => {
          let props = require(`F:/Workspace/TacoBot/commands/economy/${f}`);
          bot.commands.set(props.help.help, props);
          props.help.aliases.forEach(alias => { 
            bot.aliases.set(alias, props.help.name);
          });
        })
      })
      if (bot.commands.has(args[0].toLowerCase()))commandfile = bot.commands.get(args[0].toLowerCase());
      else commandfile = bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
      const commandHel = commandfile.help.help || '❌ that doesn\'t seem to be a real command. Pls check ur spelling or smthn idk';
      let SpecHelpEmbed = new Discord.MessageEmbed().setColor("#ebba34").setTitle(`🌮 **TACOBOT** Help! 🌮\n${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`)
      .setDescription(`${commandHel} \n\n 🌮 \`Usage: ${db.get(`prefix`)}${commandfile.help.usage}\` 🌮`)
      message.lineReply(SpecHelpEmbed);
    }
}
       
module.exports.help = {
  name:"help",
  aliases: ["h"],
  help: `Well you know now, don\'t you?`,
  usage: 'help <command if needed>'
}