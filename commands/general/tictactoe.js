const Discord = require("discord.js");
const db = require("quick.db");
const disbt = require("discord-buttons");
require("discord-reply");
var games = new Discord.Collection();

module.exports.run = async (bot, message, args) => { 
    var embed = new Discord.MessageEmbed().setColor("#ff0000").setTitle("** **              TicTacToe              ** **");
    const target = message.mentions.members.first();
    if (!target)return message.lineReply(embed.setDescription("❌ You have to specify a valid person to verse!"));
    if (target.id == message.author.id)return message.lineReply(embed.setDescription("❌ You can't play TicTacToe by yourself!").setFooter("Are you really this lonely?"));
    if (games.has(message.author.id + target.id))return message.lineReply(embed.setDescription(`❌ You're already in a game with ${target}!`));
    const turn = Math.round(Math.random()) ? message.author : target.user;
    games.set(
        message.author.id + target.id, 
        {
            turn: turn,
            board: [
                ["0", "0", "0"], 
                ["0", "0", "0"], 
                ["0", "0", "0"]
            ]
        }
    );
    message.channel.send({
        embed: embed.setColor("#ebba34").setDescription(turn.username + "'s turn"),
        components: [
            new disbt.MessageActionRow().addComponents(
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_00_${message.author.id}_${target.user.id}_general`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_01_${message.author.id}_${target.user.id}_general`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_02_${message.author.id}_${target.user.id}_general`)
            ),
            new disbt.MessageActionRow().addComponents(
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_10_${message.author.id}_${target.user.id}_general`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_11_${message.author.id}_${target.user.id}_general`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_12_${message.author.id}_${target.user.id}_general`)
            ),
            new disbt.MessageActionRow().addComponents(
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_20_${message.author.id}_${target.user.id}_general`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_21_${message.author.id}_${target.user.id}_general`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel(" ")
                    .setID(`tictactoe_22_${message.author.id}_${target.user.id}_general`)
            )
        ]
    });
}

module.exports.button = async (bot, button) => {
    var embed = new Discord.MessageEmbed().setColor("#ff0000").setTitle("** **              TicTacToe              ** **");
    if (button.clicker.id != button.id.split("_")[2] && button.clicker.id != button.id.split("_")[3])return await button.reply.send(embed.setDescription("This isn't your game!"), true);
    if (games.get(button.id.split("_")[2] + button.id.split("_")[3]).turn != button.clicker.id)return await button.reply.send(embed.setDescription("It's not your turn!"), true);
    var editGames = games.get(button.id.split("_")[2] + button.id.split("_")[3]);
    editGames.turn = button.clicker.id == button.id.split("_")[2] ? button.id.split("_")[3] : button.id.split("_")[2];
    if ((button.clicker.id != button.id.split("_")[2] && button.clicker.id > button.id.split("_")[2]) || (button.clicker.id != button.id.split("_")[3] && button.clicker.id > button.id.split("_")[3])) {
        await button.message.edit(embed, button.setDisabled(true).setLabel("X").setStyle("red"));
        editGames.board[button.id.split("_")[1].charAt(0)][button.id.split("_")[1].charAt(1)] == "x";
    } else {
        await button.message.edit(embed, button.setDisabled(true).setLabel("O").setStyle("blurple"));
        editGames.board[button.id.split("_")[1].charAt(0)][button.id.split("_")[1].charAt(1)] == "o";
    }
}

module.exports.help = {
    name:"tictactoe",
    aliases: ["ttt"],
    cooldown: 0,
    help: `Verse someone in TicTacToe!`,
    usage: 'tictactoe/ttt <user>'
}