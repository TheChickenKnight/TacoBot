const Discord = require("discord.js");
const db = require("quick.db");
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    let serverQueue = db.get(`serverQueue`);
    if (!message.member.voice.channel)return message.channel.send("You have to be in a voice channel to stop the music!");
    if (!serverQueue)return message.channel.send("There is no song that I could stop!");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    db.set(`serverQueue`, serverQueue);
}

module.exports.help = {
    name:"stop",
    aliases: [""],
    help: "Stops playing whatever it's playing",
    usage: 'stop'
}