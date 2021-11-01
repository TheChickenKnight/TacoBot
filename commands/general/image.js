const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");
const deepai = require("deepai");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;  
    deepai.setApiKey("89611ecc-cd40-49aa-a34d-5abb32fcad42");
    deepai.callStandardApi("text2img", {text: args.join(" ")}).then(res => message.lineReply(res.output_url));
}

module.exports.help = {
    name:"image",
    aliases: ["img"],
    help: `text to image!`,
    usage: 'image/img <text>'
 }