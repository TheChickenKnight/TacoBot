const Discord = require("discord.js");
const db = require("quick.db");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    var xhttp = new XMLHttpRequest();
    let embed = new Discord.MessageEmbed().setColor("#ebba34");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let text = JSON.parse(this.responseText);
            try {
                message.channel.send(embed.setDescription(getElement(text, "extract").slice(0,2045) + "...")
                .setTitle(`__${getElement(text, "title")}__\n${getElement(text, "description")}`)
                .setFooter(`Powered by WIKI API! Page ID: ${getElement(text, "pageid")}`));
            } catch {message.channel.send(embed.setDescription("There was an error. Perhaps this page isn't in the wiki?")
            .setTitle(args.join(" ")).setFooter("Powered by WIKI API!"));}
        }
    };
    xhttp.open("GET", "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=description%7Cextracts&exintro=1&explaintext=1&redirects=1&titles=" + args.join("%20"), true);
    xhttp.send();
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
    name:"wiki",
    aliases: [""],
    help: "search things! so randomly! Powered by Wikipedia API!",
    usage: 'wiki <text>'
  }