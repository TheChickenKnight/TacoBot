const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    let embed = new Discord.MessageEmbed().setColor("#ebba34").setTitle("🌮 Emoji 🌮");
    if (!args[0])embed.setDescription("❌ You have to send something!")
    const text = args.join(' ').toLowerCase();
    if (text.length > 2000)embed.setDescription("❌ Message cannot be longer than 2000 characters!");
    let emojis = ''; let syntax = "false";
    for (let i = 0; i < text.length; i++) {
        switch (text.charAt(i)) {
            case " ": emojis += "🟦 ";           break;
            case "a": emojis += "🇦 ";             break;
            case "b": emojis += "🇧 ";             break;
            case "c": emojis += "🇨 ";             break;
            case "d": emojis += "🇩 ";             break;
            case "e": emojis += "🇪 ";             break;
            case "f": emojis += "🇫 ";             break;
            case "g": emojis += "🇬 ";             break;
            case "h": emojis += "🇭 ";             break;
            case "i": emojis += "🇮 ";             break;
            case "j": emojis += "🇯 ";             break;
            case "k": emojis += "🇰 ";             break;
            case "l": emojis += "🇱 ";             break;
            case "m": emojis += "🇲 ";            break;
            case "n": emojis += "🇳 ";            break;
            case "o": emojis += "🇴 ";            break;
            case "p": emojis += "🇵 ";            break;
            case "q": emojis += "🇶 ";            break;
            case "r": emojis += "🇷 ";            break;
            case "s": emojis += "🇸 ";            break;
            case "t": emojis += "🇹 ";            break;
            case "u": emojis += "🇺 ";            break;
            case "v": emojis += "🇻 ";            break;
            case "w": emojis += "🇼 ";           break;
            case "x": emojis += "🇽 ";            break;
            case "y": emojis += "🇾 ";            break;
            case "z": emojis += "🇿 ";            break;
            case "0": emojis += ":zero: ";       break;
            case "1": emojis += ":one: ";        break;
            case "2": emojis += ":two: ";        break;
            case "3": emojis += ":three: ";      break;
            case "4": emojis += ":four: ";       break;
            case "5": emojis += ":five: ";       break;
            case "6": emojis += ":six: ";        break;
            case "7": emojis += ":seven: ";      break;
            case "8": emojis += ":eight: ";      break;
            case "9": emojis += ":nine: ";       break;
            case "!": emojis += ":exclamation: ";break;
            case "?": emojis += ":question: ";   break;
            default:
                syntax = "true"
                embed.setDescription(`❌ "${text.charAt(i)}" cannot be emojified!`)
                .setFooter("text can only consist of letters of the alphabet and numbers!");  
        }
    } 
    if (syntax === "false")message.lineReply(emojis);
    else message.channel.lineReply(embed);
}

module.exports.help = {
    name:"emoji",
    aliases: ["ej"],
    help: "Changes your text from \"no u\" to \"🇳 🇴 🇺\"",
    usage: 'emoji/ej <text>'
  }