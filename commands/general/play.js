const Discord = require("discord.js");
const db = require("quick.db");
const ytdl = require('ytdl-core');


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    let embed = new Discord.MessageEmbed().setColor("#ebba34").setTitle("🌮 Play 🌮");
    const voiceChannel = message.member.voice.channel;
    const queue = new Map();
    const serverQueue = queue.get(message.guild.id);
    if (!voiceChannel)return message.channel.send(embed.setDescription("You need to be in a voice channel to play music!"));
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))return message.channel.send(embed.setDescription("I need the permissions to join and speak in your voice channel!"));
    const songInfo = await ytdl.getInfo(args[0]);
    const song = {title: songInfo.videoDetails.title,url: songInfo.videoDetails.video_url,};
    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);
        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(embed.setDescription(err));
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(embed.setDescription(`${song.title} has been added to the queue!`));
    }
    function play(guild, song) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
        const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(embed.setDescription(`Start playing \`${song.title}\` in \`${message.member.voice.channel.name}\`!`));
    }
}


 
module.exports.help = {
    name:"play",
    aliases: [""],
    help: "Joins your Voice Channel!",
    usage: 'play <Url>'
}