const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, beg) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    message.delete(message);
    let secretEmbed = new Discord.MessageEmbed().setTitle('m҉y҉ ҉n҉a҉m҉e҉ ҉i҉s҉ ҉t҉y҉.҉');
    message.channel.send(secretEmbed)
    .then((msg)=> {
        for (let i = 0; i > 10; i++) {
            setTimeout(function(){
                secretEmbed.setColor('#e00d0d');
                msg.edit(secretEmbed);
                secretEmbed.setColor('#000000');
                msg.edit(secretEmbed);
            }, 100);
        }
    }); 

}

module.exports.help = {
    name:"0҉4҉8҉u҉t҉8҉9҉y҉7҉6҉t҉0҉4҉w҉3҉e҉y҉u҉t҉9҉0҉4҉y҉u҉5҉t҉7҉9҉y҉u҉4҉8҉w҉9҉3҉e҉t҉y҉4҉p҉8҉6҉t҉",
    aliases: [""]
  }