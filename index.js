const Discord = require("discord.js");
require("discord-reply");
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const fs = require("fs");
const db = require("quick.db");
const googleTTS = require("google-tts-api");
const bot = new Discord.Client({disableEveryone: true});
const disbt = require("discord-buttons");
disbt(bot);
const folders = ["./commands/economy/", "./commands/general/", "./lore/"];

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.events = new Discord.Collection();
bot.cooldowns = new Discord.Collection();


if (!db.has('prefix'))db.set('prefix', 't!');
console.log('Starting...');

const folderInit = (folder) => {
  fs.readdir(folder, (err, files) => {
    var commandName = folder.replace(/(\/|commands|\.)/g, "");
    console.log(`__________${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Commands_________`);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    jsfile.forEach((f, i) => {
      let props = require(`${folder}${f}`);
      bot.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => bot.aliases.set(alias, props.help.name));
      console.log(`| ${f} loaded!`);
    });
  })
}

folders.map(item => folderInit(item));
console.log(`The prefix is currently "${db.get('prefix')}"!\nTime to load the commands`);

bot.on("ready", async () => {
  console.log(`|________________________\n${bot.user.username} is online!`);
  bot.user.setActivity("amogus art 😭", {
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=UbaBI-XxGbo&ab_channel=dethi"
  });
  
  bot.api.applications(bot.user.id).guilds("795142857354248212").commands.post({
    data: {
      name: "test",
      description: "the thing im currently testing"
    }
  });

  bot.on("messageDelete", async messageDelete => { //treyarchive + snipe
    if (messageDelete.author.id === '488852814903377921')db.push('treyArchive.messoge', `${messageDelete.content}`);
    db.set(`snipe.${messageDelete.guild.id}`, messageDelete);
  });

  bot.ws.on("INTERACTION_CREATE", async inter => {
    let interaction = require(`F:/Workspace/TacoBot/slash/${inter.data.name}.js`);
    interaction.run(bot, inter);
  });

  bot.on("interactionCreate", async inter => {
    console.log(1)
    let props = require(`F:/Workspace/TacoBot/commands/${inter.id.split("_").pop()}/${inter.id.split("_").shift()}.js`);
    if (inter.isSelectMenu())props.menu(bot, inter);
    else if (inter.isButton())props.button(bot, inter);
  })

  bot.on("clickButton", async button => {
    let props = require(`F:/Workspace/TacoBot/commands/${button.id.split("_").pop()}/${button.id.split("_").shift()}.js`);
    props.button(bot, button);
  });

  bot.on("clickMenu", async menu => {
    let props = require(`F:/Workspace/TacoBot/commands/${menu.id.split("_").pop()}/${menu.id.split("_").shift()}.js`);
    props.menu(bot, menu);
  })

  /*bot.on("guildMemberUpdate", async (before, after) => {//force omega male onto tyler
    if (after.id != 632622930701844503 || after.nickname == "omega male")return;
    await after.setNickname("omega male");
  });*/

  /*bot.on("voiceStateUpdate", async (oState, nState) => {//Bot says hi on voice stat update. (ANY OF THEM)
    const user = bot.users.cache.get(nState.id);
    if (user.bot)return;
    const url = await googleTTS.getAudioUrl(`Hi ${user.username}`, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
    });
    const connection = await nState.member.voice.channel.join();
    const dispatcher = connection.play(url);
  })*/

  bot.on("message", async message => {  //events
    if (message.author.id !== 293352247159422976)return;
    fs.readdir("./events/", (err, files) => {
      if(err) console.log(err);
      if (message.author.bot || message.channel.type === "dm")return;
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      jsfile.forEach((f, i) => {
        let props = require(`./events/${f}`);
        if (!db.has(`eventdelay.${props.info.name}`))db.set(`eventdelay.${props.info.name}`, 0)
        if (Math.floor(Math.random() * 10000 + 1) / 100 <= db.get(`eventdelay.${props.info.name}`)) {
          db.set(`eventdelay.${props.info.name}`, 0);
          props.run(bot, message);
        } else db.add(`eventdelay.${props.info.name}`, props.info.chance);
      });
    })
  })

  bot.on("message", async message => {
    if(message.author.bot) return; 
    if(message.channel.type === "dm") {
      let embed = new Discord.MessageEmbed().setColor("#ebba34");
      if (message.author.id !== '293352247159422976') {
        const userer = await bot.users.fetch('293352247159422976');
        userer.send(embed.setTitle(message.author.username).setDescription(message.content));
        db.set(`DMsender`, message.user);
      } else {
        let arg = message.content.trim().split(/ +/g);
        const sender = await bot.users.fetch(arg[0]);
        sender.send(embed.setTitle("TheChickenKnight").setDescription(arg.slice(1).join(' ')));
      }
    }
    let prefix = db.get('prefix');  
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase(); let commandfile;
    if (bot.commands.has(cmd))commandfile = bot.commands.get(cmd);
    else commandfile = bot.commands.get(bot.aliases.get(cmd));
    if (!message.content.startsWith(prefix)) return;
    if (commandfile.help.cooldown != -1) {
      const { cooldowns } = bot;
      if (!cooldowns.has(commandfile.help.name))cooldowns.set(commandfile.help.name, new Discord.Collection());
      const now = Date.now();
      const timestamps = cooldowns.get(commandfile.help.name);
      const cooldownAmount = (commandfile.help.cooldown || 3) * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.lineReply(new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle(commandfile.help.name.charAt(0).toUpperCase() + commandfile.help.name.slice(1))
            .setDescription(`❌ Slow Down! Wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing \`t!${commandfile.help.name}\`.`)
          );
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    /*switch(commandfile.help.name) {
      case "balance": return message.channel.send("ur just poor don't worry");
      case "beg": return message.channel.send("ur too poor to beg sorry");
      case "bet": return message.channel.send("Don't worry you can't bet ur too poor");
      case "daily": return message.channel.send("Sorry you can't gain money ur too poor");
      case "leaderboard": return message.channel.send("you don't need to check everyone is poor anyway");
      case "rob": return message.channel.send("You're too weak to rob people");
      case "withdraw": return message.channel.send("what would you even withdraw? your soul?");
      case "deposit": return message.channel.send("you don't have anything to deposit anyway.");
    }*/
    try {
      commandfile.run(bot, message, args);
    } catch (e) {
    } finally {
      db.add(`users.${message.author.id}.command#`, 1);
      var xp = Math.floor(Math.random() * 10) + 1;
      if (xp >= 9)db.add(`users.${message.author.id}.xp`, 10);
      else if (xp > 5)db.add(`users.${message.author.id}.xp`, 1);
    }    
  }
)});


bot.login("ODA1NTAxMDg0NzkzNDM4MjQ3.YBbzWA.GK4UQXWeM-UOibntYfCJ6kM-QWQ");