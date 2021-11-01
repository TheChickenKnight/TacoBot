const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    var xhttp = new XMLHttpRequest();
    let embed = new Discord.MessageEmbed().setColor("#f2f2f2").setFooter("📖 Powered by Merriam-Webster API!");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let text = JSON.parse(this.responseText);
            try {embed.setTitle(`__${text[0].meta.id.charAt(0).toUpperCase()}${text[0].meta.id.slice(1)}__`)
            } catch {embed.setTitle(args.join(" "))
            } try {embed.setDescription(`**${text[0].fl.charAt(0).toUpperCase()}${text[0].fl.slice(1)}**\n${text[0].def[0].sseq[0][0][1].dt[0][1]}`)
            } catch {embed.setDescription(`❌ Not in my registries!`);
            } try {if(text[0].meta.stems)embed.addField("📓 Stems", text[0].meta.stems.join(", ") + ".", false)} catch {}
            try {embed.addField("📑 Example", text[0].def[0].sseq[0][0][1].dt[1][1][0].t.replace(/{it}|{\/it}/gi,""), false)} catch {}
            try {embed.addField("📔 Synonyms", text[0].meta.syns.join(",** **") + ".");} catch {}
            message.lineReply(embed);
        } 
    };
    xhttp.open("GET", `https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${args.join("%20")}?key=2b37137b-6b9e-4230-8157-c3005ead0ec3`, true);
    xhttp.send();
}

module.exports.help = {
    name:"define",
    aliases: ["def"],
    help: "Defines basicish words! Powered by Merriam-Webster API!",
    usage: 'define/def <word>'
  }