const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message) => {
    const operator = ["\\➕", "\\✖️", "\\➖"];
    const randOp = Math.floor(Math.random() * 3);
    const rand1 = Math.floor(Math.random() * 11);
    const rand2 = Math.floor(Math.random() * 11);
    let embed = new Discord.MessageEmbed().setColor("#996633").setTitle("\\💩 common event \\💩")
    let answer = null;
    switch (randOp) {
        case 0: answer = rand1 + rand2; break;
        case 1: answer = rand1 * rand2; break;
        case 2: answer = rand1 - rand2; break;
    }
    message.channel.send(embed.setDescription(`What's ${rand1} ${operator[randOp]} ${rand2}?`))
    .then(() => {
        message.channel.awaitMessages(
            response => {
                if (response.author.bot)return false;
                return response.content == answer;
            }, 
            { 
                max: 1, 
                time: 10000, 
                errors: ['time'] 
            })
        .then(collected => {
            message.channel.send(embed
                .setDescription(`hey lol ${collected.first().author} got it right first`)
                .setFooter(`The answer "${answer}" will be added to your account!`));
            db.add(`money.${collected.first().author.id}`, answer);
        }).catch(collected => { 
            message.channel.send(embed
            .setDescription("No one got it right!")
            .setFooter(`TIME ELAPSED: 10 seconds`)); 
        })
    })
}



module.exports.info = {
    chance: "0.7",
    name: "common",
}