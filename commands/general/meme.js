const Discord = require("discord.js");
const db = require("quick.db");
const reddit = require("reddit-image-fetcher");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    if (args[0] == "dank") {
        message.channel.send(new Discord.MessageEmbed()
            .setImage("https://cdn.discordapp.com/attachments/805895206372769862/837335651648274492/flowcode.png")
            .setFooter(`${message.author} unlocks qr code!`)
        );
    } else {
        const meme = await reddit.fetch({type: "meme"});
        if (!getElement(meme, "NSFW")) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setImage(getElement(meme, "image"))
                .setAuthor(getElement(meme, "title"), "https://2.bp.blogspot.com/-YfG0LGJ5Nz8/WjmFJSmsJvI/AAAAAAAAKWg/0JrUjgOp2o8MJXDnBOHsKC9uTk41EynaQCLcBGAs/s1600/sdO8tAw.png", getElement(meme, "postLink"))
                .addField("⬆️", getElement(meme, "upvotes"), true)
                .addField("Subreddit", "r/" + getElement(meme, "subreddit"), true)
            );
        }
    }
}

function getElement(obj, element) {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
            getElement(obj[k], element);
            if (getElement(obj[k], element) !== undefined)return getElement(obj[k], element);
        }
        else if (k === element)return obj[k];
    };
}

module.exports.help = {
    name:"meme",
    aliases: [""],
    help: "m e m e s",
    usage: 'meme'
}