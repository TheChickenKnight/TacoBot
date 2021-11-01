const Discord = require("discord.js");
const googleTTS = require('google-tts-api');
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    if (!args[0])return message.channel.send("u need to say something")
    const url = await googleTTS.getAudioUrl(args.join(" "), {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
    });
    const connection = await message.member.voice.channel.join();
    connection.play(url); 
}

module.exports.help = {
    name:"talk",
    aliases: [""],
    help: "Lists all your pokemon!",
    usage: 'talk <text>'
}